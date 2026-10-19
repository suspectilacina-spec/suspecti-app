/* Bara de acțiune fixă de sus: imediat sub antet, rămâne vizibilă la derulare (inclusiv pe mobil).
   Fiecare pagină are acțiunea ei principală. Pe paginile conceptelor, butonul duce direct la AmBilet
   (pe pagina unei ediții) sau deschide alegerea ediției (data, orașul, varianta). Datele vin din /events.js. */

(function () {
  var cale = location.pathname.toLowerCase().replace(/\.html$/, '').replace(/\/+$/, '');
  var segmente = cale.split('/').filter(Boolean);
  var pagina = segmente[0] || 'acasa';
  var EVENTS = window.SUSPECTI_EVENTS || [];
  var editie = null;
  EVENTS.forEach(function (e) { if (e.page === cale) editie = e; });

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function varianta(ev) { return ev.theme === '#family' ? 'family' : 'adults'; }
  var NUME_VARIANTA = { adults: 'Adults Edition', family: 'Family Edition' };

  // Ce face butonul pe fiecare pagină.
  var CONCEPT = { cina: { key: 'Cină', nume: 'Suspecți la Cină', anunta: '#preinscriere' },
                  brunch: { key: 'Brunch', nume: 'The Singing Brunch', anunta: '#inscriere' },
                  party: { key: 'Party', nume: 'Suspecți la Party', anunta: '#inscriere' },
                  treasurehunt: { key: 'Treasure Hunt', nume: 'Suspecți în Treasure Hunt', anunta: '#inscriere' } };
  var SIMPLU = {
    acasa: ['Experiențe în București și Timișoara', 'Calendar & bilete', '/calendar'],
    despre: ['SUSPECȚI', 'Calendar & bilete', '/calendar'],
    intrebari: ['SUSPECȚI', 'Calendar & bilete', '/calendar'],
    termeni: ['SUSPECȚI', 'Calendar & bilete', '/calendar'],
    confidentialitate: ['SUSPECȚI', 'Calendar & bilete', '/calendar'],
    primavedere: ['Suspecți la Prima Vedere', 'Anunță-mă', '#inscriere'],
    automachiaj: ['Suspecți la Automachiaj', 'Anunță-mă', '#inscriere'],
    povesti: ['Suspecți la Povești', 'Anunță-mă', '#inscriere'],
    corporate: ['Pentru companii', 'Cere o ofertă', '#contact'],
    private: ['Evenimente private', 'Cere o ofertă', '#oferta']
  };
  var concept = CONCEPT[pagina];
  if (!concept && !SIMPLU[pagina]) return;

  var BTN = 'display:inline-flex; align-items:center; justify-content:center; gap:8px; min-height:46px; padding:0 22px; border-radius:999px; border:0; background:#A3172F; color:#FFFFFF; text-decoration:none; font:inherit; font-size:16px; font-weight:700; white-space:nowrap; cursor:pointer; box-shadow:0 10px 24px -12px rgba(163,23,47,0.8);';

  function construieste() {
    var header = document.querySelector('header');
    if (!header) return;

    var eticheta, buton;
    if (concept && editie && pagina !== 'party') {
      eticheta = '<strong>' + esc(editie.title.split(' · ')[0]) + '</strong> · ' + esc(editie.day + ' ' + editie.month.toLowerCase() + ' · ' + editie.city) + ' · ' + esc(editie.price);
      buton = '<a href="' + esc(editie.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(editie.title) + '" style="' + BTN + '">Cumpără bilet</a>';
    } else if (concept) {
      eticheta = '<strong>' + esc(concept.nume) + '</strong>';
      var text = pagina === 'party' ? 'Vezi evenimentele următoare' : 'Cumpără bilet';
      buton = '<button type="button" data-alege="" style="' + BTN + '">' + text + '</button>';
    } else {
      var s = SIMPLU[pagina];
      eticheta = '<strong>' + esc(s[0]) + '</strong>';
      buton = '<a href="' + s[2] + '" style="' + BTN + '">' + esc(s[1]) + '</a>';
    }

    var bara = document.createElement('div');
    bara.id = 'actiune-bara';
    bara.setAttribute('role', 'region');
    bara.setAttribute('aria-label', 'Acțiune principală');
    bara.style.cssText = 'position:relative; z-index:29; background:#FAF6F3; border-bottom:1px solid rgba(36,21,24,0.12); box-shadow:0 8px 22px -18px rgba(36,21,24,0.6);';
    bara.innerHTML = '<div style="max-width:1180px; margin:0 auto; padding:9px 20px; display:flex; align-items:center; justify-content:space-between; gap:14px;">' +
      '<span style="min-width:0; font-size:15px; color:#241518; line-height:1.3; overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">' + eticheta + '</span>' + buton + '</div>';
    var loc = document.createElement('div');
    header.parentNode.insertBefore(loc, header.nextSibling);
    header.parentNode.insertBefore(bara, loc);

    // Rămâne fixă sus după ce antetul iese din ecran (în design, „sticky” nu funcționează din cauza containerului).
    function fixeaza() {
      var jos = header.getBoundingClientRect().bottom;
      if (jos <= 0 && bara.style.position !== 'fixed') {
        loc.style.height = bara.offsetHeight + 'px';
        bara.style.position = 'fixed'; bara.style.top = '0'; bara.style.left = '0'; bara.style.right = '0'; bara.style.zIndex = '45';
      } else if (jos > 0 && bara.style.position === 'fixed') {
        bara.style.position = 'relative'; bara.style.zIndex = '29'; loc.style.height = '0';
      }
    }
    window.addEventListener('scroll', fixeaza, { passive: true });
    window.addEventListener('resize', fixeaza);
    fixeaza();
    // Linkurile interne (#secțiune) nu ajung sub bară.
    document.documentElement.style.scrollPaddingTop = (bara.offsetHeight + 12) + 'px';

    document.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-alege]') : null;
      if (!b) return;
      e.preventDefault();
      deschideAlegerea(b.getAttribute('data-alege') || null);
    });
  }

  /* ---------- Alegerea ediției ---------- */
  var stare = { varianta: null, oras: null };

  function cardEditie(ev) {
    return '<article style="border:1px solid rgba(36,21,24,0.12); border-radius:16px; padding:14px 16px; display:flex; flex-direction:column; gap:6px; background:#FFFFFF;">' +
      '<span style="font-size:12px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#A3172F;">' + esc(ev.format) + ' · ' + esc(ev.city) + '</span>' +
      '<h3 style="margin:0; font-family:\'Playfair Display\',Georgia,serif; font-weight:500; font-size:21px; color:#241518;">' + esc(ev.title) + '</h3>' +
      '<span style="color:#241518; font-size:15px;"><strong>' + esc(ev.date) + ' · ' + esc(ev.time) + '</strong><br>' + esc(ev.venue) + ', ' + esc(ev.city) + '</span>' +
      '<span style="font-size:15px; color:#241518;"><strong>' + esc(ev.price) + '</strong></span>' +
      '<div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:4px;">' +
      '<a href="' + esc(ev.page) + '" style="display:inline-flex; align-items:center; min-height:44px; padding:0 16px; border-radius:999px; border:1px solid rgba(36,21,24,0.25); color:#241518; text-decoration:none; font-weight:600; font-size:15px;">Detalii</a>' +
      '<a href="' + esc(ev.link) + '" target="_blank" rel="noopener noreferrer" data-editie="' + esc(ev.title) + '" style="' + BTN + ' min-height:44px; font-size:15px;">Cumpără bilet</a>' +
      '</div><span style="font-size:12px; color:#5A4649;">Biletele se cumpără prin AmBilet</span></article>';
  }

  function optiune(text, activ, atribut) {
    return '<button type="button" ' + atribut + ' aria-pressed="' + (activ ? 'true' : 'false') + '" style="min-height:46px; padding:0 18px; border-radius:999px; font:inherit; font-size:15px; font-weight:600; cursor:pointer; ' +
      (activ ? 'background:#A3172F; color:#FFFFFF; border:1px solid #A3172F;' : 'background:#FFFFFF; color:#241518; border:1px solid rgba(36,21,24,0.25);') + '">' + text + '</button>';
  }

  function continut() {
    var html = '', lista;
    if (concept.key === 'Treasure Hunt') {
      html += '<p style="margin:0 0 8px; font-weight:700;">1. Alege varianta</p><div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">' +
        optiune('Adults Edition', stare.varianta === 'adults', 'data-var="adults"') + optiune('Family Edition', stare.varianta === 'family', 'data-var="family"') + '</div>';
      if (!stare.varianta) return html;
      html += '<p style="margin:0 0 8px; font-weight:700;">2. Alege orașul</p><div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:16px;">' +
        optiune('București', stare.oras === 'București', 'data-oras="București"') + optiune('Timișoara', stare.oras === 'Timișoara', 'data-oras="Timișoara"') + '</div>';
      if (!stare.oras) return html;
      lista = EVENTS.filter(function (e) { return e.key === 'Treasure Hunt' && varianta(e) === stare.varianta && e.city === stare.oras; });
      if (!lista.length) {
        return html + '<div style="padding:16px; border-radius:16px; background:#F3DCD8;"><p style="margin:0 0 10px;">Nu avem încă o ediție <strong>' + NUME_VARIANTA[stare.varianta] + '</strong> programată în <strong>' + esc(stare.oras) + '</strong>. Lasă-ne datele și te anunțăm primii.</p>' +
          '<button type="button" data-anunta="" style="' + BTN + '">Anunță-mă</button></div>';
      }
      html += '<p style="margin:0 0 8px; font-weight:700;">3. Alege ediția</p>';
    } else {
      lista = EVENTS.filter(function (e) { return e.key === concept.key; });
      if (!lista.length) {
        return '<p style="margin:0 0 12px;">Nu avem încă o ediție programată. Lasă-ne datele și te anunțăm primii.</p><button type="button" data-anunta="" style="' + BTN + '">Anunță-mă</button>';
      }
    }
    return html + '<div style="display:flex; flex-direction:column; gap:10px;">' + lista.map(cardEditie).join('') + '</div>';
  }

  var fereastra = null;
  function deschideAlegerea(v) {
    stare.varianta = v || null; stare.oras = null;
    if (!fereastra) {
      fereastra = document.createElement('div');
      fereastra.id = 'alege-editia';
      fereastra.setAttribute('role', 'dialog');
      fereastra.setAttribute('aria-modal', 'true');
      fereastra.setAttribute('aria-label', 'Alege ediția');
      fereastra.style.cssText = 'position:fixed; inset:0; z-index:90; background:rgba(26,6,11,0.6); display:flex; align-items:flex-end; justify-content:center; font-family:Manrope,system-ui,sans-serif;';
      fereastra.addEventListener('click', function (e) {
        if (e.target === fereastra || e.target.closest('[data-inchide]')) return inchide();
        var t = e.target.closest('button');
        if (!t) return;
        if (t.hasAttribute('data-var')) { stare.varianta = t.getAttribute('data-var'); stare.oras = null; deseneaza(); }
        else if (t.hasAttribute('data-oras')) { stare.oras = t.getAttribute('data-oras'); deseneaza(); }
        else if (t.hasAttribute('data-anunta')) { anunta(); }
      });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && fereastra.style.display !== 'none') inchide(); });
      document.body.appendChild(fereastra);
    }
    fereastra.style.display = 'flex';
    deseneaza();
  }
  function deseneaza() {
    var titlu = concept.key === 'Party' ? 'Evenimentele următoare' : 'Alege ediția';
    fereastra.innerHTML = '<div style="background:#FAF6F3; color:#241518; width:100%; max-width:560px; max-height:88vh; overflow-y:auto; border-radius:22px 22px 0 0; padding:20px 20px 26px; box-shadow:0 -20px 50px -20px rgba(0,0,0,0.5);">' +
      '<div style="display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:14px;"><div><span style="font-size:12px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#A3172F;">' + esc(concept.nume) + '</span>' +
      '<h2 style="margin:4px 0 0; font-family:\'Playfair Display\',Georgia,serif; font-weight:500; font-size:26px;">' + titlu + '</h2></div>' +
      '<button type="button" data-inchide="" aria-label="Închide" style="width:44px; height:44px; border-radius:999px; border:1px solid rgba(36,21,24,0.25); background:#FFFFFF; font-size:20px; cursor:pointer;">✕</button></div>' +
      continut() + '</div>';
    if (window.matchMedia('(min-width:700px)').matches) { fereastra.style.alignItems = 'center'; fereastra.firstChild.style.borderRadius = '22px'; }
  }
  function inchide() { if (fereastra) fereastra.style.display = 'none'; }

  // „Anunță-mă”: închide fereastra și duce la formularul de preînscriere, cu varianta și orașul alese.
  function anunta() {
    inchide();
    if (concept.key === 'Treasure Hunt' && stare.varianta) {
      var b = document.querySelector('.th-edition-btn[data-edition="' + NUME_VARIANTA[stare.varianta] + '"]');
      if (b && window.suspectiPickEdition) window.suspectiPickEdition(b);
      var o = document.getElementById('thOras');
      if (o && stare.oras) o.value = stare.oras;
    }
    var tinta = document.querySelector(concept.anunta);
    if (tinta) tinta.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.suspectiAlege = deschideAlegerea;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', construieste);
  else construieste();
})();
