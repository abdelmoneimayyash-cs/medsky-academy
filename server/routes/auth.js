"use strict";
const express = require("express");
const rateLimit = require("express-rate-limit");
const { OAuth2Client } = require("google-auth-library");

const db = require("../db");
const config = require("../config");
const { hashPassword, verifyPassword, dummyVerify, newToken, hashToken } = require("../security");
const { sendMail } = require("../mailer");
const S = require("../session");

const router = express.Router();
const googleClient = new OAuth2Client(config.GOOGLE_CLIENT_ID);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limiter = (windowMin, max) =>
  rateLimit({
    windowMs: windowMin * 60 * 1000,
    limit: max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "too_many_requests" },
  });

function cleanEmail(v) { return String(v || "").trim().toLowerCase(); }
function cleanName(v) { return String(v || "").replace(/\s+/g, " ").trim(); }

function validateEmail(email) {
  if (!email) return "required";
  if (email.length > 254 || !EMAIL_RE.test(email)) return "invalid_email";
}
function validatePassword(pw, email) {
  if (typeof pw !== "string" || !pw) return "required";
  if (pw.length < 8) return "password_short";
  if (pw.length > 128) return "password_long";
  if (email && pw.toLowerCase() === email) return "password_weak";
}

router.post("/register", limiter(60, 15), async (req, res) => {
  const name = cleanName(req.body.name);
  const email = cleanEmail(req.body.email);
  const password = req.body.password;
  const errors = {};
  if (name.length < 2 || name.length > 80) errors.name = name ? "name_length" : "required";
  const e1 = validateEmail(email); if (e1) errors.email = e1;
  const e2 = validatePassword(password, email); if (e2) errors.password = e2;
  if (Object.keys(errors).length) return res.status(400).json({ error: "validation", fields: errors });

  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) {
    return res.status(409).json({ error: "validation", fields: { email: "email_taken" } });
  }
  const now = Date.now();
  const hash = await hashPassword(password);
  let id;
  try {
    id = db.prepare("INSERT INTO users (name, email, password_hash, created_at, last_login_at) VALUES (?,?,?,?,?)")
      .run(name, email, hash, now, now).lastInsertRowid;
  } catch (e) {
    // سباق نادر: تسجيلان متزامنان بنفس الإيميل
    return res.status(409).json({ error: "validation", fields: { email: "email_taken" } });
  }
  S.createSession(req, res, Number(id), !!req.body.remember);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  res.status(201).json({ user: S.publicUser(user) });
});

router.post("/login", limiter(15, 10), async (req, res) => {
  const email = cleanEmail(req.body.email);
  const password = typeof req.body.password === "string" ? req.body.password : "";
  if (validateEmail(email) || !password || password.length > 128) {
    return res.status(400).json({ error: "invalid_credentials" });
  }
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user || !user.password_hash) {
    await dummyVerify(password);
    return res.status(401).json({ error: "invalid_credentials" });
  }
  if (!(await verifyPassword(password, user.password_hash))) {
    return res.status(401).json({ error: "invalid_credentials" });
  }
  db.prepare("UPDATE users SET last_login_at = ? WHERE id = ?").run(Date.now(), user.id);
  S.createSession(req, res, user.id, !!req.body.remember);
  res.json({ user: S.publicUser({ ...user, last_login_at: Date.now() }) });
});

router.post("/google", limiter(15, 20), async (req, res) => {
  const credential = req.body.credential;
  if (typeof credential !== "string" || credential.length > 4096) return res.status(400).json({ error: "google_failed" });
  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: config.GOOGLE_CLIENT_ID });
    payload = ticket.getPayload();
  } catch {
    return res.status(401).json({ error: "google_failed" });
  }
  if (!payload || !payload.sub || !payload.email || payload.email_verified !== true) {
    return res.status(401).json({ error: "google_failed" });
  }
  const email = cleanEmail(payload.email);
  const now = Date.now();
  let user = db.prepare("SELECT * FROM users WHERE google_sub = ?").get(payload.sub)
    || db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (user) {
    // الإيميل موثّق من Google، فربط الحساب آمن
    db.prepare("UPDATE users SET google_sub = ?, picture = COALESCE(NULLIF(picture,''), ?), last_login_at = ? WHERE id = ?")
      .run(payload.sub, payload.picture || null, now, user.id);
  } else {
    const id = db.prepare("INSERT INTO users (name, email, google_sub, picture, created_at, last_login_at) VALUES (?,?,?,?,?,?)")
      .run(cleanName(payload.name) || email.split("@")[0], email, payload.sub, payload.picture || null, now, now).lastInsertRowid;
    user = { id: Number(id) };
  }
  S.createSession(req, res, user.id, true);
  res.json({ user: S.publicUser(db.prepare("SELECT * FROM users WHERE id = ?").get(user.id)) });
});

router.post("/logout", (req, res) => {
  if (req.sessionHash) S.destroySession(req.sessionHash);
  S.clearCookie(res);
  res.json({ ok: true });
});

router.get("/me", (req, res) => {
  res.set("Cache-Control", "no-store");
  if (!req.user) return res.json({ user: null });
  res.json({ user: S.publicUser(req.user) });
});

// نسيت كلمة المرور: الرد دائماً واحد سواء وُجد الإيميل أو لا
router.post("/forgot", limiter(60, 5), async (req, res) => {
  const email = cleanEmail(req.body.email);
  if (validateEmail(email)) return res.status(400).json({ error: "validation", fields: { email: "invalid_email" } });
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (user) {
    const token = newToken();
    db.prepare("DELETE FROM password_resets WHERE user_id = ?").run(user.id);
    db.prepare("INSERT INTO password_resets (token_hash, user_id, expires_at) VALUES (?,?,?)")
      .run(hashToken(token), user.id, Date.now() + config.RESET_TOKEN_MINUTES * 60000);
    const link = `${config.PUBLIC_URL}/auth.html?reset=${token}`;
    try {
      await sendMail({
        to: user.email,
        subject: "استعادة كلمة المرور | MedSky Academy",
        text: `مرحباً ${user.name}،\n\nلإعادة تعيين كلمة المرور افتح الرابط التالي (صالح ${config.RESET_TOKEN_MINUTES} دقيقة):\n${link}\n\nإن لم تطلب ذلك تجاهل هذه الرسالة.\n\nHello ${user.name},\nUse the link above to reset your password. If you did not request this, ignore this email.`,
      });
    } catch (e) {
      console.error("[mail] failed:", e.message);
    }
  }
  res.json({ ok: true });
});

router.post("/reset", limiter(60, 10), async (req, res) => {
  const token = String(req.body.token || "");
  const password = req.body.password;
  const pwErr = validatePassword(password);
  if (pwErr) return res.status(400).json({ error: "validation", fields: { password: pwErr } });

  const row = db.prepare("SELECT * FROM password_resets WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?")
    .get(hashToken(token), Date.now());
  if (!row) return res.status(400).json({ error: "invalid_token" });

  const hash = await hashPassword(password);
  db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, row.user_id);
  db.prepare("UPDATE password_resets SET used_at = ? WHERE token_hash = ?").run(Date.now(), row.token_hash);
  S.destroyAllSessions(row.user_id); // أي جلسة قديمة تنتهي
  res.json({ ok: true });
});

module.exports = router;
