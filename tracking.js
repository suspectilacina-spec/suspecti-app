/* Măsurare SUSPECȚI: Meta Pixel (doar cu acordul vizitatorului) + evenimentele importante pentru campanii.
   Pixelul se activează după ce completezi ID-ul de mai jos (Meta Events Manager → Surse de date → ID-ul setului de date). */

var SUSPECTI_PIXEL_ID = '2155243451986484'; // Suspecti La Cina Main Pixel

var SUSPECTI_PAGINI = {
  'cina': 'Suspecți la Cină',
  'party': 'Suspecți la Party',
  'treasurehunt': 'Suspecți în Treasure Hunt',
  'brunch': 'The Singing Brunch',
  'primavedere': 'Suspecți la Prima Vedere',
  'automachiaj': 'Suspecți la Automachiaj',
  'povesti': 'Suspecți la Povești',
  'calendar': 'Calendar & bilete',
  'bucuresti': 'Calendar & bilete · București',
  'timisoara': 'Calendar & bilete · Timișoara',
  'corporate': 'Pentru companii',
  'private': 'Evenimente private'
};

function suspectiAcord() {
  try { return localStorage.getItem('suspecti_cookie_acord'); } catch (e) { return null; }
}

function suspectiSalveazaAcord(val) {
  try { localStorage.setItem('suspecti_cookie_acord', val); } catch (e) {}
}

// Trimite un eveniment către Meta, doar dacă Pixelul e pornit (vizitatorul a acceptat).
function suspectiTrack(eveniment, parametri) {
  if (window.fbq && window.suspectiPixelPornit) window.fbq('track', eveniment, parametri || {});
}

function suspectiPornestePixel() {
  if (!SUSPECTI_PIXEL_ID || window.suspectiPixelPornit) return;
  /* Codul de bază Meta Pixel */
  !function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init', SUSPECTI_PIXEL_ID);
  window.suspectiPixelPornit = true;
  window.fbq('track', 'PageView');
  // Pe paginile de ediție (/cina/ultimul-dans-6-noiembrie) contează conceptul: primul segment al adresei.
  var segmente = location.pathname.toLowerCase().replace(/.html$/, '').split('/').filter(Boolean);
  var pagina = segmente[segmente.length - 1] || 'acasa';
  if (!SUSPECTI_PAGINI[pagina] && segmente.length > 1) pagina = segmente[0];
  if (SUSPECTI_PAGINI[pagina]) suspectiTrack('ViewContent', { content_name: SUSPECTI_PAGINI[pagina], content_category: 'Pagină experiență' });
}

// Atribuire: parametrii din reclamă (UTM, fbclid) sunt păstrați cât timp omul navighează pe site
// și adăugați la linkul AmBilet în momentul clicului. Nu trimite nimic către Meta.
var SUSPECTI_PARAM_ATRIBUIRE = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
(function () {
  try {
    var q = new URLSearchParams(location.search), salvat = JSON.parse(sessionStorage.getItem('suspecti_atribuire') || '{}');
    SUSPECTI_PARAM_ATRIBUIRE.forEach(function (k) { if (q.get(k)) salvat[k] = q.get(k); });
    sessionStorage.setItem('suspecti_atribuire', JSON.stringify(salvat));
  } catch (e) {}
})();
function suspectiAtribuire(a) {
  try {
    var salvat = JSON.parse(sessionStorage.getItem('suspecti_atribuire') || '{}');
    var u = new URL(a.href);
    SUSPECTI_PARAM_ATRIBUIRE.forEach(function (k) { if (salvat[k] && !u.searchParams.get(k)) u.searchParams.set(k, salvat[k]); });
    a.href = u.toString();
  } catch (e) {}
}

// Clicuri importante: bilete (AmBilet), WhatsApp, email.
document.addEventListener('click', function (e) {
  var a = e.target.closest ? e.target.closest('a[href]') : null;
  if (!a) return;
  var href = a.getAttribute('href');
  if (href.indexOf('ambilet.ro') !== -1 || href.indexOf('bilete.suspectilacina.com') !== -1) {
    suspectiAtribuire(a);
    var card = a.closest('article, .event-card');
    var titlu = a.getAttribute('data-editie') || (card && card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : a.textContent.trim());
    suspectiTrack('InitiateCheckout', { content_name: titlu, currency: 'RON' });
  } else if (href.indexOf('wa.me') !== -1) {
    suspectiTrack('Contact', { content_category: 'WhatsApp' });
  } else if (href.indexOf('mailto:') === 0) {
    suspectiTrack('Contact', { content_category: 'Email' });
  }
}, true);

// Bannerul de acord pentru cookie-uri. Se poate redeschide din pagina Confidențialitate.
function suspectiCookieBanner() {
  if (!SUSPECTI_PIXEL_ID || document.getElementById('suspecti-cookie')) return;
  var d = document.createElement('div');
  d.id = 'suspecti-cookie';
  d.setAttribute('role', 'dialog');
  d.setAttribute('aria-label', 'Acord cookie-uri');
  d.style.cssText = 'position:fixed; left:16px; right:16px; bottom:16px; z-index:100; max-width:560px; margin:0 auto; background:#2B0A12; color:#FBF3F1; border:1px solid rgba(235,193,190,0.3); border-radius:18px; padding:18px 20px; box-shadow:0 24px 50px -20px rgba(0,0,0,0.6); font-family:Manrope,system-ui,sans-serif; font-size:15px; line-height:1.5;';
  d.innerHTML = '<p style="margin:0 0 14px;">Folosim cookie-uri de marketing (Meta) ca să vedem ce funcționează și să-ți arătăm evenimente potrivite. Le activăm doar dacă ești de acord. <a href="/confidentialitate" style="color:#EBC1BE;">Detalii</a></p>' +
    '<div style="display:flex; gap:10px; flex-wrap:wrap;">' +
    '<button type="button" data-acord="da" style="min-height:44px; padding:0 22px; border:0; border-radius:999px; background:#A3172F; color:#FFFFFF; font:inherit; font-weight:600; cursor:pointer;">Accept</button>' +
    '<button type="button" data-acord="nu" style="min-height:44px; padding:0 22px; border:1px solid rgba(251,243,241,0.4); border-radius:999px; background:transparent; color:#FBF3F1; font:inherit; font-weight:600; cursor:pointer;">Refuz</button>' +
    '</div>';
  d.addEventListener('click', function (e) {
    var v = e.target.getAttribute && e.target.getAttribute('data-acord');
    if (!v) return;
    suspectiSalveazaAcord(v);
    d.remove();
    if (v === 'da') suspectiPornestePixel();
  });
  document.body.appendChild(d);
}

document.addEventListener('DOMContentLoaded', function () {
  var acord = suspectiAcord();
  if (acord === 'da') suspectiPornestePixel();
  else if (acord === null) suspectiCookieBanner();
});
