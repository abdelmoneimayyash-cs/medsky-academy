"use strict";
const crypto = require("crypto");

const SCRYPT = { N: 32768, r: 8, p: 1, keylen: 64, maxmem: 128 * 1024 * 1024 };

function scrypt(password, salt, opts) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, opts.keylen, { N: opts.N, r: opts.r, p: opts.p, maxmem: opts.maxmem }, (err, key) =>
      err ? reject(err) : resolve(key)
    );
  });
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password.normalize("NFKC"), salt, SCRYPT);
  return ["scrypt", SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString("base64"), key.toString("base64")].join("$");
}

async function verifyPassword(password, stored) {
  try {
    const [algo, N, r, p, saltB64, hashB64] = String(stored).split("$");
    if (algo !== "scrypt") return false;
    const expected = Buffer.from(hashB64, "base64");
    const key = await scrypt(password.normalize("NFKC"), Buffer.from(saltB64, "base64"), {
      N: Number(N), r: Number(r), p: Number(p), keylen: expected.length, maxmem: SCRYPT.maxmem,
    });
    return key.length === expected.length && crypto.timingSafeEqual(key, expected);
  } catch {
    return false;
  }
}

// هاش وهمي لتساوي زمن الرد عندما لا يوجد المستخدم (يمنع تخمين وجود الإيميل من التوقيت)
let dummyHash;
async function dummyVerify(password) {
  if (!dummyHash) dummyHash = await hashPassword("dummy-password-for-timing");
  await verifyPassword(password, dummyHash);
}

const newToken = () => crypto.randomBytes(32).toString("base64url");
const hashToken = (t) => crypto.createHash("sha256").update(String(t)).digest("hex");

module.exports = { hashPassword, verifyPassword, dummyVerify, newToken, hashToken };
