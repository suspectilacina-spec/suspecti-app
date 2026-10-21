/* Tematicile de pe /cina și /party: întâi tematica cu ediție în curs (cu data, prețul și „Cumpără bilet”),
   apoi celelalte tematici, la care lângă „Vezi evenimentele următoare” apare „Anunță-mă când revine”
   (duce la formularul de preînscriere și bifează tematica). Edițiile vin din events.js (câmpul theme). */

(function () {
  var pagina = location.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/+$/, '').split('/')[1] || '';
  var CFG = {
    cina: { key: 'Cină', form: '#preinscriere' },
    party: { key: 'Party', form: '#inscriere' }
  }[pagina];
  if (!CFG) return;

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function alegeTematica(id) {
    if (pagina === 'cina') {
      var chip = document.querySelector('.cina-theme-chip[data-key="' + (id === 'dance-floor' ? 'dance' : id) + '"]');
      if (chip && chip.getAttribute('aria-pressed') !== 'true' && window.cinaToggleChip) window.cinaToggleChip(chip);
    } else {
      var s = document.getElementById('ptTema');
      if (s) s.value = id;
    }
  }

  function construieste() {
    var tem = document.getElementById('tematici');
    if (!tem) return;
    var nav = tem.querySelector('nav');
    var ids = nav ? [].map.call(nav.querySelectorAll('a[href^="#"]'), function (a) { return a.getAttribute('href').slice(1); }) : [];
    var sectiuni = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var editii = (window.SUSPECTI_EVENTS || []).filter(function (e) { return e.key === CFG.key && e.bookable && e.theme; });
    function editiaPentru(s) { return editii.filter(function (e) { return e.theme === '#' + s.id; })[0]; }
    var cuEditie = sectiuni.filter(function (s) { return editiaPentru(s); });
    var fara = sectiuni.filter(function (s) { return cuEditie.indexOf(s) < 0; });

    // Ordinea: tematicile cu ediție în curs, apoi celelalte (și în lista de tematici de sus).
    var dupa = tem;
    cuEditie.concat(fara).forEach(function (s) { dupa.parentNode.insertBefore(s, dupa.nextSibling); dupa = s; });
    if (nav) cuEditie.concat(fara).forEach(function (s) { var a = nav.querySelector('a[href="#' + s.id + '"]'); if (a) nav.appendChild(a); });
    if (cuEditie.length && fara.length) {
      var sep = document.createElement('section');
      sep.className = 'teme-sep';
      sep.innerHTML = '<div class="s-wrap"><span class="s-kick">Alte tematici</span><h2 class="s-h2">Încă nu au o dată</h2>' +
        '<p class="s-lead">Alege tematica preferată și apasă „Anunță-mă când revine”. Îți scriem primii când o programăm.</p></div>';
      fara[0].parentNode.insertBefore(sep, fara[0]);
    }

    // Tematica cu ediție: data, locul, prețul și butoanele de bilet.
    cuEditie.forEach(function (s) {
      var ev = editiaPentru(s);
      var vechi = [].filter.call(s.querySelectorAll('a.btn'), function (a) { return /Vezi evenimentele|Cumpără/i.test(a.textContent); });
      var loc = vechi.length ? vechi[0].parentNode : null;
      vechi.forEach(function (a) { a.remove(); });
      if (!loc) return;
      [].forEach.call(loc.querySelectorAll('*'), function (el) { if (el.children.length === 0 && el.textContent.indexOf(ev.venue) >= 0 && /\d{4} · \d{2}:\d{2}/.test(el.textContent)) el.remove(); });
      var bloc = document.createElement('div');
      bloc.className = 'tema-editie';
      bloc.innerHTML = '<span class="tema-editie-et">Ediția în curs</span>' +
        '<strong>' + esc(ev.date + ' · ' + ev.time) + '</strong>' +
        '<span>' + esc(ev.venue + ', ' + ev.city) + ' · ' + esc(ev.price) + (ev.priceNote ? ' <small>(' + esc(ev.priceNote) + ')</small>' : '') + '</span>' +
        '<div class="tema-editie-btn"><a class="btn s-btn" href="' + esc(ev.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(ev.title) + '">Cumpără bilet</a>' +
        '<a class="btn s-btn-2" href="' + esc(ev.page) + '">Detalii ediție</a></div>' +
        (ev.video && ev.poster && window.SuspectiUI ? '<div class="v-strip">' + SuspectiUI.videoThumb(ev.video, ev.poster, 'Vezi videoul', ev.title) + '</div>' : '');
      loc.appendChild(bloc);
    });

    // Tematicile fără ediție: „Anunță-mă când revine” lângă „Vezi evenimentele următoare”.
    fara.forEach(function (s) {
      var b = [].filter.call(s.querySelectorAll('a.btn'), function (a) { return /Vezi evenimentele/i.test(a.textContent); })[0];
      if (!b) return;
      var rand = document.createElement('div');
      rand.className = 'tema-actiuni';
      b.parentNode.insertBefore(rand, b);
      rand.appendChild(b);
      var n = document.createElement('a');
      n.href = CFG.form;
      n.className = 'btn tema-anunta';
      n.setAttribute('data-tema', s.id);
      n.textContent = 'Anunță-mă când revine';
      rand.appendChild(n);
    });

    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('.tema-anunta') : null;
      if (a) alegeTematica(a.getAttribute('data-tema'));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', construieste);
  else construieste();
})();
