/* Pagina unei ediții: /cina/ultimul-dans-6-noiembrie, /brunch/25-octombrie etc.
   Pe aceeași pagină a conceptului, arată sus ediția aleasă (dată, loc, preț, „Cumpără bilet”),
   pe mobil o bară fixă cu prețul și butonul, iar pe desktop un buton discret în colț.
   Pe adresa simplă a conceptului (/cina, /brunch...) nu schimbă nimic. Datele vin din /events.js. */

(function () {
  if (!window.SUSPECTI_EVENTS) return;
  var cale = location.pathname.toLowerCase().replace(/\/+$/, '');
  var ev = null;
  SUSPECTI_EVENTS.forEach(function (e) { if (e.page === cale) ev = e; });
  if (!ev) return;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var orasSlug = ev.city === 'București' ? 'bucuresti' : 'timisoara';
  var numeScurt = ev.title.split(' · ')[0];
  var btnStil = 'display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:52px; padding:0 26px; border-radius:999px; background:#A3172F; color:#FFFFFF; text-decoration:none; font-weight:600; white-space:nowrap;';
  var linkBilet = '<a href="' + esc(ev.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(ev.title) + '" class="btn" style="' + btnStil + '">Cumpără bilet <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></a>';

  document.title = ev.title + ' · ' + ev.date.split(', ')[1] + ' · ' + ev.city + ' · SUSPECȚI';

  function construieste() {
    var header = document.querySelector('header');
    if (!header) return;

    var linkuri = [];
    if (ev.theme) linkuri.push('<a href="' + ev.theme + '" style="color:#A3172F; font-weight:600;">Despre ' + (ev.key === 'Cină' || ev.key === 'Party' ? 'tematica ' : 'ediția ') + esc(numeScurt) + ' ↓</a>');
    if (ev.key === 'Cină' || ev.key === 'Party') linkuri.push('<a href="#tematici" style="color:#5A4649;">Vezi celelalte tematici</a>');
    linkuri.push('<a href="/calendar/' + orasSlug + '" style="color:#5A4649;">Vezi toate evenimentele din ' + esc(ev.city) + '</a>');

    var sec = document.createElement('section');
    sec.id = 'editie';
    sec.setAttribute('aria-label', 'Ediția aleasă');
    sec.style.cssText = 'background:#FAF6F3; padding:24px 0 28px;';
    sec.innerHTML =
      '<style>' +
      '.ed-card{display:grid; grid-template-columns:1fr; background:#FFFFFF; border:1px solid rgba(36,21,24,0.08); border-radius:20px; overflow:hidden; box-shadow:0 30px 60px -44px rgba(92,18,34,0.55);}' +
      '.ed-img{order:2; width:100%; aspect-ratio:4 / 3; object-fit:cover; display:block;}' +
      '@media (min-width:760px){.ed-card{grid-template-columns:minmax(0,1fr) 340px;}.ed-img{order:2; aspect-ratio:auto; height:100%; min-height:260px;}}' +
      '.ed-links a{display:inline-block; margin:0 18px 6px 0; font-size:14px;}' +
      '</style>' +
      '<div style="max-width:1120px; margin:0 auto; padding:0 20px;">' +
      '<article class="ed-card">' +
      '<div style="padding:22px 24px; display:flex; flex-direction:column; gap:10px; min-width:0;">' +
      '<span style="font-size:12px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#A3172F;">Ediția aleasă · ' + esc(ev.format) + '</span>' +
      '<h3 style="font-family:\'Playfair Display\',Georgia,serif; font-weight:500; font-size:clamp(26px,4.6vw,34px); line-height:1.15; margin:0; color:#241518;">' + esc(ev.title) + '</h3>' +
      '<div style="color:#241518; font-size:16px; line-height:1.5;"><strong>' + esc(ev.date) + ' · ' + esc(ev.time) + '</strong><br>' + esc(ev.venue) + ', ' + esc(ev.city) + '</div>' +
      '<div style="font-size:16px; color:#241518;"><strong style="font-size:19px;">' + esc(ev.price) + '</strong>' + (ev.extra ? '<span style="display:block; color:#5A4649; font-size:14px; margin-top:2px;">' + esc(ev.extra) + '</span>' : '') + '</div>' +
      '<div style="display:flex; flex-wrap:wrap; align-items:center; gap:10px 14px; margin-top:4px;">' + linkBilet + '<span style="font-size:13px; color:#5A4649;">Biletele se cumpără prin AmBilet</span></div>' +
      '<div class="ed-links" style="margin-top:6px; padding-top:12px; border-top:1px solid rgba(36,21,24,0.1);">' + linkuri.join('') + '</div>' +
      '</div>' +
      '<img class="ed-img" src="' + esc(ev.img) + '" alt="' + esc(ev.title) + '" style="object-position:' + esc(ev.pos || 'center 35%') + ';">' +
      '</article></div>';
    header.parentNode.insertBefore(sec, header.nextSibling);

    // Mobil: bara de jos existentă arată prețul ediției și „Cumpără bilet”.
    var bara = document.querySelector('.mbar');
    if (bara) {
      bara.innerHTML =
        '<div style="flex:1; min-width:0; color:#FBF3F1; line-height:1.25;">' +
        '<span style="display:block; font-size:12px; color:#EBC1BE; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + esc(ev.day + ' ' + ev.month.toLowerCase() + ' · ' + numeScurt + ' · ' + ev.city) + '</span>' +
        '<strong style="font-size:16px;">' + esc(ev.price) + '</strong></div>' +
        '<a href="' + esc(ev.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(ev.title) + '" style="display:inline-flex; align-items:center; justify-content:center; min-height:48px; padding:0 22px; border-radius:999px; background:#A3172F; color:#FFFFFF; text-decoration:none; font-weight:600;">Cumpără bilet</a>';
      bara.style.alignItems = 'center';
      // Bara rămâne fixă jos (în design era „sticky”, dar nu se lipea de ecran); pagina primește spațiu ca să nu acopere conținutul.
      bara.style.position = 'fixed';
      bara.style.left = '0';
      bara.style.right = '0';
      bara.style.bottom = '0';
      var spatiu = function () { document.body.style.paddingBottom = (window.matchMedia('(min-width:980px)').matches ? 0 : bara.offsetHeight) + 'px'; };
      spatiu();
      window.addEventListener('resize', spatiu);
    }

    // Desktop: buton discret în colț, după ce blocul ediției iese din ecran.
    var pastila = document.createElement('div');
    pastila.id = 'editie-pastila';
    pastila.style.cssText = 'position:fixed; right:20px; bottom:20px; z-index:60; display:none; align-items:center; gap:12px; padding:8px 8px 8px 18px; border-radius:999px; background:rgba(43,10,18,0.95); color:#FBF3F1; box-shadow:0 18px 40px -16px rgba(0,0,0,0.6); font-size:14px;';
    pastila.innerHTML = '<span>' + esc(ev.day + ' ' + ev.month.toLowerCase() + ' · ' + numeScurt) + '</span>' +
      '<a href="' + esc(ev.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(ev.title) + '" style="display:inline-flex; align-items:center; min-height:40px; padding:0 18px; border-radius:999px; background:#A3172F; color:#FFFFFF; text-decoration:none; font-weight:600;">Cumpără bilet</a>';
    document.body.appendChild(pastila);

    var blocVizibil = true, inFormular = false;
    function actualizeaza() {
      var cookie = !!document.getElementById('suspecti-cookie');
      var desktop = window.matchMedia('(min-width:980px)').matches;
      pastila.style.display = (desktop && !blocVizibil && !cookie) ? 'flex' : 'none';
      if (bara) bara.style.visibility = (cookie || inFormular) ? 'hidden' : '';
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (x) { blocVizibil = x[0].isIntersecting; actualizeaza(); }).observe(sec);
    }
    // Bara nu stă peste tastatură cât timp se completează un formular.
    document.addEventListener('focusin', function (e) { if (e.target.matches && e.target.matches('input, select, textarea')) { inFormular = true; actualizeaza(); } });
    document.addEventListener('focusout', function () { inFormular = false; actualizeaza(); });
    window.addEventListener('resize', actualizeaza);
    new MutationObserver(actualizeaza).observe(document.body, { childList: true });
    actualizeaza();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', construieste);
  else construieste();
})();
