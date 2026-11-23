"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const os = require("os");
const path = require("path");
const fs = require("fs");

process.env.DATABASE_PATH = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "medsky-")), "t.db");
process.env.PUBLIC_URL = "http://localhost";

const app = require("../index");
const db = require("../db");

let server, base;
test.before(async () => {
  await new Promise((r) => { server = app.listen(0, "127.0.0.1", r); });
  base = "http://127.0.0.1:" + server.address().port;
});
test.after(() => server.close());

// عميل صغير يحتفظ بالكوكي
function client() {
  let cookie = "";
  return async (method, url, body, headers = {}) => {
    const res = await fetch(base + url, {
      method,
      headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...headers },
      body: body === undefined ? undefined : JSON.stringify(body),
      redirect: "manual",
    });
    const set = res.headers.getSetCookie?.() || [];
    for (const c of set) {
      const kv = c.split(";")[0];
      if (kv.endsWith("=")) cookie = ""; else cookie = kv;
    }
    let data = null;
    try { data = await res.json(); } catch { /* not json */ }
    return { status: res.status, data, setCookie: set, headers: res.headers };
  };
}

const USER = { name: "Dr. Sara", email: "Sara@Example.com", password: "correct horse battery" };

test("register validates input", async () => {
  const c = client();
  let r = await c("POST", "/api/auth/register", { name: "", email: "bad", password: "123" });
  assert.equal(r.status, 400);
  assert.ok(r.data.fields.name && r.data.fields.email && r.data.fields.password);
  r = await c("POST", "/api/auth/register", { ...USER, password: "x".repeat(200) });
  assert.equal(r.data.fields.password, "password_long");
});

test("register -> session cookie -> me -> logout", async () => {
  const c = client();
  let r = await c("POST", "/api/auth/register", USER);
  assert.equal(r.status, 201);
  assert.equal(r.data.user.email, "sara@example.com"); // الإيميل يُحوَّل لحروف صغيرة
  assert.equal(r.data.user.password_hash, undefined);  // لا تسريب للهاش
  const sc = r.setCookie[0];
  assert.match(sc, /HttpOnly/); assert.match(sc, /SameSite=Lax/);

  r = await c("GET", "/api/auth/me");
  assert.equal(r.data.user.name, "Dr. Sara");

  // كلمة المرور مخزنة مجزّأة وليست نصاً
  const row = db.prepare("SELECT password_hash FROM users WHERE email = ?").get("sara@example.com");
  assert.match(row.password_hash, /^scrypt\$/);
  assert.ok(!row.password_hash.includes(USER.password));

  await c("POST", "/api/auth/logout", {});
  r = await c("GET", "/api/auth/me");
  assert.equal(r.data.user, null);
});

test("duplicate email rejected (case-insensitive)", async () => {
  const r = await client()("POST", "/api/auth/register", { ...USER, email: "SARA@example.com" });
  assert.equal(r.status, 409);
  assert.equal(r.data.fields.email, "email_taken");
});

test("login: wrong password / unknown email give the same generic error", async () => {
  const c = client();
  const a = await c("POST", "/api/auth/login", { email: USER.email, password: "wrong-password" });
  const b = await c("POST", "/api/auth/login", { email: "nobody@example.com", password: "wrong-password" });
  assert.equal(a.status, 401); assert.equal(b.status, 401);
  assert.deepEqual(a.data, b.data);
  const ok = await c("POST", "/api/auth/login", { email: USER.email, password: USER.password, remember: true });
  assert.equal(ok.status, 200);
  assert.match(ok.setCookie[0], /Max-Age=/); // تذكرني = كوكي دائم
  const noRemember = await client()("POST", "/api/auth/login", { email: USER.email, password: USER.password });
  assert.doesNotMatch(noRemember.setCookie[0], /Max-Age=/); // كوكي جلسة
});

test("saved data persists per user and is isolated", async () => {
  const c = client();
  await c("POST", "/api/auth/login", { email: USER.email, password: USER.password });
  let r = await c("PUT", "/api/me/data/saved-courses", { value: ["InstantDiploma"] });
  assert.equal(r.status, 200);

  // جلسة جديدة (كأنه جهاز آخر) ترى نفس البيانات
  const c2 = client();
  await c2("POST", "/api/auth/login", { email: USER.email, password: USER.password });
  r = await c2("GET", "/api/me/data");
  assert.deepEqual(r.data.data["saved-courses"], ["InstantDiploma"]);

  // مستخدم آخر لا يرى بيانات غيره
  const other = client();
  await other("POST", "/api/auth/register", { name: "Other", email: "other@example.com", password: "another-pass-1" });
  r = await other("GET", "/api/me/data");
  assert.deepEqual(r.data.data, {});

  r = await c("PUT", "/api/me/data/Bad Key!", { value: 1 });
  assert.equal(r.status, 400); // مفتاح غير صالح
  r = await c("PUT", "/api/me/data/big", { value: "x".repeat(70 * 1024) });
  assert.ok(r.status === 413 || r.status === 400);
});

test("protected routes need a session", async () => {
  const c = client();
  assert.equal((await c("GET", "/api/me/data")).status, 401);
  assert.equal((await c("PATCH", "/api/me", { name: "Hacker" })).status, 401);
});

test("CSRF: cross-origin and non-JSON writes are blocked", async () => {
  const c = client();
  let r = await c("POST", "/api/auth/login", { email: USER.email, password: USER.password }, { Origin: "https://evil.example" });
  assert.equal(r.status, 403);
  const res = await fetch(base + "/api/auth/login", { method: "POST", headers: { "Content-Type": "text/plain" }, body: "{}" });
  assert.equal(res.status, 415);
});

test("change password invalidates other sessions, keeps current", async () => {
  const a = client(), b = client();
  await a("POST", "/api/auth/login", { email: USER.email, password: USER.password });
  await b("POST", "/api/auth/login", { email: USER.email, password: USER.password });
  let r = await a("POST", "/api/me/password", { current: "nope-nope-nope", password: "brand new password" });
  assert.equal(r.status, 403);
  r = await a("POST", "/api/me/password", { current: USER.password, password: "brand new password" });
  assert.equal(r.status, 200);
  assert.equal((await a("GET", "/api/auth/me")).data.user.email, "sara@example.com");
  assert.equal((await b("GET", "/api/auth/me")).data.user, null);
  USER.password = "brand new password";
});

test("forgot/reset password flow (single-use token)", async () => {
  const c = client();
  // نلتقط الرابط من سجل البريد التطويري
  const logs = [];
  const orig = console.log; console.log = (...a) => logs.push(a.join(" "));
  const r1 = await c("POST", "/api/auth/forgot", { email: USER.email });
  const r2 = await c("POST", "/api/auth/forgot", { email: "ghost@example.com" });
  console.log = orig;
  assert.equal(r1.status, 200); assert.equal(r2.status, 200);
  assert.deepEqual(r1.data, r2.data); // لا يكشف وجود الإيميل
  const link = logs.join("\n").match(/auth\.html\?reset=([\w-]+)/);
  assert.ok(link, "reset link logged");

  assert.equal((await c("POST", "/api/auth/reset", { token: "garbage", password: "whatever123" })).status, 400);
  assert.equal((await c("POST", "/api/auth/reset", { token: link[1], password: "short" })).status, 400);
  assert.equal((await c("POST", "/api/auth/reset", { token: link[1], password: "after reset 123" })).status, 200);
  assert.equal((await c("POST", "/api/auth/reset", { token: link[1], password: "again again 123" })).status, 400); // مستهلك
  assert.equal((await c("POST", "/api/auth/login", { email: USER.email, password: "after reset 123" })).status, 200);
});

test("google endpoint rejects forged tokens", async () => {
  const r = await client()("POST", "/api/auth/google", { credential: "aaa.bbb.ccc" });
  assert.equal(r.status, 401);
});

test("static whitelist: source, db and git are not served", async () => {
  for (const p of ["/server/db.js", "/package.json", "/data/medsky.db", "/.git/config", "/node_modules/express/package.json"]) {
    const res = await fetch(base + p);
    assert.equal(res.status, 404, p);
  }
  for (const p of ["/", "/auth.html", "/account.html", "/courses.html", "/css/auth.css", "/javascript/auth.js"]) {
    const res = await fetch(base + p);
    assert.equal(res.status, 200, p);
  }
});

test("delete account removes user, sessions and data", async () => {
  const c = client();
  await c("POST", "/api/auth/login", { email: USER.email, password: "after reset 123" });
  assert.equal((await c("DELETE", "/api/me", { password: "wrong" })).status, 403);
  assert.equal((await c("DELETE", "/api/me", { password: "after reset 123" })).status, 200);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM users WHERE email = ?").get("sara@example.com").n, 0);
  assert.equal(db.prepare("SELECT COUNT(*) n FROM user_data WHERE user_id NOT IN (SELECT id FROM users)").get().n, 0);
});

test("security headers are sent (CSP, nosniff, frame, referrer, permissions)", async () => {
  const res = await fetch(base + "/");
  assert.match(res.headers.get("content-security-policy") || "", /default-src 'self'/);
  assert.match(res.headers.get("content-security-policy") || "", /frame-ancestors 'none'/);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-frame-options"), "DENY");
  assert.ok(res.headers.get("referrer-policy"));
  assert.ok(res.headers.get("permissions-policy"));
});
