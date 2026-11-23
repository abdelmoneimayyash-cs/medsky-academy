/* زر "حفظ الدورة": يحفظ في حساب المستخدم على السيرفر (مفتاح saved-courses) */
(function () {
  "use strict";

  var LABEL = { ar: ["حفظ الدورة", "إزالة من المحفوظات"], en: ["Save course", "Remove from saved"] };
  var SHORT = { ar: ["حفظ", "تم الحفظ"], en: ["Save", "Saved"] };
  var cards = document.querySelectorAll("[data-course-link]");
  if (!cards.length) return;

  function lang() { return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar"; }
  function idOf(card) {
    var m = (card.getAttribute("data-course-link") || "").match(/([A-Za-z0-9_-]+)\.html$/);
    return m ? m[1] : null;
  }
  function call(method, path, body) {
    return fetch("/api" + path, {
      method: method, credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: method === "GET" ? undefined : JSON.stringify(body || {})
    }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, data: d }; }); });
  }

  var css = document.createElement("style");
  css.textContent =
    ".dc-save{position:static;flex-shrink:0;height:34px;padding:0 13px;margin:0 6px;border-radius:999px;display:inline-flex;align-items:center;gap:6px;font:inherit;font-size:.75rem;font-weight:700;line-height:1;white-space:nowrap;" +
    "background:var(--accent-soft);color:var(--accent);border:1px solid transparent;cursor:pointer;transition:transform .2s ease,background .2s ease,color .2s ease,border-color .2s ease,box-shadow .2s ease;}" +
    ".dc-save:hover{border-color:var(--accent);transform:translateY(-1px);}.dc-save:active{transform:scale(.95);}" +
    ".dc-save i{font-size:.82rem;}.dc-save.on{background:rgba(245,158,11,.14);color:#f59e0b;border-color:rgba(245,158,11,.45);}" +
    ".dc-save.on i{animation:dcPop .45s cubic-bezier(.34,1.56,.64,1);}@keyframes dcPop{0%{transform:scale(.4);}100%{transform:scale(1);}}" +
    "html[data-theme] .dc-save{box-shadow:var(--nm-raised-xs,none);}html[data-theme] .dc-save:active{box-shadow:var(--nm-inset-xs,none);}";
  document.head.appendChild(css);

  var saved = [];
  var buttons = [];

  function paint() {
    buttons.forEach(function (b) {
      var on = saved.indexOf(b.dataset.id) !== -1;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
      b.setAttribute("aria-label", LABEL[lang()][on ? 1 : 0]);
      b.firstChild.className = on ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark";
      b.lastChild.textContent = SHORT[lang()][on ? 1 : 0];
    });
  }

  cards.forEach(function (card) {
    var id = idOf(card);
    if (!id) return;
    var host = card.querySelector(".dc-foot") || card.querySelector(".dc-body") || card;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "dc-save";
    b.dataset.id = id;
    b.appendChild(document.createElement("i"));
    b.appendChild(document.createElement("span"));
    b.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation(); // لا تفتح صفحة الدورة
      if (!window.MedSkyUser) {
        location.href = "auth.html?next=courses.html";
        return;
      }
      var i = saved.indexOf(id);
      if (i === -1) saved.push(id); else saved.splice(i, 1);
      paint();
      call("PUT", "/me/data/saved-courses", { value: saved });
    });
    b.addEventListener("keydown", function (e) { e.stopPropagation(); });
    if (host.classList.contains("dc-foot") && host.lastElementChild) host.insertBefore(b, host.lastElementChild); else host.appendChild(b);
    buttons.push(b);
  });
  paint();

  function loadSaved() {
    call("GET", "/me/data").then(function (r) {
      if (r.ok && r.data.data && Array.isArray(r.data.data["saved-courses"])) { saved = r.data.data["saved-courses"]; paint(); }
    }).catch(function () {});
  }
  if (window.MedSkyUser) loadSaved();
  document.addEventListener("medsky:user", function (e) { if (e.detail) loadSaved(); });
  new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
