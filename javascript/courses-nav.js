    /* ===== الانتقال لصفحة الدورة عند الضغط على الكارد ===== */
    document.querySelectorAll('.diploma-card[data-course-link]').forEach(function (card) {
      var url = card.getAttribute('data-course-link');
      card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        window.location.href = url;
      });
      card.addEventListener('keydown', function (e) {
        if (e.target !== card) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = url;
        }
      });
    });

    /* ===== Navbar: سلوك الواجهة الجديدة =====
       ملاحظة: التمرير (scrolled)، القائمة المحمولة (فتح/إغلاق)، تبديل اللغة
       وحفظها، وحفظ الثيم، كلها لا تزال تعمل من courses.js دون تغيير. */
    (function () {
      var doc = document.documentElement;

      /* 1) تحديد الصفحة النشطة تلقائياً */
      var path = location.pathname.toLowerCase();
      var cur = path.split('/').pop() || 'index.html';
      if (path.indexOf('/courses/') !== -1) cur = 'courses.html';
      document.querySelectorAll('.msn-link[data-page], .msn-mlink[data-page]').forEach(function (a) {
        if (a.getAttribute('data-page') === cur) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });

      /* 2) قائمة اللغة (أيقونة + Dropdown) */
      var lang = document.getElementById('msnLang');
      var langBtn = document.getElementById('msnLangBtn');
      function setLang(open) {
        lang.classList.toggle('open', open);
        langBtn.setAttribute('aria-expanded', String(open));
      }
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setLang(!lang.classList.contains('open'));
      });
      lang.querySelectorAll('[data-lang]').forEach(function (b) {
        b.addEventListener('click', function () { setLang(false); });
      });
      document.addEventListener('click', function (e) {
        if (!lang.contains(e.target)) setLang(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setLang(false);
      });

      /* 3) زر الثيم (أيقونة واحدة تبدّل بين الفاتح والداكن) — يستخدم setTheme من courses.js */
      document.querySelectorAll('.js-theme-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          if (typeof setTheme === 'function') setTheme(next);
          else doc.setAttribute('data-theme', next);
        });
      });
    })();
  