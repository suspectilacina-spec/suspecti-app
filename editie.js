/* Pagina unei ediții: /cina/ultimul-dans-6-noiembrie, /treasurehunt/family-timisoara-24-octombrie etc.
   Cine ajunge aici dintr-o reclamă vede direct ediția: ce este, când și unde, cât durează, cât costă,
   video și „Cumpără bilet” (direct la evenimentul corect pe bilete.suspectilacina.com).
   Ordinea secțiunilor: ce se întâmplă → ce include biletul și condițiile → dress code și informații practice
   → fotografii și testimoniale → întrebări frecvente și încă un buton de cumpărare → companii și private.
   Datele: events.js (dată, loc, preț, link) + editii-continut.js (textele ediției). */

(function () {
  var UI = window.SuspectiUI, esc = UI.esc;
  var cale = location.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/+$/, '');
  var EVENTS = window.SUSPECTI_EVENTS || [];
  var ev = null;
  EVENTS.forEach(function (e) { if (e.page === cale) ev = e; });
  var root = document.getElementById('editie');

  var CONCEPT_PAG = { cina: ['Cină', 'Suspecți la Cină'], party: ['Party', 'Suspecți la Party'], brunch: ['Brunch', 'The Singing Brunch'], treasurehunt: ['Treasure Hunt', 'Suspecți în Treasure Hunt'] };
  var IG = 'https://www.instagram.com/suspectilacina/';
  var FB = 'https://www.facebook.com/p/Suspec%C8%9Bi-la-cin%C4%83-61570281509401/';
  var SAGEATA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';

  function sectiune(id, kick, titlu, interior, fundal) {
    return '<section id="' + id + '" class="s-sec"' + (fundal ? ' style="background:' + fundal + ';"' : '') + '><div class="s-wrap">' +
      (kick ? '<span class="s-kick">' + esc(kick) + '</span>' : '') + (titlu ? '<h2 class="s-h2">' + esc(titlu) + '</h2>' : '') + interior + '</div></section>';
  }
  function listaSimpla(arr) { return '<ul class="s-lista">' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }
  function butonBilet(text) {
    return '<a class="s-btn" href="' + esc(ev.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(ev.title) + '">' + (text || 'Cumpără bilet') + ' ' + SAGEATA + '</a>';
  }
  function blocOrganizare() {
    return '<section class="s-sec ed-org"><div class="s-wrap ed-org-in">' +
      '<p>Vrei să organizezi o experiență Suspecți pentru compania ta sau pentru un eveniment privat?</p>' +
      '<div style="display:flex; flex-wrap:wrap; gap:10px;"><a class="s-btn" href="/corporate">Pentru companii</a><a class="s-btn-2" href="/private">Evenimente private</a></div>' +
      '</div></section>';
  }

  /* ---------- Ediția nu există (încheiată sau link greșit) ---------- */
  function faraEditie() {
    var seg = cale.split('/').filter(Boolean)[0] || '';
    var c = CONCEPT_PAG[seg];
    var urm = EVENTS.filter(function (e) { return (!c || e.key === c[0]) && e.bookable; });
    document.title = 'Ediția nu mai este disponibilă · SUSPECȚI';
    root.innerHTML = '<section class="s-sec"><div class="s-wrap">' +
      '<span class="s-kick">' + esc(c ? c[1] : 'SUSPECȚI') + '</span>' +
      '<h1 class="s-h2" style="font-size:clamp(32px,5vw,46px);">Ediția aceasta nu mai este disponibilă</h1>' +
      '<p class="s-lead">S-a încheiat sau a fost mutată. ' + (urm.length ? 'Uite următoarele ediții' + (c ? ' ' + esc(c[1]) : '') + ':' : 'Nu avem încă o dată nouă pentru această experiență.') + '</p>' +
      (urm.length ? UI.lista(urm, false) : '') +
      '<div style="display:flex; flex-wrap:wrap; gap:10px; margin-top:24px;">' +
      '<a class="s-btn" href="/calendar">Vezi toate evenimentele</a>' + (c ? '<a class="s-btn-2" href="/' + seg + '">Despre ' + esc(c[1]) + '</a>' : '') + '</div>' +
      '</div></section>' + blocOrganizare();
  }

  /* ---------- Date structurate (schema.org Event) ---------- */
  function ultimaDuminica(an, luna) { var d = new Date(Date.UTC(an, luna + 1, 0)); d.setUTCDate(d.getUTCDate() - d.getUTCDay()); return d.getUTCDate(); }
  function offsetRO(iso) { // ora de vară în România: din ultima duminică din martie până în ultima duminică din octombrie
    var an = +iso.slice(0, 4), l = +iso.slice(5, 7) - 1, z = +iso.slice(8, 10);
    var vara = (l > 2 && l < 9) || (l === 2 && z >= ultimaDuminica(an, 2)) || (l === 9 && z < ultimaDuminica(an, 9));
    return vara ? '+03:00' : '+02:00';
  }
  function dateStructurate() {
    var nr = parseFloat(String(ev.price).replace(',', '.').replace(/[^0-9.]/g, ''));
    var data = {
      '@context': 'https://schema.org', '@type': 'Event',
      name: ev.concept + ': ' + ev.title + (ev.tip ? ' — ' + ev.tip : ''),
      startDate: ev.iso + 'T' + (ev.time || '00:00') + ':00' + offsetRO(ev.iso),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: ev.status === 'anulat' ? 'https://schema.org/EventCancelled' : (ev.status === 'reprogramat' ? 'https://schema.org/EventRescheduled' : 'https://schema.org/EventScheduled'),
      location: { '@type': 'Place', name: ev.venue, address: { '@type': 'PostalAddress', addressLocality: ev.city, addressCountry: 'RO' } },
      image: [location.origin + UI.img(ev.img, 'g')],
      description: (window.SUSPECTI_EDITII[ev.id] || {}).scurt || ev.tip || '',
      organizer: { '@type': 'Organization', name: 'SUSPECȚI', url: 'https://www.suspectilacina.com' }
    };
    if (nr) data.offers = { '@type': 'Offer', price: nr, priceCurrency: 'RON', url: ev.link, availability: ev.bookable ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut' };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
    var can = document.createElement('link');
    can.rel = 'canonical'; can.href = 'https://www.suspectilacina.com' + ev.page;
    document.head.appendChild(can);
  }

  /* ---------- Pagina ediției ---------- */
  function construieste() {
    if (!root) return;
    if (!ev) return faraEditie();

    var tipKey = ev.key === 'Cină' ? 'cina' : ev.key === 'Party' ? 'party' : ev.key === 'Brunch' ? 'brunch' : (ev.varianta || 'adults');
    var C = (window.SUSPECTI_EDITII || {})[ev.id] || {};
    var D = (window.SUSPECTI_CONCEPTE || {})[tipKey] || {};
    function v(k) { return C[k] != null ? C[k] : D[k]; }
    var cina = ev.key === 'Cină';
    var dataLunga = ev.date + (ev.time ? ', ora ' + ev.time : '');

    document.title = ev.concept + ': ' + ev.title + (ev.tip ? ' — ' + ev.tip : '') + ' · ' + ev.date.split(', ')[1] + ' · ' + ev.city;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', (C.scurt || ev.tip || '') + ' ' + dataLunga + ', ' + ev.venue + ', ' + ev.city + '.');
    dateStructurate();

    // 1–4: numele, tipul, explicația, data/ora/locul/durata/prețul, video, „Cumpără bilet”
    var fapte = '<div><dt>Când</dt><dd>' + esc(dataLunga) + '</dd></div>' +
      '<div><dt>Unde</dt><dd>' + esc(ev.venue) + '<small>' + esc(ev.city) + '</small></dd></div>' +
      (ev.durata ? '<div><dt>Durată</dt><dd>' + esc(ev.durata) + '</dd></div>' : '') +
      '<div><dt>Preț</dt><dd>' + (ev.bookable ? esc(ev.price) + (ev.priceNote ? '<small>' + esc(ev.priceNote) + '</small>' : '') : esc(ev.status === 'anulat' ? 'Ediție anulată' : 'Bilete epuizate')) + '</dd></div>';
    var areVideo = !!(ev.video && ev.poster);
    var hero = '<section class="ed-hero" id="ed-hero"><div class="s-wrap ed-grid"><div style="min-width:0;">' +
      '<h1 class="ed-h1"><span class="ed-c">' + esc(ev.concept) + (cina ? ':' : ' · ' + esc(ev.city)) + '</span>' +
      '<span class="ed-t">' + esc(ev.title) + '</span>' + (ev.tip ? '<span class="ed-s">' + (cina ? '— ' : '') + esc(ev.tip) + '</span>' : '') + '</h1>' +
      (C.scurt ? '<p class="ed-scurt">' + esc(C.scurt) + '</p>' : '') +
      '<dl class="ed-facts">' + fapte + '</dl>' +
      (ev.statusNote ? '<p style="margin:14px 0 0; padding:10px 14px; border-radius:12px; background:#F3DCD8; color:#A3172F; font-weight:700;">' + esc(ev.statusNote) + '</p>' : '') +
      '<div class="ed-cta" id="ed-cta">' + (ev.bookable ? butonBilet() : '<a class="s-btn" href="/calendar">Vezi alte ediții</a>') +
      '<a class="s-link" href="#ce-se-intampla">Ce se întâmplă la această ediție ↓</a></div>' +
      (ev.bookable ? '<p class="ed-nota">Biletele se cumpără prin AmBilet, partenerul nostru de ticketing. După plată, biletul vine pe email.</p>' : '') +
      (areVideo ? '<div class="ed-vid-mob">' + UI.videoThumb(ev.video, ev.poster, 'Vezi videoul', 'Câteva momente de la ' + ev.concept) + '</div>' : '') +
      '</div>' +
      (areVideo ? '<div class="ed-vid-desk" id="ed-vid-desk"></div>' : '') +
      '</div></section>';

    // 5: ce se întâmplă
    var poveste = (v('poveste') || []).map(function (p) { return '<p class="ed-p">' + esc(p) + '</p>'; }).join('');
    if (!poveste && ev.description) poveste = '<div class="ed-p">' + ev.description + '</div>';
    var pasi = v('pasi') || [];
    var s5 = sectiune('ce-se-intampla', 'La această ediție', 'Ce se întâmplă', '<div class="ed-2col"><div>' + poveste +
      (CONCEPT_PAG[cale.split('/')[1]] ? '<a class="s-link" href="/' + cale.split('/')[1] + '">Mai multe despre ' + esc(ev.concept) + ' →</a>' : '') + '</div>' +
      (pasi.length ? '<div><h3 class="ed-h3">Cum decurge</h3><ol class="s-pasi">' + pasi.map(function (p) { return '<li><strong>' + esc(p.t) + '</strong><span>' + esc(p.d) + '</span></li>'; }).join('') + '</ol></div>' : '') +
      '</div>');

    // 6: ce include biletul + condiții
    var include = v('include') || [], conditii = v('conditii') || [], extra = v('extra') || [];
    var s6 = (include.length || conditii.length) ? sectiune('bilet', 'Biletul', 'Ce include și ce trebuie să știi', '<div class="ed-2col">' +
      (include.length ? '<div class="ed-box"><h3 class="ed-h3">Biletul include</h3>' + listaSimpla(include) + '</div>' : '') +
      (conditii.length ? '<div class="ed-box"><h3 class="ed-h3">Condiții de participare</h3>' + listaSimpla(conditii) +
        (extra.length ? '<details style="margin-top:14px;"><summary class="s-link" style="cursor:pointer;">' + esc(v('extraTitlu') || 'Detalii') + '</summary>' + listaSimpla(extra) + '</details>' : '') + '</div>' : '') +
      '</div>', '#FFFFFF') : '';

    // 7: dress code + informații practice
    var dress = v('dress'), practic = v('practic') || [];
    var s7 = (dress || practic.length) ? sectiune('practic', 'Înainte să vii', dress ? 'Dress code și informații practice' : 'Informații practice', '<div class="ed-2col">' +
      (dress ? '<div><h3 class="ed-h3">' + esc(dress.titlu) + '</h3><p class="ed-p">' + esc(dress.text) + '</p></div>' : '') +
      (practic.length ? '<div><h3 class="ed-h3">Bine de știut</h3>' + listaSimpla(practic) + '</div>' : '') + '</div>') : '';

    // 8: fotografii + testimoniale + rețele
    var foto = v('foto') || [], testim = v('testimoniale') || [];
    var s8 = sectiune('fotografii', 'Din edițiile anterioare', 'Cum arată', (foto.length ? '<div class="s-galerie">' + foto.map(function (f) {
        return '<img src="' + esc(UI.img(f[0], 'g')) + '" alt="' + esc(f[1]) + '" loading="lazy" width="960" height="720">'; }).join('') + '</div>' : '') +
      (testim.length ? '<div class="s-testim">' + testim.map(function (t) { return '<figure><blockquote>' + esc(t[0]) + '</blockquote><figcaption>' + esc(t[1]) + '</figcaption></figure>'; }).join('') + '</div>' : '') +
      '<p class="ed-p" style="margin-top:22px;">Mai multe fotografii și video de la edițiile noastre găsești pe:</p>' +
      '<div class="s-social" style="margin-top:0;"><a class="s-btn-2" href="' + IG + '" target="_blank" rel="noopener noreferrer">Instagram</a><a class="s-btn-2" href="' + FB + '" target="_blank" rel="noopener noreferrer">Facebook</a></div>', '#FFFFFF');

    // 9: întrebări frecvente + încă un buton
    var exclus = C.faqFaraComun || [];
    var faq = (C.faq || []).concat(D.faq || []).concat((window.SUSPECTI_FAQ_COMUN || []).filter(function (q) { return exclus.indexOf(q[0]) < 0; }));
    var vazute = {};
    faq = faq.filter(function (q) { if (vazute[q[0]]) return false; vazute[q[0]] = 1; return true; });
    var s9 = sectiune('intrebari', 'Întrebări frecvente', 'Înainte să-ți iei bilet', '<div class="s-faq">' + faq.map(function (q) {
        return '<details><summary>' + esc(q[0]) + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div>' +
      '<p class="ed-p" style="margin-top:16px;">Ai altă întrebare? <a href="https://wa.me/40755639871" target="_blank" rel="noopener noreferrer">Scrie-ne pe WhatsApp</a>.</p>' +
      '<div class="ed-final"><div><strong>' + esc(ev.title) + '</strong><span>' + esc(dataLunga + ' · ' + ev.venue + ', ' + ev.city) + (ev.bookable ? ' · ' + esc(ev.price) : '') + '</span></div>' +
      (ev.bookable ? butonBilet() : '<a class="s-btn" href="/calendar">Vezi alte ediții</a>') + '</div>');

    root.innerHTML = hero + s5 + s6 + s7 + s8 + s9 + blocOrganizare();

    // Video pe desktop: pornește fără sunet, în buclă, cu buton de sunet. Pe telefon rămâne miniatura.
    var loc = document.getElementById('ed-vid-desk');
    if (loc && window.matchMedia('(min-width:900px)').matches) {
      loc.innerHTML = '<video id="edVid" src="' + esc(ev.video) + '" poster="' + esc(ev.poster) + '" muted loop playsinline autoplay preload="metadata" aria-label="Video ' + esc(ev.title) + '"></video>' +
        '<button type="button" class="ed-sunet" data-vid="edVid" onclick="suspectiSunet(this)" aria-label="Pornește sunetul">🔈 Pornește sunetul</button>';
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { var vd = document.getElementById('edVid'); vd.removeAttribute('autoplay'); vd.controls = true; }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', construieste);
  else construieste();
})();

// Butonul de sunet (același comportament ca în video.js, inclus aici ca pagina să nu depindă de alt fișier).
if (!window.suspectiSunet) {
  window.suspectiSunet = function (btn) {
    var v = document.getElementById(btn.getAttribute('data-vid'));
    if (!v) return;
    var on = v.muted;
    v.muted = !on;
    if (on) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    var text = on ? 'Oprește sunetul' : 'Pornește sunetul';
    btn.textContent = (on ? '🔊 ' : '🔈 ') + text;
    btn.setAttribute('aria-label', text);
  };
}
