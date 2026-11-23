"use strict";
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const env = process.env;

module.exports = {
  ROOT,
  PORT: Number(env.PORT) || 3000,
  IS_PROD: env.NODE_ENV === "production",
  // مكان قاعدة البيانات (ضعه على قرص دائم في الاستضافة)
  DATABASE_PATH: env.DATABASE_PATH || path.join(ROOT, "data", "medsky.db"),
  // رابط الموقع العام، يُستخدم في رابط استعادة كلمة المرور وفحص Origin
  PUBLIC_URL: (env.PUBLIC_URL || "http://localhost:" + (Number(env.PORT) || 3000)).replace(/\/+$/, ""),
  GOOGLE_CLIENT_ID:
    env.GOOGLE_CLIENT_ID || "363762432129-glaeb2se4fvqgbnf0qv6ak61pqsqcili.apps.googleusercontent.com",
  // لو الموقع خلف Nginx/Cloudflare/Render اجعلها 1
  TRUST_PROXY: env.TRUST_PROXY ? Number(env.TRUST_PROXY) || env.TRUST_PROXY : false,
  // إعدادات البريد (اختياري). مثال: smtps://user:pass@smtp.example.com
  SMTP_URL: env.SMTP_URL || "",
  MAIL_FROM: env.MAIL_FROM || "MedSky Academy <no-reply@medskyacademy.com>",
  COOKIE_NAME: "medsky_sid",
  SESSION_SHORT_HOURS: 24,
  SESSION_LONG_DAYS: 30,
  RESET_TOKEN_MINUTES: 60,
};
