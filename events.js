/* Evenimentele de pe site: calendar, pagini de ediție, bara de cumpărare.

   Sursa principală este sincronizarea automată cu AmBilet (bilete.suspectilacina.com/sync/events.js →
   window.SUSPECTI_SYNC), actualizată la 15 minute de cron-ul de pe Megahost. Peste ea se aplică ajustările
   editoriale din evenimente-editorial.js (după ID-ul AmBilet), care nu sunt suprascrise niciodată.
   Lista de rezervă de mai jos se folosește doar dacă sincronizarea nu poate fi încărcată.

   Stări: activ, reprogramat (se pot cumpăra bilete), epuizat, anulat (pagina rămâne, fără „Cumpără bilet”).
   Evenimentele retrase de la publicare, încheiate sau incomplete (ciorne) nu apar pe site. */

var SUSPECTI_EVENTS_REZERVA = [
  { id: '5062', iso: '2026-10-24', time: '10:00', key: 'Treasure Hunt', format: 'Suspecți în Treasure Hunt', city: 'Timișoara', venue: 'Parcul Copiilor', price: '60 lei', status: 'activ', link: 'https://bilete.suspectilacina.com/suspecti-in-treasure-hunt-family-edition-timisoara-5062' },
  { id: '5032', iso: '2026-10-24', time: '15:00', key: 'Treasure Hunt', format: 'Suspecți în Treasure Hunt', city: 'Timișoara', venue: 'Piața Unirii', price: '70 lei', status: 'activ', link: 'https://bilete.suspectilacina.com/suspecti-in-treasure-hunt-adults-only-timisoara-5032' },
  { id: '5024', iso: '2026-10-25', time: '14:00', key: 'Brunch', format: 'Suspecți la Brunch', city: 'București', venue: 'Naive', price: 'de la 70 lei', status: 'activ', link: 'https://bilete.suspectilacina.com/the-singing-brunch-suspecti-la-brunch-5024' },
  { id: '5061', iso: '2026-10-31', time: '20:00', key: 'Party', format: 'Suspecți la Party', city: 'Timișoara', venue: 'DaHUB', price: 'de la 89 lei', status: 'activ', link: 'https://bilete.suspectilacina.com/suspecti-la-party-halloween-edition-5061' },
  { id: '5044', iso: '2026-11-06', time: '20:00', key: 'Cină', format: 'Suspecți la Cină', city: 'București', venue: 'Mirador Rooftop', price: '179 lei', status: 'activ', link: 'https://bilete.suspectilacina.com/suspecti-la-cina-ultimul-dans-5044' },
  { id: '5089', iso: '2026-11-15', time: '14:00', key: 'Treasure Hunt', format: 'Suspecți în Treasure Hunt', city: 'București', venue: 'Piața Victoriei', price: '120 lei', status: 'activ', link: 'https://bilete.suspectilacina.com/suspecti-in-treasure-hunt-aduls-edition-2-bucuresti-5089' }
];

var SUSPECTI_EVENTS = [];
var SUSPECTI_MONTH_LABELS = [];

(function () {
  var LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
  var LUNI_TITLU = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
  var LUNI_SCURT = ['IAN', 'FEB', 'MAR', 'APR', 'MAI', 'IUN', 'IUL', 'AUG', 'SEP', 'OCT', 'NOI', 'DEC'];
  var ZILE = ['DUM', 'LUN', 'MAR', 'MIE', 'JOI', 'VIN', 'SÂM'];
  var ZILE_LUNGI = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
  var acum = new Date();
  var azi = acum.toISOString().slice(0, 10);

  var sync = window.SUSPECTI_SYNC && window.SUSPECTI_SYNC.events;
  var sursa = sync || SUSPECTI_EVENTS_REZERVA;
  var ed = window.SUSPECTI_EDITORIAL || {};

  sursa.forEach(function (s) {
    var e = {};
    Object.keys(s).forEach(function (k) { e[k] = s[k]; });
    var aj = ed[e.id] || {};
    if (aj.hidden) return;
    Object.keys(aj).forEach(function (k) { e[k] = aj[k]; });
    if (!e.iso || e.iso < azi) return;

    var d = new Date(e.iso + 'T12:00:00');
    e.weekday = ZILE[d.getDay()]; e.day = String(d.getDate()); e.month = LUNI_SCURT[d.getMonth()];
    e.date = ZILE_LUNGI[d.getDay()] + ', ' + d.getDate() + ' ' + LUNI[d.getMonth()] + ' ' + d.getFullYear();
    e.meta = [e.time, e.venue].filter(Boolean).join(' · ');
    e.status = e.status || 'activ';
    e.bookable = e.status === 'activ' || e.status === 'reprogramat';
    e.page = e.page || '/calendar';
    e.title = e.title || '';
    e.theme = e.theme || '';

    // Prețuri cu termen: până la data „until” (inclusiv) se afișează prețul redus, evidențiat; apoi automat prețul obișnuit.
    e.priceNote = '';
    (e.tiers || []).some(function (t) {
      if (acum > new Date(t.until + 'T23:59:59+03:00')) return false;
      var p = t.until.split('-');
      e.priceNote = t.label + ': ' + t.price + ' până pe ' + parseInt(p[2], 10) + ' ' + LUNI[parseInt(p[1], 10) - 1] + ', apoi ' + e.price;
      e.price = t.price;
      return true;
    });
    SUSPECTI_EVENTS.push(e);
  });

  SUSPECTI_EVENTS.sort(function (a, b) { return (a.iso + a.time).localeCompare(b.iso + b.time); });

  // Lunile calendarului se calculează din evenimente (m = indexul lunii în SUSPECTI_MONTH_LABELS)
  var chei = [];
  SUSPECTI_EVENTS.forEach(function (e) {
    var k = e.iso.slice(0, 7);
    if (chei.indexOf(k) < 0) { chei.push(k); SUSPECTI_MONTH_LABELS.push(LUNI_TITLU[parseInt(k.slice(5), 10) - 1] + ' ' + k.slice(0, 4)); }
    e.m = chei.indexOf(k);
  });
  window.SUSPECTI_EVENTS = SUSPECTI_EVENTS;
  window.SUSPECTI_MONTH_LABELS = SUSPECTI_MONTH_LABELS;

  // Prima pagină („Urmează”): cardurile sunt scrise direct în pagină; aici le actualizăm prețul, termenul și starea.
  function cardurileDePeAcasa() {
    SUSPECTI_EVENTS.forEach(function (ev) {
      var a = document.querySelector('article.event-card a.btn[href="' + ev.page + '"]');
      if (!a) return;
      var pret = a.parentNode.querySelector('span');
      if (pret) pret.textContent = ev.bookable ? ev.price : (ev.status === 'anulat' ? 'Anulat' : 'Bilete epuizate');
      if (ev.priceNote && ev.bookable && !a.parentNode.parentNode.querySelector('.pret-termen')) {
        var n = document.createElement('span');
        n.className = 'pret-termen';
        n.style.cssText = 'display:inline-block; margin-top:8px; padding:4px 10px; border-radius:999px; background:#A3172F; color:#FFFFFF; font-size:12px; font-weight:700;';
        n.textContent = ev.priceNote;
        a.parentNode.parentNode.insertBefore(n, a.parentNode);
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cardurileDePeAcasa);
  else cardurileDePeAcasa();
})();
