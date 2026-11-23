/* يحدد نوع الجهاز ويضعه على <html data-os="..."> ليختار CSS خط النظام المناسب
   (iPhone/Mac → SF، Android → خط الجهاز/Roboto، Windows → Segoe UI). */
(function () {
  var ua = navigator.userAgent || "";
  var os = "other";
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) os = "ios";
  else if (/Android/i.test(ua)) os = "android";
  else if (/Windows/i.test(ua)) os = "windows";
  else if (/Macintosh|Mac OS X/i.test(ua)) os = "mac";
  document.documentElement.setAttribute("data-os", os);
})();
