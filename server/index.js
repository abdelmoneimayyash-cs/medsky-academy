"use strict";
const path = require("path");
const express = require("express");

const config = require("./config");
require("./db");
const S = require("./session");

const app = express();
app.disable("x-powered-by");
if (config.TRUST_PROXY) app.set("trust proxy", config.TRUST_PROXY);

// سياسة المحتوى: نفس الموقع + المصادر الخارجية المستخدمة فعلاً (Font Awesome, Google Sign-In, صور Unsplash)
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://accounts.google.com",
  "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://accounts.google.com",
  "font-src 'self' https://cdnjs.cloudflare.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://accounts.google.com",
  "frame-src https://accounts.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

app.use((_req, res, next) => {
  const h = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Content-Security-Policy": CSP,
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups", // مطلوب لنافذة تسجيل Google
  };
  if (config.IS_PROD) h["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains";
  res.set(h);
  next();
});

/* ---------- API ---------- */
const api = express.Router();
api.use(express.json({ limit: "100kb" }));
api.use((err, _req, res, next) => {
  if (err && err.type === "entity.parse.failed") return res.status(400).json({ error: "bad_json" });
  next(err);
});

// حماية CSRF: أي طلب يغيّر بيانات لازم يكون JSON ومن نفس الموقع
api.use((req, res, next) => {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  if (!req.is("application/json")) return res.status(415).json({ error: "json_required" });
  const origin = req.headers.origin;
  if (origin) {
    let ok = false;
    try { ok = new URL(origin).host === req.headers.host || origin === config.PUBLIC_URL; } catch { /* ok=false */ }
    if (!ok) return res.status(403).json({ error: "bad_origin" });
  }
  next();
});
api.use((req, _res, next) => { if (!req.body) req.body = {}; next(); });
api.use(S.loadSession);
api.use("/auth", require("./routes/auth"));
api.use("/me", require("./routes/me"));
api.use((_req, res) => res.status(404).json({ error: "not_found" }));
app.use("/api", api);

/* ---------- الملفات الثابتة (قائمة بيضاء فقط، لا يُكشف server/ ولا data/ ولا .git) ---------- */
const ROOT = config.ROOT;
for (const dir of ["css", "javascript", "images", "courses"]) {
  app.use("/" + dir, express.static(path.join(ROOT, dir), { dotfiles: "ignore", index: false }));
}
// robots.txt و sitemap.xml لمحركات البحث
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain").send(
    "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /account\n\nSitemap: " + config.PUBLIC_URL + "/sitemap.xml\n"
  );
});
app.get("/sitemap.xml", (_req, res) => {
  const urls = ["/", "/courses", "/courses/EditorialDiploma.html", "/courses/InstantDiploma.html", "/auth", "/privacy"];
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => "  <url><loc>" + config.PUBLIC_URL + u + "</loc></url>").join("\n") +
    "\n</urlset>\n";
  res.type("application/xml").send(xml);
});
const pages = ["index", "auth", "courses", "account", "privacy"];
for (const p of pages) {
  app.get(p === "index" ? ["/", "/index.html"] : ["/" + p + ".html", "/" + p], (_req, res) =>
    res.sendFile(path.join(ROOT, p + ".html"))
  );
}
app.use((_req, res) => res.status(404).send("Not found"));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "server_error" });
});

setInterval(() => { try { S.cleanup(); } catch (e) { console.error(e); } }, 60 * 60 * 1000).unref();
S.cleanup();

if (require.main === module) {
  app.listen(config.PORT, () => console.log(`MedSky running on ${config.PUBLIC_URL}`));
}
module.exports = app;
