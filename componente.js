/* Componente comune SUSPECȚI: lista de evenimente (prima pagină, calendar, pagina ediției),
   miniatura video cu fereastră de redare. Stilurile sunt în componente.css, datele vin din events.js. */

window.SuspectiUI = (function () {
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  // Imaginile din /images/<hash>.<ext> au variante optimizate în /images/v2: g- (galerie, 960px) și t- (miniatură, 480px).
  function img(src, marime) {
    var m = String(src || '').match(/^\/?images\/([0-9a-f]{32})\.(jpg|jpeg|png|webp)$/i);
    return m ? '/images/v2/' + (marime || 'g') + '-' + m[1] + '.webp' : src;
  }

  // Prețul afișat: prețul curent + termenul prețului redus (dacă există).
  function pret(ev) {
    if (!ev.bookable) return '<span class="ev-stare">' + (ev.status === 'anulat' ? 'Anulat' : 'Bilete epuizate') + '</span>';
    return '<span class="ev-pret">' + esc(ev.price) + (ev.priceNote ? '<small>' + esc(ev.priceNote) + '</small>' : '') + '</span>';
  }

  var SCURT = { 'Cină': 'Suspecți la Cină', 'Party': 'Suspecți la Party', 'Brunch': 'Singing Brunch', 'Treasure Hunt': 'Treasure Hunt' };

  // Un rând din lista de evenimente: poză, tipul experienței, nume, dată, oră, durată, locație, preț, link spre ediție.
  function rand(ev) {
    var meta = [ev.dataScurta, ev.time, ev.durata].filter(Boolean).join(' · ');
    return '<li class="ev-row" data-city="' + esc(ev.city) + '" data-filtru="' + esc(ev.filtru) + '">' +
      '<a class="ev-thumb" href="' + esc(ev.page) + '" tabindex="-1" aria-hidden="true"><img src="' + esc(img(ev.img, 't')) + '" alt="" loading="lazy" width="480" height="360" style="object-position:' + esc(ev.pos || 'center 30%') + ';"></a>' +
      '<div class="ev-info">' +
      '<span class="ev-kick">' + esc(SCURT[ev.key] || ev.concept) + ' · ' + esc(ev.city) + '</span>' +
      '<h3 class="ev-title"><a href="' + esc(ev.page) + '">' + esc(ev.title) + '</a></h3>' +
      (ev.tip ? '<span class="ev-tip">' + esc(ev.tip) + '</span>' : '') +
      '<span class="ev-meta">' + esc(meta) + '</span>' +
      '<span class="ev-loc">' + esc(ev.venue) + ', ' + esc(ev.city) + '</span>' +
      (ev.statusNote ? '<span class="ev-stare" style="color:#A3172F;">' + esc(ev.statusNote) + '</span>' : '') +
      '</div>' +
      '<div class="ev-side">' + pret(ev) + '<a class="ev-btn" href="' + esc(ev.page) + '">Detalii și bilete</a></div>' +
      '</li>';
  }

  // Lista completă; cu lunile ca separatoare dacă luni = true.
  function lista(evenimente, luni) {
    if (!luni) return '<ul class="ev-list">' + evenimente.map(rand).join('') + '</ul>';
    var html = '', curent = '';
    evenimente.forEach(function (ev) {
      var l = (window.SUSPECTI_MONTH_LABELS || [])[ev.m] || '';
      if (l !== curent) {
        if (curent) html += '</ul>';
        html += '<h2 class="ev-luna">' + esc(l) + '</h2><ul class="ev-list">';
        curent = l;
      }
      html += rand(ev);
    });
    return html + (curent ? '</ul>' : '');
  }

  // Miniatura video: imagine + buton de redare. La click se deschide videoul cu sunet, în fereastră.
  function videoThumb(src, poster, eticheta, sub) {
    return '<button type="button" class="v-thumb" data-video="' + esc(src) + '" aria-label="Pornește videoul: ' + esc(eticheta || 'video') + '">' +
      '<img src="' + esc(poster) + '" alt="" loading="lazy" width="540" height="960">' +
      '<span class="v-play" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>' +
      '<span class="v-lbl">' + esc(eticheta || 'Vezi videoul') + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</span></button>';
  }

  var modal = null, ultimul = null;
  function deschideVideo(src) {
    ultimul = document.activeElement;
    modal = document.createElement('div');
    modal.className = 'v-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Video');
    modal.innerHTML = '<video src="' + esc(src) + '" controls autoplay playsinline></video><button type="button" aria-label="Închide videoul">✕</button>';
    modal.addEventListener('click', function (e) { if (e.target === modal || e.target.tagName === 'BUTTON') inchideVideo(); });
    document.body.appendChild(modal);
    modal.querySelector('button').focus();
  }
  function inchideVideo() {
    if (!modal) return;
    var v = modal.querySelector('video'); if (v) v.pause();
    modal.remove(); modal = null;
    if (ultimul && ultimul.focus) ultimul.focus();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-video]') : null;
    if (!b) return;
    e.preventDefault();
    deschideVideo(b.getAttribute('data-video'));
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') inchideVideo(); });

  return { esc: esc, img: img, pret: pret, rand: rand, lista: lista, videoThumb: videoThumb, deschideVideo: deschideVideo };
})();
