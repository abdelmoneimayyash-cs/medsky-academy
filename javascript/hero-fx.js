/* مؤثرات مشتركة:
   1) شبكة مربعات متحركة في هيرو الرئيسية (خلايا تُضيء + نقاط تركض على خطوط الشبكة)
   2) Parallax خفيف مع الماوس
   3) حلقة تقدّم على زر العودة للأعلى
   4) تلميح + إشعار "انقر على الدورة لعرض التفاصيل" */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isAr = function () { return document.documentElement.getAttribute("lang") !== "en"; };

  /* ---------- 1) شبكة المربعات ---------- */
  var CELL = 64;
  var fxs = document.querySelectorAll('.hero-fx[data-fx="grid"]');
  function r(n) { return Math.floor(Math.random() * n); }
  function buildGrid(fx) {
    var w = fx.clientWidth, h = fx.clientHeight;
    if (!w || !h) return;
    var cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL), small = w < 640;
    var html = '<div class="hg-lines"></div><div class="hg-lines hot"></div>';
    for (var i = 0; i < (small ? 9 : 22); i++) {
      html += '<i class="hg-c" style="left:' + r(cols) * CELL + "px;top:" + r(rows) * CELL + "px;--t:" + (4 + Math.random() * 4).toFixed(1) + "s;--d:" + (-Math.random() * 6).toFixed(1) + 's"></i>';
    }
    for (var k = 0; k < (small ? 3 : 6); k++) {
      html += '<i class="hg-r h" style="--y:' + (1 + r(rows)) * CELL + "px;--w:" + w + "px;--t:" + (6 + Math.random() * 5).toFixed(1) + "s;--d:" + (-Math.random() * 8).toFixed(1) + 's"></i>';
      html += '<i class="hg-r v" style="--x:' + (1 + r(cols)) * CELL + "px;--h:" + h + "px;--t:" + (7 + Math.random() * 5).toFixed(1) + "s;--d:" + (-Math.random() * 8).toFixed(1) + 's"></i>';
    }
    fx.innerHTML = html;
    // كل خلية تنتقل لمربع جديد عند انتهاء دورتها
    fx.querySelectorAll(".hg-c").forEach(function (c) {
      c.addEventListener("animationiteration", function () { c.style.left = r(cols) * CELL + "px"; c.style.top = r(rows) * CELL + "px"; });
    });
  }
  fxs.forEach(function (fx) {
    buildGrid(fx);
    var t, lw = fx.clientWidth;
    fx._h = fx.clientHeight;
    window.addEventListener("load", function () { if (Math.abs(fx.clientHeight - fx._h) > 40) { fx._h = fx.clientHeight; buildGrid(fx); } });
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () { if (Math.abs(fx.clientWidth - lw) > 40) { lw = fx.clientWidth; buildGrid(fx); } }, 250); });
  });
  if ("IntersectionObserver" in window && fxs.length) {
    var po = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("is-paused", !e.isIntersecting); }); });
    fxs.forEach(function (fx) { po.observe(fx); });
  }


  /* تفاعل المؤشر مع المربعات: توهّج على الخطوط حول المؤشر + مربع يُضيء ويتلاشى تحته */
  if (fxs.length && !reduce) {
    var mx = 0, my = 0, mt = "mouse", pend = false;
    var lightCell = function (fx, x, y) {
      var col = Math.floor(x / CELL), row = Math.floor(y / CELL), key = col + "," + row;
      if (fx._last === key || fx.childElementCount > 70) return;
      fx._last = key;
      var t = document.createElement("i");
      t.className = "hg-t"; t.style.left = col * CELL + "px"; t.style.top = row * CELL + "px";
      t.addEventListener("animationend", function () { t.remove(); });
      fx.appendChild(t);
    };
    var handle = function () {
      pend = false;
      fxs.forEach(function (fx) {
        var b = fx.getBoundingClientRect(), x = mx - b.left, y = my - b.top;
        var inside = x >= 0 && y >= 0 && x <= b.width && y <= b.height;
        if (inside && mt !== "touch") { fx.style.setProperty("--cx", x + "px"); fx.style.setProperty("--cy", y + "px"); }
        fx.classList.toggle("hot-on", inside && mt !== "touch");
        if (inside) lightCell(fx, x, y);
      });
    };
    var onMove = function (e) { mx = e.clientX; my = e.clientY; mt = e.pointerType || "mouse"; if (!pend) { pend = true; requestAnimationFrame(handle); } };
    window.addEventListener("pointermove", function (e) { if (e.pointerType !== "touch") onMove(e); }, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });   // الضغط على اللمس يُضيء مربعاً
    document.addEventListener("mouseleave", function () { fxs.forEach(function (fx) { fx.classList.remove("hot-on"); }); });
  }

  /* ---------- 3) حلقة التقدّم على زر العودة للأعلى ---------- */
  var btt = document.getElementById("backToTop");
  if (btt) {
    btt.insertAdjacentHTML("afterbegin", '<svg class="btt-ring" viewBox="0 0 56 56" aria-hidden="true"><circle class="bg" cx="28" cy="28" r="26"/><circle class="fg" cx="28" cy="28" r="26" pathLength="100"/></svg>');
    var fg = btt.querySelector(".fg"), ticking = false;
    var upd = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      fg.style.strokeDashoffset = (100 - p * 100).toFixed(1);
      ticking = false;
    };
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    window.addEventListener("resize", upd);
    upd();
  }

  /* ---------- 4) تلميح + إشعار على كاردات الدورات ---------- */
  var cards = document.querySelectorAll("[data-course-link]");
  if (cards.length) {
    var touch = window.matchMedia && matchMedia("(hover: none)").matches;
    var TXT = {
      ar: { hint: touch ? "اضغط لعرض التفاصيل" : "انقر لعرض التفاصيل", toast: touch ? "اضغط على أي دورة لعرض تفاصيلها" : "انقر على أي دورة لعرض تفاصيلها", close: "إغلاق" },
      en: { hint: touch ? "Tap for details" : "Click for details", toast: touch ? "Tap any course to see its details" : "Click any course to see its details", close: "Close" }
    };
    var hints = [];
    cards.forEach(function (card) {
      var host = card.querySelector(".dc-img, .course-img-wrap");
      if (!host) return;
      var h = document.createElement("span");
      h.className = "c-hint";
      h.innerHTML = '<i class="fa-solid fa-hand-pointer"></i><span></span>';
      host.appendChild(h); hints.push(h);
    });
    var setTxt = function () { var t = TXT[isAr() ? "ar" : "en"]; hints.forEach(function (h) { h.lastChild.textContent = t.hint; }); if (toast) toast.querySelector("span.tt").textContent = t.toast; };
    var toast = null;
    new MutationObserver(setTxt).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

    var shown = false;
    try { shown = sessionStorage.getItem("medsky-course-hint") === "1"; } catch (e) {}
    var grid = cards[0].parentElement;
    if (!shown && grid && "IntersectionObserver" in window) {
      var go = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        go.disconnect();
        try { sessionStorage.setItem("medsky-course-hint", "1"); } catch (e) {}
        toast = document.createElement("div");
        toast.className = "fx-toast"; toast.setAttribute("role", "status");
        toast.innerHTML = '<span class="ti"><i class="fa-solid fa-hand-pointer"></i></span><span class="tt"></span><button type="button" aria-label="close"><i class="fa-solid fa-xmark"></i></button>';
        document.body.appendChild(toast); setTxt();
        var hide = function () { toast.classList.remove("show"); setTimeout(function () { toast.remove(); toast = null; }, 600); };
        toast.querySelector("button").addEventListener("click", hide);
        requestAnimationFrame(function () { requestAnimationFrame(function () { toast.classList.add("show"); }); });
        setTimeout(hide, 5500);
      }, { threshold: 0.35 });
      go.observe(grid);
    }
    setTxt();
  }

  /* ---------- 2) Parallax (أجهزة الماوس فقط) ---------- */
  if (reduce || !window.matchMedia || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var map = [
    [".hero-orb.orb-a", 26], [".hero-orb.orb-b", 20], [".hero-orb.orb-c", 14], [".ph-orb-1", 26], [".ph-orb-2", 20], [".hero-glow", 10],
    [".hero-badge i", 6], [".ph-kicker i", 6], [".why-icon", 9], [".stat-icon", 9], [".benefits-badge-float i", 7],
    [".dc-cat i", 6], [".mt-ico", 6], [".sys-ico", 6], [".ben-ico", 6], [".ri-ico", 6], [".axis-ico", 6], [".cert-ico", 6], [".fc-ico", 6], [".me-ico", 6], [".auth-brand-icon", 8]
  ];
  var items = [];
  map.forEach(function (m) { document.querySelectorAll(m[0]).forEach(function (el) { items.push({ el: el, d: m[1], on: false }); }); });
  if (!items.length) return;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        for (var k = 0; k < items.length; k++) if (items[k].el === e.target) { items[k].on = e.isIntersecting; if (!e.isIntersecting) e.target.style.translate = ""; }
      });
    });
    items.forEach(function (it) { io.observe(it.el); });
  } else items.forEach(function (it) { it.on = true; });
  var tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  function tick() {
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
    for (var k = 0; k < items.length; k++) { var it = items[k]; if (it.on) it.el.style.translate = (cx * it.d).toFixed(2) + "px " + (cy * it.d).toFixed(2) + "px"; }
    raf = (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) ? requestAnimationFrame(tick) : 0;
  }
  function kick() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("pointermove", function (e) { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; kick(); }, { passive: true });
  document.addEventListener("mouseleave", function () { tx = 0; ty = 0; kick(); });
})();
