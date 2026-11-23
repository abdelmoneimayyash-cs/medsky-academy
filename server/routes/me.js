"use strict";
const express = require("express");
const rateLimit = require("express-rate-limit");
const db = require("../db");
const { hashPassword, verifyPassword } = require("../security");
const S = require("../session");

const router = express.Router();
// حد للعمليات الحساسة (تغيير كلمة المرور / حذف الحساب) لمنع تخمين كلمة المرور الحالية بجلسة مسروقة
const sensitiveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false,
  message: { error: "too_many_requests" },
});
router.use(S.requireAuth);
router.use((_req, res, next) => { res.set("Cache-Control", "no-store"); next(); });

router.patch("/", (req, res) => {
  const name = String(req.body.name || "").replace(/\s+/g, " ").trim();
  if (name.length < 2 || name.length > 80) return res.status(400).json({ error: "validation", fields: { name: "name_length" } });
  db.prepare("UPDATE users SET name = ? WHERE id = ?").run(name, req.user.id);
  res.json({ user: S.publicUser(db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id)) });
});

router.post("/password", sensitiveLimiter, async (req, res) => {
  const { current, password } = req.body;
  if (typeof password !== "string" || password.length < 8 || password.length > 128) {
    return res.status(400).json({ error: "validation", fields: { password: password && password.length > 128 ? "password_long" : "password_short" } });
  }
  if (req.user.password_hash) {
    if (typeof current !== "string" || !(await verifyPassword(current, req.user.password_hash))) {
      return res.status(403).json({ error: "validation", fields: { current: "wrong_password" } });
    }
  }
  db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(await hashPassword(password), req.user.id);
  S.destroyAllSessions(req.user.id, req.sessionHash); // نُبقي الجلسة الحالية فقط
  res.json({ ok: true });
});

router.delete("/", sensitiveLimiter, async (req, res) => {
  if (req.user.password_hash) {
    const pw = req.body && req.body.password;
    if (typeof pw !== "string" || !(await verifyPassword(pw, req.user.password_hash))) {
      return res.status(403).json({ error: "validation", fields: { password: "wrong_password" } });
    }
  }
  db.prepare("DELETE FROM users WHERE id = ?").run(req.user.id); // الجلسات والبيانات تُحذف بالـ CASCADE
  S.clearCookie(res);
  res.json({ ok: true });
});

/* ---------- البيانات المحفوظة للمستخدم (key → JSON) ---------- */
const KEY_RE = /^[a-z0-9][a-z0-9_-]{0,39}$/;
const MAX_VALUE_BYTES = 64 * 1024;
const MAX_KEYS = 50;

router.get("/data", (req, res) => {
  const rows = db.prepare("SELECT key, value, updated_at FROM user_data WHERE user_id = ?").all(req.user.id);
  const data = {};
  for (const r of rows) { try { data[r.key] = JSON.parse(r.value); } catch { /* تجاهل */ } }
  res.json({ data });
});

router.put("/data/:key", (req, res) => {
  const key = req.params.key;
  if (!KEY_RE.test(key)) return res.status(400).json({ error: "bad_key" });
  if (!("value" in req.body)) return res.status(400).json({ error: "missing_value" });
  const json = JSON.stringify(req.body.value);
  if (json === undefined || Buffer.byteLength(json) > MAX_VALUE_BYTES) return res.status(413).json({ error: "too_large" });

  const exists = db.prepare("SELECT 1 FROM user_data WHERE user_id = ? AND key = ?").get(req.user.id, key);
  if (!exists) {
    const n = db.prepare("SELECT COUNT(*) AS n FROM user_data WHERE user_id = ?").get(req.user.id).n;
    if (n >= MAX_KEYS) return res.status(409).json({ error: "too_many_keys" });
  }
  db.prepare(
    `INSERT INTO user_data (user_id, key, value, updated_at) VALUES (?,?,?,?)
     ON CONFLICT(user_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
  ).run(req.user.id, key, json, Date.now());
  res.json({ ok: true });
});

router.delete("/data/:key", (req, res) => {
  if (!KEY_RE.test(req.params.key)) return res.status(400).json({ error: "bad_key" });
  db.prepare("DELETE FROM user_data WHERE user_id = ? AND key = ?").run(req.user.id, req.params.key);
  res.json({ ok: true });
});

module.exports = router;
