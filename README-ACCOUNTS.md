# نظام الحسابات الحقيقي — MedSky Academy

## التشغيل محلياً
```bash
npm install
npm start          # http://localhost:3000
npm test           # 12 اختبار للـ API
```
يتطلب Node.js 22.13 أو أحدث. قاعدة البيانات SQLite تُنشأ تلقائياً في `data/medsky.db`.

## ما الذي تغيّر
| الملف | التغيير |
|---|---|
| `server/` | خادم Express + SQLite: تسجيل، دخول، جلسات، استعادة كلمة المرور، بيانات المستخدم |
| `auth.html` + `javascript/auth.js` | نماذج حقيقية: دخول، إنشاء حساب، نسيت كلمة المرور، إعادة تعيين |
| `javascript/user-nav.js` | حالة الدخول من السيرفر (كوكي HttpOnly) بدل localStorage |
| `account.html` + `account.js/css` | صفحة الحساب: الاسم، كلمة المرور، الدورات المحفوظة، حذف الحساب |
| `javascript/saved.js` + `courses.html` | زر حفظ الدورة (يُحفظ في حسابك) |

## الأمان
- كلمات المرور: scrypt مع salt عشوائي (لا تُخزَّن نصاً أبداً).
- الجلسة: توكن عشوائي في كوكي `HttpOnly` + `SameSite=Lax` (+`Secure` في الإنتاج)؛ في القاعدة يُخزَّن هاش التوكن فقط.
- Google: التوكن يُتحقق منه في السيرفر (التوقيع + audience + email_verified).
- Rate limiting على الدخول والتسجيل والاستعادة، ورسالة خطأ موحّدة لا تكشف وجود الإيميل.
- حماية CSRF: JSON فقط + فحص Origin. تغيير كلمة المرور يُنهي الجلسات الأخرى.
- لا يُقدَّم من الخادم إلا css/javascript/images/courses وصفحات HTML (لا `server/` ولا `data/` ولا `.git`).

## النشر (مهم)
الخادم يحتاج استضافة Node.js — **لا يعمل على GitHub Pages/Netlify الثابتة**. خيارات: Render، Railway، Fly.io، أو VPS.
1. انشر المشروع كله (الخادم يخدم الصفحات أيضاً) واضبط متغيرات `.env.example`.
2. `DATABASE_PATH` لازم يكون على قرص دائم (Persistent Disk) وإلا تضيع الحسابات عند كل نشر.
3. فعّل HTTPS، واجعل `PUBLIC_URL` برابط https الحقيقي، و`TRUST_PROXY=1` خلف بروكسي.
4. **Google Sign-In:** في Google Cloud Console ← OAuth Client، أضف نطاق موقعك (و`http://localhost:3000` للتجربة) إلى *Authorized JavaScript origins*، وإلا سيرفض الدخول بجوجل.
5. **بريد الاستعادة:** اضبط `SMTP_URL` (مثل Brevo/Mailgun/Gmail SMTP). بدونه يُطبع رابط الاستعادة في سجل السيرفر فقط ولا يصل للمستخدم.
6. خذ نسخة احتياطية دورية من ملف قاعدة البيانات.

## واجهة الـ API
`POST /api/auth/{register,login,google,logout,forgot,reset}` · `GET /api/auth/me`
`PATCH /api/me` · `POST /api/me/password` · `DELETE /api/me`
`GET /api/me/data` · `PUT|DELETE /api/me/data/:key` (JSON حتى 64KB لكل مفتاح، 50 مفتاحاً)
