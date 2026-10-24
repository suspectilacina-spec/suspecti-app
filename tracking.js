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
  'private': 'Evenimente private',
  'revelion': 'Suspecți la Revelion'
};

// Acordul e unul singur pentru tot domeniul: cookie-ul wl_ck (1 = da, 0 = nu) pe .suspectilacina.com
// este citit și de bilete.suspectilacina.com, care astfel nu mai afișează al doilea banner.
var SUSPECTI_COOKIE_ACORD = 'wl_ck';

function suspectiCitesteCookieAcord() {
  var m = document.cookie.match(new RegExp('(?:^|; )' + SUSPECTI_COOKIE_ACORD + '=([01])'));
  return m ? (m[1] === '1' ? 'da' : 'nu') : null;
}

function suspectiScrieCookieAcord(val) {
  var domeniu = /(^|\.)suspectilacina\.com$/.test(location.hostname) ? '; domain=.suspectilacina.com' : '';
  document.cookie = SUSPECTI_COOKIE_ACORD + '=' + (val === 'da' ? '1' : '0') + domeniu + '; path=/; max-age=31536000; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
}

function suspectiAcord() {
  var acord = suspectiCitesteCookieAcord();
  if (acord) return acord;
  // Alegerile făcute înainte de cookie-ul comun sunt mutate în cookie.
  try { acord = localStorage.getItem('suspecti_cookie_acord'); } catch (e) { acord = null; }
  if (acord === 'da' || acord === 'nu') suspectiScrieCookieAcord(acord);
  return acord;
}

function suspectiSalveazaAcord(val) {
  suspectiScrieCookieAcord(val);
  try { localStorage.setItem('suspecti_cookie_acord', val); } catch (e) {}
}

// Linkul „Schimbă preferințele pentru cookie-uri” din pagina Confidențialitate.
function suspectiSchimbaAcord() {
  var b = document.getElementById('suspecti-cookie');
  if (b) b.remove();
  suspectiCookieBanner();
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
  d.setAttribute('aria-describedby', 'suspecti-cookie-text');
  if (!document.getElementById('suspecti-cookie-css')) {
    var css = document.createElement('style');
    css.id = 'suspecti-cookie-css';
    css.textContent =
      '#suspecti-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;max-width:520px;margin:0 auto;background:#2B0A12;color:#FBF3F1;' +
      'border:1px solid rgba(235,193,190,0.28);border-radius:20px;padding:20px 22px 18px;box-shadow:0 28px 60px -18px rgba(0,0,0,0.7);' +
      'font-family:Manrope,system-ui,sans-serif;font-size:15px;line-height:1.55;animation:sc-in .35s ease-out;}' +
      '#suspecti-cookie .sc-t{display:flex;align-items:center;gap:10px;margin:0 0 6px;font-family:"Playfair Display",Georgia,serif;font-size:21px;font-weight:500;color:#FFFFFF;}' +
      '#suspecti-cookie p{margin:0 0 16px;color:#E9DCD6;}' +
      '#suspecti-cookie a{color:#EBC1BE;text-decoration:underline;}' +
      '#suspecti-cookie .sc-b{display:grid;grid-template-columns:1fr 1fr;gap:10px;}' +
      '#suspecti-cookie button{min-height:48px;padding:0 18px;border-radius:999px;font:inherit;font-size:16px;font-weight:700;cursor:pointer;}' +
      '#suspecti-cookie [data-acord=da]{border:0;background:#A3172F;color:#FFFFFF;box-shadow:0 10px 24px -12px rgba(163,23,47,0.9);}' +
      '#suspecti-cookie [data-acord=nu]{border:1px solid rgba(251,243,241,0.55);background:transparent;color:#FBF3F1;}' +
      '#suspecti-cookie button:focus-visible{outline:3px solid #EBC1BE;outline-offset:2px;}' +
      '@media (max-width:519px){#suspecti-cookie{left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));padding:22px 20px 20px;font-size:17px;}' +
      '#suspecti-cookie .sc-t{font-size:24px;}#suspecti-cookie button{min-height:54px;font-size:18px;}}' +
      '@keyframes sc-in{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:none;}}' +
      '@media (prefers-reduced-motion:reduce){#suspecti-cookie{animation:none;}}';
    document.head.appendChild(css);
  }
  d.innerHTML = '<div class="sc-t"><span aria-hidden="true">🍪</span>Cookie-uri</div>' +
    '<p id="suspecti-cookie-text">Folosim cookie-uri de marketing (Meta Pixel) ca să vedem ce funcționează și să-ți arătăm evenimente potrivite. Le pornim doar dacă ești de acord. Alegerea ta e valabilă și pe pagina de bilete. <a href="/confidentialitate">Detalii</a></p>' +
    '<div class="sc-b">' +
    '<button type="button" data-acord="nu">Refuz</button>' +
    '<button type="button" data-acord="da">Accept</button>' +
    '</div>';
  d.addEventListener('click', function (e) {
    var v = e.target.getAttribute && e.target.getAttribute('data-acord');
    if (!v) return;
    suspectiSalveazaAcord(v);
    d.remove();
    if (window.fbq && window.suspectiPixelPornit) window.fbq('consent', v === 'da' ? 'grant' : 'revoke');
    else if (v === 'da') suspectiPornestePixel();
  });
  document.body.appendChild(d);
}

document.addEventListener('DOMContentLoaded', function () {
  var acord = suspectiAcord();
  if (acord === 'da') suspectiPornestePixel();
  else if (acord === null) suspectiCookieBanner();
});
