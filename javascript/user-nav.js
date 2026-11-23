(function () {
  "use strict";

  // السيرفر هو المرجع الوحيد لحالة الدخول (كوكي HttpOnly). هذا المفتاح مجرد تلميح للعرض السريع.
  var KEY = "medsky-user-hint";
  var LEGACY = "medsky-google-user";
  var OLD_FAKE = "medsky-user"; // كان يُستخدم في النسخة الوهمية القديمة، نمسحه حتى لا يظهر دخول مزيّف
  try { localStorage.removeItem(OLD_FAKE); localStorage.removeItem(LEGACY); } catch (e) {}
  var serverUser = undefined; // undefined = لم يرد السيرفر بعد

  var T = {
    ar: {
      account: "حسابي", courses: "الدورات", logout: "تسجيل الخروج"
    },
    en: {
      account: "My account", courses: "Courses", logout: "Log out"
    }
  };

  function lang() { return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar"; }

  function getUser() {
    if (serverUser !== undefined) return serverUser;
    try {
      var u = JSON.parse(localStorage.getItem(KEY) || "null");
      return u && (u.email || u.name) ? u : null;
    } catch (e) { return null; }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function avatar(user, big) {
    var box = el("span", "msn-av" + (big ? " msn-av-lg" : ""));
    box.appendChild(el("b", null, (user.name || user.email || "?").trim().charAt(0).toUpperCase()));
    if (user.picture) {
      var img = new Image();
      img.alt = "";
      img.referrerPolicy = "no-referrer";
      img.onerror = function () { img.remove(); };
      img.src = user.picture;
      box.appendChild(img);
    }
    return box;
  }

  function displayName(u) { return u.name || (u.email || "").split("@")[0]; }
  function firstName(u) { return displayName(u); } // الاقتطاع بـ CSS (ellipsis) يمنع ظهور لقب فقط مثل "د."
  function base() { return location.pathname.indexOf("/courses/") !== -1 ? "../" : ""; }
  function accountUrl() { return base() + "account.html"; }
  function coursesUrl() { return (location.pathname.indexOf("/courses/") !== -1 ? "../" : "") + "courses.html"; }

  function formatDate(ts) {
    if (!ts) return "";
    try {
      return new Date(ts).toLocaleString(lang() === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" });
    } catch (e) { return ""; }
  }

  function logout() {
    function done() {
      try { localStorage.removeItem(KEY); } catch (e) {}
      try { if (window.google && google.accounts && google.accounts.id) google.accounts.id.disableAutoSelect(); } catch (e) {}
      location.reload();
    }
    fetch("/api/auth/logout", {
      method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: "{}"
    }).then(done, done);
  }

  function buildDesktop(user, t) {
    var wrap = el("div", "msn-user");
    wrap.id = "msnUser";

    var btn = el("button", "msn-user-btn");
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", t.account);
    btn.appendChild(avatar(user));
    btn.appendChild(el("span", "msn-user-name", firstName(user)));
    btn.appendChild(el("i", "fa-solid fa-chevron-down msn-user-chev"));

    var menu = el("div", "msn-user-menu");
    menu.setAttribute("role", "menu");

    var head = el("div", "msn-user-head");
    head.appendChild(avatar(user, true));
    var who = el("div", "msn-user-who");
    who.appendChild(el("strong", null, displayName(user)));
    who.appendChild(el("span", null, user.email || ""));
    head.appendChild(who);
    menu.appendChild(head);


    var acc = el("a", "msn-user-act");
    acc.href = accountUrl();
    acc.appendChild(el("i", "fa-solid fa-user-gear"));
    acc.appendChild(el("span", null, t.account));
    menu.appendChild(acc);

    var link = el("a", "msn-user-act");
    link.href = coursesUrl();
    link.appendChild(el("i", "fa-solid fa-graduation-cap"));
    link.appendChild(el("span", null, t.courses));
    menu.appendChild(link);

    var out = el("button", "msn-user-act msn-user-out");
    out.type = "button";
    out.appendChild(el("i", "fa-solid fa-arrow-right-from-bracket"));
    out.appendChild(el("span", null, t.logout));
    out.addEventListener("click", logout);
    menu.appendChild(out);

    function setOpen(o) {
      wrap.classList.toggle("open", o);
      btn.setAttribute("aria-expanded", String(o));
    }
    btn.addEventListener("click", function (e) { e.stopPropagation(); setOpen(!wrap.classList.contains("open")); });
    menu.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { setOpen(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
  }

  function buildMobile(user, t) {
    var card = el("div", "msn-mprofile");
    var head = el("div", "msn-user-head");
    head.appendChild(avatar(user, true));
    var who = el("div", "msn-user-who");
    who.appendChild(el("strong", null, displayName(user)));
    who.appendChild(el("span", null, user.email || ""));
    head.appendChild(who);
    card.appendChild(head);


    var acc = el("a", "msn-user-act");
    acc.href = accountUrl();
    acc.appendChild(el("i", "fa-solid fa-user-gear"));
    acc.appendChild(el("span", null, t.account));
    card.appendChild(acc);

    var link = el("a", "msn-user-act");
    link.href = coursesUrl();
    link.appendChild(el("i", "fa-solid fa-graduation-cap"));
    link.appendChild(el("span", null, t.courses));
    card.appendChild(link);

    var out = el("button", "msn-user-act msn-user-out");
    out.type = "button";
    out.appendChild(el("i", "fa-solid fa-arrow-right-from-bracket"));
    out.appendChild(el("span", null, t.logout));
    out.addEventListener("click", logout);
    card.appendChild(out);
    return card;
  }

  function render() {
    document.querySelectorAll("#msnUser, .msn-mprofile").forEach(function (n) { n.remove(); });
    var user = getUser();
    document.documentElement.classList.toggle("msn-authed", !!user);
    if (!user) return;
    var t = T[lang()];

    var tools = document.querySelector(".msn-tools");
    if (tools) tools.appendChild(buildDesktop(user, t));

    var actions = document.querySelector(".msn-mactions");
    if (actions) actions.insertBefore(buildMobile(user, t), actions.firstChild);
  }

  /* ---------- CSS ---------- */
  var css = [
    ".msn-authed .msn-tools .msn-login,.msn-authed .msn-tools .msn-sep,.msn-authed .msn-mactions .msn-cta,.msn-authed .msn-mactions .msn-login{display:none !important;}",
    ".msn-user{position:relative;margin-inline-start:8px;}",
    ".msn-user-btn{display:inline-flex;align-items:center;gap:8px;padding:4px 14px 4px 4px;padding-inline:4px 12px;border-radius:9999px;background:var(--nm-bg,var(--bg-card));box-shadow:var(--nm-raised-xs,var(--shadow-sm));color:var(--text);font-size:.82rem;font-weight:700;transition:box-shadow .25s ease;}",
    ".msn-user-btn:hover,.msn-user.open .msn-user-btn{box-shadow:var(--nm-inset-xs,var(--shadow-sm));}",
    ".msn-user-name{max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
    ".msn-user-chev{font-size:.6rem;color:var(--text-muted);transition:transform .3s ease;}",
    ".msn-user.open .msn-user-chev{transform:rotate(180deg);}",
    ".msn-av{position:relative;display:inline-grid;place-items:center;width:34px;height:34px;flex-shrink:0;border-radius:50%;overflow:hidden;background:linear-gradient(135deg,var(--accent),var(--accent-dark));color:#fff;font-family:var(--font-display);font-weight:800;font-size:.95rem;}",
    ".msn-av b{font-weight:800;}",
    ".msn-av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}",
    ".msn-av-lg{width:52px;height:52px;font-size:1.2rem;box-shadow:var(--nm-raised-xs,var(--shadow-sm));}",
    ".msn-user-menu{position:absolute;top:calc(100% + 12px);inset-inline-end:0;width:290px;padding:14px;border-radius:24px;background:var(--nm-bg,var(--bg-card));box-shadow:var(--nm-raised,var(--shadow-lg));opacity:0;visibility:hidden;transform:translateY(-6px) scale(.97);transform-origin:top;transition:opacity .2s ease,transform .28s var(--ease),visibility 0s .28s;z-index:1100;}",
    ".msn-user.open .msn-user-menu{opacity:1;visibility:visible;transform:none;transition-delay:0s;}",
    ".msn-user-head{display:flex;align-items:center;gap:12px;padding:6px 4px 12px;}",
    ".msn-user-who{min-width:0;display:flex;flex-direction:column;}",
    ".msn-user-who strong{font-size:.95rem;color:var(--text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
    ".msn-user-who span{font-size:.76rem;color:var(--text-muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;direction:ltr;text-align:start;}",
    ".msn-user-info{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:16px;box-shadow:var(--nm-inset-xs,none);margin-bottom:10px;}",
    ".msn-user-row{display:flex;align-items:center;gap:8px;font-size:.78rem;color:var(--text-secondary);}",
    ".msn-user-row i{color:var(--accent);width:14px;text-align:center;}",
    ".msn-user-row strong{margin-inline-start:auto;color:var(--text);font-weight:700;}",
    ".msn-user-act{display:flex;align-items:center;gap:10px;width:100%;padding:11px 12px;border-radius:14px;font-size:.85rem;font-weight:700;color:var(--text);transition:box-shadow .25s ease,color .25s ease;}",
    ".msn-user-act:hover{box-shadow:var(--nm-inset-xs,none);color:var(--accent-dark);}",
    ".msn-user-act i{color:var(--accent);width:16px;text-align:center;}",
    ".msn-user-out,.msn-user-out i{color:#E0554B;}",
    ".msn-mprofile{padding:12px;border-radius:20px;box-shadow:var(--nm-inset-xs,none);}"
  ].join("\n");

  var style = document.createElement("style");
  style.id = "msnUserCss";
  style.textContent = css;
  document.head.appendChild(style);


  /* ---------- مزامنة الإعدادات (اللغة + المظهر) مع حساب المستخدم ---------- */
  function api(method, path, body) {
    return fetch("/api" + path, {
      method: method, credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : JSON.stringify(body || {})
    }).then(function (r) { return r.json(); });
  }
  var syncTimer = null, syncReady = false;
  function currentSettings() {
    return { lang: lang(), theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light" };
  }
  function pushSettings() {
    if (!syncReady || !serverUser) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(function () { api("PUT", "/me/data/settings", { value: currentSettings() }).catch(function () {}); }, 800);
  }
  function syncSettings() {
    api("GET", "/me/data").then(function (d) {
      var remote = d && d.data && d.data.settings;
      syncReady = true;
      var cur = currentSettings();
      // آخر اختيار على هذا الجهاز هو المرجع: نحدّث الحساب إن اختلف
      if (!remote || remote.lang !== cur.lang || remote.theme !== cur.theme) pushSettings();
    }).catch(function () {});
  }
  new MutationObserver(pushSettings).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "data-theme"] });

  render();

  // نسأل السيرفر من أنا؟ ونحدّث العرض. لو الجلسة منتهية يختفي الدخول فوراً.
  fetch("/api/auth/me", { credentials: "same-origin", cache: "no-store" })
    .then(function (r) { return r.json(); })
    .then(function (d) {
      serverUser = d && d.user ? d.user : null;
      try {
        if (serverUser) localStorage.setItem(KEY, JSON.stringify({ name: serverUser.name, email: serverUser.email, picture: serverUser.picture }));
        else localStorage.removeItem(KEY);
      } catch (e) {}
      window.MedSkyUser = serverUser;
      document.dispatchEvent(new CustomEvent("medsky:user", { detail: serverUser }));
      render();
      if (serverUser) syncSettings();
    })
    .catch(function () { /* السيرفر غير متاح: نُبقي العرض الحالي */ });

  /* مزامنة اللغة + تسجيل الدخول/الخروج من تبويب آخر */
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  window.addEventListener("storage", function (e) { if (e.key === KEY) { serverUser = undefined; render(); } });
})();