/* Regula pentru „Cumpără bilet”: biletele se cumpără prin white label-ul AmBilet, pe bilete.suspectilacina.com.

   Fiecare eveniment AmBilet are un identificator unic: slug-ul care se termină cu ID-ul numeric, de exemplu
   suspecti-la-cina-ultimul-dans-5044  (5044 = ID-ul AmBilet). Același identificator există în white label:
     https://www.ambilet.ro/bilete/suspecti-la-cina-ultimul-dans-5044
     → https://bilete.suspectilacina.com/suspecti-la-cina-ultimul-dans-5044
   Pe site păstrăm linkul AmBilet (în events.js și în pagini), iar regula de mai jos îl transformă automat.
   Astfel se aplică și evenimentelor viitoare: e suficient ca ediția nouă să aibă linkul ei AmBilet.

   SUSPECTI_BILETE.activ = false → butoanele duc la ambilet.ro (cum era înainte). */

var SUSPECTI_BILETE = { activ: false, baza: 'https://bilete.suspectilacina.com/' };

function suspectiLinkBilet(link) {
  if (!SUSPECTI_BILETE.activ || !link) return link;
  var m = String(link).match(/^https?:\/\/(?:www\.)?ambilet\.ro\/bilete\/([a-z0-9][a-z0-9-]*-\d+)\/?(\?[^#]*)?$/i);
  return m ? SUSPECTI_BILETE.baza + m[1] + (m[2] || '') : link;
}

// Linkurile scrise direct în pagini sau create ulterior (calendar, alegerea ediției) sunt transformate
// la încărcare și, ca rezervă, chiar în momentul clicului.
(function () {
  if (!SUSPECTI_BILETE.activ) return;
  function transforma(radacina) {
    (radacina.querySelectorAll ? radacina : document).querySelectorAll('a[href*="ambilet.ro/bilete/"]').forEach(function (a) {
      var nou = suspectiLinkBilet(a.getAttribute('href'));
      if (nou !== a.getAttribute('href')) a.setAttribute('href', nou);
    });
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href*="ambilet.ro/bilete/"]') : null;
    if (a) a.setAttribute('href', suspectiLinkBilet(a.getAttribute('href')));
  }, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { transforma(document); });
  else transforma(document);
  new MutationObserver(function (m) { m.forEach(function (x) { x.addedNodes.forEach(function (n) { if (n.nodeType === 1) transforma(n); }); }); })
    .observe(document.documentElement, { childList: true, subtree: true });
})();
