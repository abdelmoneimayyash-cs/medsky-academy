"use strict";
const config = require("./config");

let transporter = null;
if (config.SMTP_URL) {
  transporter = require("nodemailer").createTransport(config.SMTP_URL);
}


// المرسِل: الاسم الظاهر في صندوق الوارد + العنوان
// MAIL_FROM_NAME = الاسم الظاهر (افتراضي: MedSky Academy)
// MAIL_FROM = العنوان فقط، أو بصيغة: الاسم <العنوان>
function buildFrom() {
  const raw = String(config.MAIL_FROM || "").trim();
  const m = /<([^>]+)>/.exec(raw);
  const address = (m ? m[1] : raw).trim();
  const named = m ? raw.replace(/<[^>]+>/, "").replace(/^"|"$/g, "").trim() : "";
  const name = (process.env.MAIL_FROM_NAME || named || "MedSky Academy").trim();
  return { name, address };
}

async function sendMail({ to, subject, text, html }) {
  if (!transporter) {
    // بدون SMTP: نطبع الرسالة في سجل السيرفر (للتطوير). في الإنتاج اضبط SMTP_URL.
    console.log("\n[mail:dev] SMTP_URL غير مضبوط — الرسالة لم تُرسل، هذا محتواها:");
    console.log("To:", to, "\nSubject:", subject, "\n" + text + "\n");
    return { sent: false };
  }
  await transporter.sendMail({ from: buildFrom(), to, subject, text, html });
  return { sent: true };
}

module.exports = { sendMail };
