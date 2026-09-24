const TRANSLATIONS = {
  ar: {
    meta: { title: "تسجيل الدخول | MedSky Training Academy" },
    nav: {
      home: "الرئيسية",
      courses: "الدورات",
      programs: "نحو الاحتراف",
      programsShort: "البرامج",
      trainers: "المدربون",
      contact: "تواصل معنا",
      signup: "إبدأ مجاناٌ",
    },
    theme: { light: "فاتح", dark: "داكن" },
    mobile: { appearance: "المظهر", language: "اللغة", login: "تسجيل الدخول" },
    aria: {
      chooseTheme: "اختر المظهر",
      chooseLang: "اختر اللغة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      showPassword: "إظهار كلمة المرور",
      hidePassword: "إخفاء كلمة المرور",
    },
    login: {
      title: "مرحباً بعودتك",
      subtitle: "سجل الدخول لمتابعة رحلتك التعليمية",
      email: "البريد الإلكتروني",
      emailPlaceholder: "you@example.com",
      password: "كلمة المرور",
      passwordPlaceholder: "••••••••",
      remember: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      button: "تسجيل الدخول",
      continueWith: "أو تابع عبر",
      google: "جوجل",
      linkedin: "لينكدإن",
      needHelp: "تحتاج مساعدة؟",
      googleError: "حدث خطأ أثناء تسجيل الدخول باستخدام Google",
    },
    errors: {
      required: "هذا الحقل مطلوب",
      email: "يرجى إدخال بريد إلكتروني صحيح",
      minLength: "يجب ألا تقل كلمة المرور عن 8 أحرف",
    },
    toast: {
      forgot: "أدخل بريدك الإلكتروني في الحقل أعلاه ثم اضغط هنا مجدداً لإرسال رابط الاستعادة",
    },
    modal: {
      successTitle: "تم تسجيل الدخول بنجاح",
      successMessage: "جاري تحويلك إلى الصفحة الرئيسية...",
    },
  },
  en: {
    meta: { title: "Log In | MedSky Training Academy" },
    nav: {
      home: "Home",
      courses: "Courses",
      programs: "Toward Mastery",
      programsShort: "Programs",
      trainers: "Trainers",
      contact: "Contact Us",
      signup: "Start Free",
    },
    theme: { light: "Light", dark: "Dark" },
    mobile: { appearance: "Appearance", language: "Language", login: "Log In" },
    aria: {
      chooseTheme: "Choose theme",
      chooseLang: "Choose language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      showPassword: "Show password",
      hidePassword: "Hide password",
    },
    login: {
      title: "Welcome Back",
      subtitle: "Sign in to continue your learning journey",
      email: "Email Address",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      remember: "Remember Me",
      forgotPassword: "Forgot Password?",
      button: "Sign In",
      continueWith: "Or continue with",
      google: "Google",
      linkedin: "LinkedIn",
      needHelp: "Need Help?",
      googleError: "An error occurred while signing in with Google",
    },
    errors: {
      required: "This field is required",
      email: "Please enter a valid email address",
      minLength: "Password must be at least 8 characters",
    },
    toast: {
      forgot: "Enter your email above, then click here again to send a reset link",
    },
    modal: {
      successTitle: "Login Successful",
      successMessage: "Redirecting you to the home page...",
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
  const MIN_LOADER_TIME = 700;
  function finishLoader() {
    const elapsed = performance.now() - loaderStart;
    const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);
    setTimeout(hideLoader, remaining);
  }
  if (document.readyState === "complete") {
    finishLoader();
  } else {
    window.addEventListener("load", finishLoader);
    setTimeout(finishLoader, 3000);
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

    const submitIcon = document.getElementById("loginSubmitIcon");
    if (submitIcon) {
      submitIcon.classList.remove("fa-arrow-left", "fa-arrow-right");
      submitIcon.classList.add(lang === "en" ? "fa-arrow-right" : "fa-arrow-left");
    }

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

  /* ---------- التحقق من الحقول ---------- */
  function setFieldError(fieldId, messageKey) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const field = input.closest(".auth-field");
    const errorEl = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (field) field.classList.add("has-error");
    if (errorEl) errorEl.textContent = messageKey ? t(messageKey) : "";
  }
  function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    if (!input) return;
    const field = input.closest(".auth-field");
    const errorEl = document.querySelector(`[data-error-for="${fieldId}"]`);
    if (field) field.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }
  function clearAllErrors() {
    document.querySelectorAll(".has-error").forEach((el) => el.classList.remove("has-error"));
    document.querySelectorAll("[data-error-for]").forEach((el) => (el.textContent = ""));
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateLogin() {
    let valid = true;
    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    clearFieldError("loginEmail");
    clearFieldError("loginPassword");

    if (!email.value.trim()) { setFieldError("loginEmail", "errors.required"); valid = false; }
    else if (!EMAIL_RE.test(email.value.trim())) { setFieldError("loginEmail", "errors.email"); valid = false; }

    if (!password.value) { setFieldError("loginPassword", "errors.required"); valid = false; }
    else if (password.value.length < 8) { setFieldError("loginPassword", "errors.minLength"); valid = false; }

    return valid;
  }

  /* ---------- Toast + Modal ---------- */
  const toast = document.getElementById("authToast");
  const toastText = document.getElementById("authToastText");
  let toastTimer = null;
  function showToast(messageKey, isError) {
    if (!toast) return;
    toastText.textContent = t(messageKey);
    toast.classList.toggle("error", !!isError);
    toast.querySelector("i").className = isError ? "fa-solid fa-circle-exclamation" : "fa-solid fa-circle-check";
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
  }

  const successModalOverlay = document.getElementById("successModalOverlay");
  function showSuccessModal(redirectUrl, delay) {
    if (!successModalOverlay) {
      window.location.href = redirectUrl;
      return;
    }
    successModalOverlay.classList.add("show");
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, delay);
  }

  /* ---------- Google Login ---------- */
  const GOOGLE_CLIENT_ID =
    "363762432129-glaeb2se4fvqgbnf0qv6ak61pqsqcili.apps.googleusercontent.com";

  function handleGoogleLogin(response) {
    console.log("Google response:", response);

    // بيانات Google تصل هنا
    const credential = response.credential;

    if (!credential) {
      showToast("login.googleError", true);
      return;
    }

    // فك بيانات المستخدم الموجودة داخل JWT
    try {
      const payload = JSON.parse(atob(credential.split(".")[1]));

      console.log("Google user:", payload);

      // حفظ بيانات المستخدم مؤقتًا
      localStorage.setItem(
        "medsky-google-user",
        JSON.stringify({
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        })
      );

      showSuccessModal("index.html", 1200);
    } catch (error) {
      console.error("Google login error:", error);
      showToast("login.googleError", true);
    }
  }

  function initGoogleLogin() {
    if (!window.google) {
      console.error("Google Identity Services لم يتم تحميلها بعد.");
      return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    const googleButton = document.getElementById("googleLoginBtn");

    if (googleButton) {
      googleButton.addEventListener("click", () => {
        google.accounts.id.prompt();
      });
    }
  }

  window.addEventListener("load", () => {
    setTimeout(initGoogleLogin, 500);
  });

  document.querySelectorAll(".auth-social-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.getAttribute("data-provider");

      if (provider === "linkedin") {
        window.location.href = "https://www.linkedin.com/";
      }
    });
  });

  /* ---------- نموذج تسجيل الدخول ---------- */
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateLogin()) return;
      const submitBtn = loginForm.querySelector(".auth-submit");
      submitBtn.classList.add("is-loading");
      setTimeout(() => {
        submitBtn.classList.remove("is-loading");
        showSuccessModal("index.html", 1800);
      }, 900);
    });
  }

  const forgotLink = document.getElementById("forgotPasswordLink");
  if (forgotLink) {
    forgotLink.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("toast.forgot", false);
    });
  }

  /* ---------- التشغيل الأولي ---------- */
  const savedLang = localStorage.getItem(LANG_KEY) || "ar";
  initTheme();
  updateLanguage(savedLang);
})();