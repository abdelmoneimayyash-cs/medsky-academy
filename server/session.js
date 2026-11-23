"use strict";
const db = require("./db");
const config = require("./config");
const { newToken, hashToken } = require("./security");

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const k = part.slice(0, i).trim();
    try { out[k] = decodeURIComponent(part.slice(i + 1).trim()); } catch { /* تجاهل */ }
  }
  return out;
}

function publicUser(u) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    picture: u.picture || "",
    hasPassword: !!u.password_hash,
    hasGoogle: !!u.google_sub,
    createdAt: u.created_at,
    lastLoginAt: u.last_login_at,
  };
}

function createSession(req, res, userId, remember) {
  const token = newToken();
  const now = Date.now();
  const ttl = remember ? config.SESSION_LONG_DAYS * 86400000 : config.SESSION_SHORT_HOURS * 3600000;
  db.prepare(
    "INSERT INTO sessions (token_hash, user_id, created_at, expires_at, user_agent) VALUES (?,?,?,?,?)"
  ).run(hashToken(token), userId, now, now + ttl, String(req.headers["user-agent"] || "").slice(0, 200));

  const attrs = ["Path=/", "HttpOnly", "SameSite=Lax"];
  if (config.IS_PROD) attrs.push("Secure");
  if (remember) attrs.push("Max-Age=" + Math.floor(ttl / 1000)); // بدونها = كوكي جلسة تنتهي بإغلاق المتصفح
  res.append("Set-Cookie", `${config.COOKIE_NAME}=${token}; ${attrs.join("; ")}`);
}

function clearCookie(res) {
  const attrs = ["Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (config.IS_PROD) attrs.push("Secure");
  res.append("Set-Cookie", `${config.COOKIE_NAME}=; ${attrs.join("; ")}`);
}

// يملأ req.user و req.sessionHash إن وُجدت جلسة صالحة
function loadSession(req, _res, next) {
  const token = parseCookies(req.headers.cookie)[config.COOKIE_NAME];
  if (token) {
    const h = hashToken(token);
    const row = db
      .prepare(
        `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
         WHERE s.token_hash = ? AND s.expires_at > ?`
      )
      .get(h, Date.now());
    if (row) { req.user = row; req.sessionHash = h; }
  }
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: "unauthorized" });
  next();
}

function destroySession(hash) {
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(hash);
}
function destroyAllSessions(userId, exceptHash) {
  if (exceptHash) db.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?").run(userId, exceptHash);
  else db.prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}

function cleanup() {
  const now = Date.now();
  db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(now);
  db.prepare("DELETE FROM password_resets WHERE expires_at < ? OR used_at IS NOT NULL").run(now);
}

module.exports = {
  parseCookies, publicUser, createSession, clearCookie, loadSession,
  requireAuth, destroySession, destroyAllSessions, cleanup,
};
