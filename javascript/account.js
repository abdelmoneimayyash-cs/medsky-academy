const COURSES = {
  EditorialDiploma: { url: "courses/EditorialDiploma.html", ar: "دبلومة الترجمة الطبية التحريرية بالذكاء الاصطناعي", en: "AI-Powered Medical Editorial Translation Diploma" },
  InstantDiploma: { url: "courses/InstantDiploma.html", ar: "دبلومة الترجمة الطبية الفورية الشاملة", en: "Comprehensive Medical Interpreting Diploma" },
};

const TRANSLATIONS = {
  ar: {
    meta: { title: "حسابي | MedSky Training Academy" },
    nav: { home: "الرئيسية", courses: "الدورات", programs: "نحو الاحتراف", programsShort: "البرامج", trainers: "المدربون", contact: "تواصل معنا", signup: "إبدأ مجاناٌ" },
    theme: { light: "فاتح", dark: "داكن" },
    mobile: { appearance: "المظهر", language: "اللغة", login: "تسجيل الدخول" },
    aria: { chooseTheme: "اختر المظهر", chooseLang: "اختر اللغة", openMenu: "فتح القائمة", closeMenu: "إغلاق القائمة", showPassword: "إظهار كلمة المرور", hidePassword: "إخفاء كلمة المرور" },
    register: { name: "الاسم الكامل", confirm: "تأكيد كلمة المرور" },
    reset: { newPassword: "كلمة المرور الجديدة" },
    modal: { successTitle: "", successMessage: "" },
    errors: {
      required: "هذا الحقل مطلوب", minLength: "يجب ألا تقل كلمة المرور عن 8 أحرف", passwordLong: "كلمة المرور طويلة جداً",
      nameLength: "الاسم يجب أن يكون بين 2 و80 حرفاً", mismatch: "كلمتا المرور غير متطابقتين", wrongPassword: "كلمة المرور غير صحيحة",
      network: "تعذّر الاتصال بالخادم", server: "حدث خطأ غير متوقع، حاول مجدداً", tooMany: "محاولات كثيرة، حاول لاحقاً",
    },
    acc: {
      logout: "تسجيل الخروج", profile: "بيانات الحساب", joined: "تاريخ الانضمام", lastLogin: "آخر دخول", save: "حفظ التغييرات",
      saved: "دوراتي المحفوظة", savedEmpty: "لم تحفظ أي دورة بعد. تصفّح الدورات واضغط على أيقونة الحفظ.", browse: "تصفّح الدورات",
      changePw: "تغيير كلمة المرور", setPw: "تعيين كلمة مرور", currentPw: "كلمة المرور الحالية", updatePw: "تحديث كلمة المرور",
      danger: "حذف الحساب", dangerText: "سيتم حذف حسابك وجميع بياناتك المحفوظة نهائياً ولا يمكن التراجع.",
      confirmPw: "أدخل كلمة المرور للتأكيد", deleteBtn: "حذف حسابي نهائياً", confirmDelete: "هل أنت متأكد من حذف حسابك نهائياً؟",
      savedOk: "تم حفظ التغييرات", pwOk: "تم تحديث كلمة المرور، وتم تسجيل خروجك من الأجهزة الأخرى.", google: "حساب Google", email: "حساب بالبريد", remove: "إزالة",
    },
  },
  en: {
    meta: { title: "My Account | MedSky Training Academy" },
    nav: { home: "Home", courses: "Courses", programs: "Toward Mastery", programsShort: "Programs", trainers: "Trainers", contact: "Contact Us", signup: "Start Free" },
    theme: { light: "Light", dark: "Dark" },
    mobile: { appearance: "Appearance", language: "Language", login: "Log In" },
    aria: { chooseTheme: "Choose theme", chooseLang: "Choose language", openMenu: "Open menu", closeMenu: "Close menu", showPassword: "Show password", hidePassword: "Hide password" },
    register: { name: "Full Name", confirm: "Confirm Password" },
    reset: { newPassword: "New Password" },
    modal: { successTitle: "", successMessage: "" },
    errors: {
      required: "This field is required", minLength: "Password must be at least 8 characters", passwordLong: "Password is too long",
      nameLength: "Name must be between 2 and 80 characters", mismatch: "Passwords do not match", wrongPassword: "Incorrect password",
      network: "Can't reach the server", server: "Something went wrong, please try again", tooMany: "Too many attempts, please try later",
    },
    acc: {
      logout: "Log Out", profile: "Account Details", joined: "Joined", lastLogin: "Last login", save: "Save Changes",
      saved: "Saved Courses", savedEmpty: "You haven't saved any course yet. Browse courses and tap the save icon.", browse: "Browse Courses",
      changePw: "Change Password", setPw: "Set a Password", currentPw: "Current Password", updatePw: "Update Password",
      danger: "Delete Account", dangerText: "Your account and all saved data will be permanently deleted. This cannot be undone.",
      confirmPw: "Enter your password to confirm", deleteBtn: "Delete my account permanently", confirmDelete: "Are you sure you want to permanently delete your account?",
      savedOk: "Changes saved", pwOk: "Password updated. Other devices have been signed out.", google: "Google account", email: "Email account", remove: "Remove",
    },
  },
};

const LANG_META = {
  ar: { dir: "rtl", flag: "🇸🇦", label: "العربية" },
  en: { dir: "ltr", flag: "🇬🇧", label: "English" },
};

const LANG_KEY = "medsky-lang";
const THEME_KEY = "medsky-theme";

(function () {
  "use strict";

  let currentLang = "ar";
  const root = document.documentElement;

  function resolveKey(dict, key) {
    const parts = key.split(".");
    let node = dict;
    for (const part of parts) {
      if (node == null) return undefined;
      node = node[part];
    }
    return node;
  }

  function t(key) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ar;
    const value = resolveKey(dict, key);
    return value !== undefined ? value : key;
  }

  /* ---------- اللودر ---------- */
  const siteLoader = document.getElementById("siteLoader");
  function hideLoader() {
    if (!siteLoader) return;
    siteLoader.classList.add("loader-hide");
    setTimeout(() => siteLoader.remove(), 600);
  }
  const loaderStart = performance.now();
  const MIN_LOADER_TIME = 500;
  function finishLoader() {
    const elapsed = performance.now() - loaderStart;
    const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);
    setTimeout(hideLoader, remaining);
  }
  if (document.readyState !== "loading") {
    finishLoader();
  } else {
    document.addEventListener("DOMContentLoaded", finishLoader);
    setTimeout(finishLoader, 1800);
  }

  /* ---------- الوضع الليلي/الفاتح (زر أيقونة واحد: شمس ⇄ قمر) ---------- */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const mobileVal = document.getElementById("mobileThemeValue");
    if (mobileVal) mobileVal.textContent = t(theme === "dark" ? "theme.dark" : "theme.light");
  }
  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }
  function toggleTheme() {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  }
  ["themeToggle", "mobileThemeToggle"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", toggleTheme);
  });

  /* ---------- الترجمة ---------- */
  function applyTranslations(lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ar;

    document.title = resolveKey(dict, "meta.title");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = resolveKey(dict, key);
      if (value !== undefined) el.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = resolveKey(dict, key);
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const value = resolveKey(dict, key);
      if (value !== undefined) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-arrow]").forEach((icon) => {
      icon.classList.remove("fa-arrow-left", "fa-arrow-right");
      icon.classList.add(lang === "en" ? "fa-arrow-right" : "fa-arrow-left");
    });

    document.querySelectorAll("[data-toggle-for]").forEach((btn) => {
      const icon = btn.querySelector("i");
      const isHidden = icon && icon.classList.contains("fa-eye-slash");
      btn.setAttribute("aria-label", resolveKey(dict, isHidden ? "aria.hidePassword" : "aria.showPassword"));
    });

    const mobileThemeVal = document.getElementById("mobileThemeValue");
    if (mobileThemeVal) {
      const activeTheme = root.getAttribute("data-theme") || "light";
      mobileThemeVal.textContent = resolveKey(dict, activeTheme === "dark" ? "theme.dark" : "theme.light");
    }
  }

  function updateLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = "ar";
    currentLang = lang;
    const meta = LANG_META[lang] || LANG_META.ar;

    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", meta.dir);

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    applyTranslations(lang);
    clearAllErrors();

    localStorage.setItem(LANG_KEY, lang);
  }

  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateLanguage(btn.getAttribute("data-lang"));
      closeAllDropdowns();
    });
  });

  /* ---------- قائمة اللغة (أيقونة + Dropdown) ---------- */
  const dropdowns = [
    { trigger: "langToggle", menu: "langMenu", parent: "langDD" },
  ];
  function closeAllDropdowns() {
    dropdowns.forEach(({ trigger, menu, parent }) => {
      const tEl = document.getElementById(trigger);
      const m = document.getElementById(menu);
      const p = document.getElementById(parent);
      if (m) m.classList.remove("open");
      if (tEl) tEl.setAttribute("aria-expanded", "false");
      if (p) p.classList.remove("open-state");
    });
  }
  dropdowns.forEach(({ trigger, menu, parent }) => {
    const tEl = document.getElementById(trigger);
    const m = document.getElementById(menu);
    const p = document.getElementById(parent);
    if (!tEl || !m) return;
    tEl.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = m.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) {
        m.classList.add("open");
        tEl.setAttribute("aria-expanded", "true");
        if (p) p.classList.add("open-state");
      }
    });
  });
  document.addEventListener("click", closeAllDropdowns);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ---------- القائمة الجوالة (لوحة عائمة) ---------- */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add("open");
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
    });
  }
  if (mobileClose) mobileClose.addEventListener("click", closeMobileMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeMobileMenu));
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu && mobileMenu.classList.contains("open")) closeMobileMenu();
  });

  /* ---------- النافبار عند التمرير ---------- */
  const navbar = document.getElementById("navbar");
  function onScrollNav() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 80 + i * 90);
    });
  });

  document.querySelectorAll(".btn-ripple").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple-el";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  document.querySelectorAll("[data-toggle-for]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.getAttribute("data-toggle-for"));
      if (!input) return;
      const icon = btn.querySelector("i");
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.classList.toggle("fa-eye", !isHidden);
      icon.classList.toggle("fa-eye-slash", isHidden);
      btn.setAttribute("aria-label", isHidden ? t("aria.hidePassword") : t("aria.showPassword"));
    });
  });

  /* ---------- أدوات الحقول والرسائل ---------- */
  function setFieldError(id, key) {
    const input = document.getElementById(id);
    if (!input) return;
    const field = input.closest(".auth-field");
    const err = document.querySelector(`[data-error-for="${id}"]`);
    if (field) field.classList.add("has-error");
    if (err) err.textContent = t(key);
  }
  function clearAllErrors() {
    document.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
    document.querySelectorAll("[data-error-for]").forEach((el) => (el.textContent = ""));
    document.querySelectorAll("[data-form-error]").forEach((el) => { el.textContent = ""; el.className = "auth-form-error"; });
  }
  function formMsg(form, key, ok) {
    const el = form.querySelector("[data-form-error]");
    if (!el) return;
    el.textContent = key ? t(key) : "";
    el.className = "auth-form-error" + (key ? " show" : "") + (ok ? " ok" : "");
  }
  const SERVER_ERR = {
    required: "errors.required", password_short: "errors.minLength", password_long: "errors.passwordLong",
    name_length: "errors.nameLength", wrong_password: "errors.wrongPassword",
  };

  async function api(method, path, body) {
    try {
      const res = await fetch("/api" + path, {
        method, credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: method === "GET" ? undefined : JSON.stringify(body || {}),
      });
      let data = {};
      try { data = await res.json(); } catch { /* ignore */ }
      return { ok: res.ok, status: res.status, data };
    } catch {
      return { ok: false, status: 0, data: { error: "network" } };
    }
  }
  function showErr(form, map, r) {
    const d = r.data || {};
    if (d.error === "validation" && d.fields) {
      let any = false;
      for (const [k, code] of Object.entries(d.fields)) if (map[k]) { setFieldError(map[k], SERVER_ERR[code] || "errors.server"); any = true; }
      if (any) return;
    }
    formMsg(form, d.error === "network" ? "errors.network" : d.error === "too_many_requests" ? "errors.tooMany" : "errors.server", false);
  }
  function loading(form, on) {
    const b = form.querySelector(".auth-submit");
    if (b) b.classList.toggle("is-loading", on);
  }
  function fmtDate(ts) {
    if (!ts) return "—";
    try { return new Date(ts).toLocaleDateString(currentLang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium" }); } catch { return "—"; }
  }
  function fmtDateTime(ts) {
    if (!ts) return "—";
    try { return new Date(ts).toLocaleString(currentLang === "ar" ? "ar-EG" : "en-GB", { dateStyle: "medium", timeStyle: "short" }); } catch { return "—"; }
  }

  /* ---------- الحالة ---------- */
  const shell = document.getElementById("accShell");
  let me = null;
  let saved = [];

  function renderProfile() {
    if (!me) return;
    const av = document.getElementById("accAvatar");
    av.textContent = "";
    av.appendChild(document.createTextNode((me.name || me.email).trim().charAt(0).toUpperCase()));
    if (me.picture) {
      const img = new Image();
      img.alt = ""; img.referrerPolicy = "no-referrer";
      img.onerror = () => img.remove();
      img.src = me.picture;
      av.appendChild(img);
    }
    document.getElementById("accName").textContent = me.name;
    document.getElementById("accEmail").textContent = me.email;
    document.getElementById("accJoined").textContent = fmtDate(me.createdAt);


    // حساب Google بدون كلمة مرور: يعيّن كلمة مرور بدل "تغيير"
    document.getElementById("curPwField").style.display = me.hasPassword ? "" : "none";
    document.getElementById("delPwField").style.display = me.hasPassword ? "" : "none";
    document.getElementById("pwTitle").textContent = t(me.hasPassword ? "acc.changePw" : "acc.setPw");
    const ni = document.getElementById("accNameInput");
    if (document.activeElement !== ni) ni.value = me.name;
  }

  function renderSaved() {
    const list = document.getElementById("savedList");
    list.textContent = "";
    const items = saved.filter((id) => COURSES[id]);
    document.getElementById("savedEmpty").hidden = items.length > 0;
    items.forEach((id) => {
      const row = document.createElement("div");
      row.className = "acc-saved-item";
      const a = document.createElement("a");
      a.href = COURSES[id].url;
      a.textContent = COURSES[id][currentLang] || COURSES[id].ar;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", t("acc.remove"));
      btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      btn.addEventListener("click", async () => {
        saved = saved.filter((x) => x !== id);
        renderSaved();
        await api("PUT", "/me/data/saved-courses", { value: saved });
      });
      row.appendChild(a); row.appendChild(btn);
      list.appendChild(row);
    });
  }

  function renderAll() { renderProfile(); renderSaved(); }
  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  /* ---------- النماذج ---------- */
  const nameForm = document.getElementById("nameForm");
  nameForm.addEventListener("submit", async (e) => {
    e.preventDefault(); clearAllErrors();
    const name = document.getElementById("accNameInput").value.trim();
    if (name.length < 2) return setFieldError("accNameInput", name ? "errors.nameLength" : "errors.required");
    loading(nameForm, true);
    const r = await api("PATCH", "/me", { name });
    loading(nameForm, false);
    if (!r.ok) return showErr(nameForm, { name: "accNameInput" }, r);
    me = r.data.user;
    try { localStorage.setItem("medsky-user-hint", JSON.stringify({ name: me.name, email: me.email, picture: me.picture })); } catch { /* ignore */ }
    renderProfile();
    formMsg(nameForm, "acc.savedOk", true);
  });

  const pwForm = document.getElementById("pwForm");
  pwForm.addEventListener("submit", async (e) => {
    e.preventDefault(); clearAllErrors();
    const cur = document.getElementById("curPw").value;
    const pw = document.getElementById("newPw").value;
    const pw2 = document.getElementById("newPw2").value;
    let ok = true;
    if (me.hasPassword && !cur) { setFieldError("curPw", "errors.required"); ok = false; }
    if (!pw) { setFieldError("newPw", "errors.required"); ok = false; }
    else if (pw.length < 8) { setFieldError("newPw", "errors.minLength"); ok = false; }
    if (pw2 !== pw) { setFieldError("newPw2", "errors.mismatch"); ok = false; }
    if (!ok) return;
    loading(pwForm, true);
    const r = await api("POST", "/me/password", { current: cur, password: pw });
    loading(pwForm, false);
    if (!r.ok) return showErr(pwForm, { current: "curPw", password: "newPw" }, r);
    pwForm.reset();
    me.hasPassword = true;
    renderProfile();
    formMsg(pwForm, "acc.pwOk", true);
  });

  const delForm = document.getElementById("delForm");
  delForm.addEventListener("submit", async (e) => {
    e.preventDefault(); clearAllErrors();
    const pw = document.getElementById("delPw").value;
    if (me.hasPassword && !pw) return setFieldError("delPw", "errors.required");
    if (!window.confirm(t("acc.confirmDelete"))) return;
    const r = await api("DELETE", "/me", { password: pw });
    if (!r.ok) return showErr(delForm, { password: "delPw" }, r);
    try { localStorage.removeItem("medsky-user-hint"); } catch { /* ignore */ }
    location.href = "index.html";
  });

  document.getElementById("accLogout").addEventListener("click", async () => {
    await api("POST", "/auth/logout", {});
    try { localStorage.removeItem("medsky-user-hint"); } catch { /* ignore */ }
    location.href = "index.html";
  });

  /* ---------- التشغيل الأولي ---------- */
  initTheme();
  updateLanguage(localStorage.getItem(LANG_KEY) || "ar");

  (async function load() {
    const r = await api("GET", "/auth/me");
    if (!r.ok || !r.data.user) {
      location.replace("auth.html?next=account.html");
      return;
    }
    me = r.data.user;
    const d = await api("GET", "/me/data");
    if (d.ok && d.data.data && Array.isArray(d.data.data["saved-courses"])) saved = d.data.data["saved-courses"];
    renderAll();
    shell.hidden = false;
    document.querySelectorAll(".acc-shell .reveal-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), 80 + i * 90));
  })();
})();
