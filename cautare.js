/* Căutarea de pe site: butonul cu lupă din bara de sus deschide un câmp de căutare.
   Caută în pagini, tematici, evenimentele din calendar (sincronizate din AmBilet) și întrebările frecvente.
   Funcționează fără diacritice („cina” găsește „Cină”). Totul rulează în browser, nu trimite nimic nicăieri. */

(function () {
  if (window.suspectiCautare) return;
  window.suspectiCautare = true;

  // [titlu, adresă, descriere scurtă, cuvinte-cheie suplimentare]
  var PAGINI = [
    ['Revelion 2027 · Scandalous Edition', '/revelion/scandalous-2027', 'Mystery dinner, meniu festiv, băuturi incluse și petrecere · 31 decembrie', 'revelion anul nou new year 31 decembrie scandalous petrecere meniu bauturi naive'],
    ['Calendar & bilete', '/calendar', 'Toate evenimentele următoare și biletele', 'evenimente bilete date program cumpara bucuresti timisoara'],
    ['Suspecți la Cină', '/cina', 'Mystery dinner cu personaje', 'mystery dinner cina crima personaj rol detectiv murder'],
    ['Balul lui Gatsby', '/cina#gatsby', 'Tematică Suspecți la Cină · anii ’20', 'gatsby anii 20 charleston elegant'],
    ['Peaky Blinders', '/cina#peaky', 'Tematică Suspecți la Cină · Birmingham, anii ’20', 'peaky blinders shelby'],
    ['’80s Disco · Ultimul Dans', '/cina#disco', 'Tematică Suspecți la Cină · Mirador Rooftop', 'disco 80 ultimul dans mirador'],
    ['Suspecți la Party', '/party', 'Petreceri tematice cu roluri și misiuni', 'party petrecere halloween addams tematic'],
    ['Suspecți în Treasure Hunt', '/treasurehunt', 'Vânătoare de comori prin oraș, pentru adulți și familii', 'treasure hunt comori oras echipe copii family adults'],
    ['The Singing Brunch', '/brunch', 'Brunch cu DJ, MC și karaoke de grup', 'brunch karaoke cantat singing'],
    ['Suspecți la Prima Vedere', '/primavedere', 'Seri pentru singles', 'singles prima vedere dating intalnire'],
    ['Suspecți la Automachiaj', '/automachiaj', 'Atelier de automachiaj', 'automachiaj machiaj atelier'],
    ['Suspecți la Povești', '/povesti', 'With a touch of Tarot', 'povesti tarot'],
    ['Pentru companii', '/corporate', 'Team building, petreceri de Crăciun și evenimente corporate', 'companii corporate team building craciun firma oferta angajati'],
    ['Evenimente private', '/private', 'Aniversări, petreceri private și grupuri', 'privat aniversare zi de nastere petrecere privata grup burlaci'],
    ['Despre noi', '/despre', 'Povestea SUSPECȚI', 'despre echipa alexandra fondatoare poveste'],
    ['Colaboratori', '/colaboratori', 'Parteneri și locații', 'colaboratori parteneri locatii'],
    ['Întrebări frecvente', '/intrebari', 'Răspunsuri despre bilete, roluri și participare', 'intrebari faq ajutor bilet rambursare singur'],
    ['Termeni de participare', '/termeni', 'Condiții, rambursări, transferul biletului', 'termeni conditii rambursare anulare'],
    ['Confidențialitate și cookie-uri', '/confidentialitate', 'Datele tale și preferințele pentru cookie-uri', 'confidentialitate gdpr cookie date personale']
  ];

  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'`]/g, ''); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  var LUPA = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-3.5-3.5"></path></svg>';

  function stiluri() {
    if (document.getElementById('sc-css')) return;
    var s = document.createElement('style');
    s.id = 'sc-css';
    s.textContent =
      '.cauta-btn{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:999px;border:1px solid rgba(235,193,190,0.35);background:transparent;color:#FBF3F1;cursor:pointer;padding:0;flex:0 0 auto;}' +
      '.cauta-btn:hover{border-color:#EBC1BE;}' +
      '.cauta-ov{position:fixed;inset:0;z-index:2000;background:rgba(20,5,9,0.72);display:flex;justify-content:center;align-items:flex-start;padding:70px 16px 16px;}' +
      '.cauta-box{width:100%;max-width:640px;background:#FAF6F3;border-radius:20px;box-shadow:0 30px 70px -20px rgba(0,0,0,0.7);overflow:hidden;font-family:Manrope,system-ui,sans-serif;}' +
      '.cauta-sus{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(36,21,24,0.12);color:#A3172F;}' +
      '.cauta-sus input{flex:1;min-width:0;border:0;background:transparent;font:inherit;font-size:19px;color:#241518;outline:none;padding:8px 0;}' +
      '.cauta-sus button{border:0;background:#EFE5E1;color:#241518;border-radius:999px;min-height:40px;padding:0 14px;font:inherit;font-weight:700;cursor:pointer;}' +
      '.cauta-rez{max-height:min(60vh,520px);overflow-y:auto;margin:0;padding:8px;list-style:none;}' +
      '.cauta-rez a{display:block;padding:12px 14px;border-radius:12px;text-decoration:none;color:#241518;}' +
      '.cauta-rez a:hover,.cauta-rez a:focus{background:#FFFFFF;outline:none;box-shadow:0 0 0 2px #EBC1BE inset;}' +
      '.cauta-rez strong{display:block;font-family:"Playfair Display",Georgia,serif;font-size:19px;font-weight:700;}' +
      '.cauta-rez span{display:block;font-size:14px;color:#5A4649;margin-top:2px;}' +
      '.cauta-rez em{font-style:normal;font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:#A3172F;}' +
      '.cauta-gol{padding:18px 16px;color:#5A4649;font-size:15px;}' +
      '@media (max-width:519px){.cauta-ov{padding:16px 10px;}.cauta-sus input{font-size:20px;}.cauta-rez strong{font-size:20px;}.cauta-rez span{font-size:16px;}}';
    document.head.appendChild(s);
  }

  // Evenimentele: dacă pagina nu le are deja, le încărcăm o singură dată (sincronizarea AmBilet + ajustările editoriale).
  var evIncarcare = null;
  function incarcaScript(src) { return new Promise(function (ok) { var s = document.createElement('script'); s.src = src; s.onload = s.onerror = function () { ok(); }; document.head.appendChild(s); }); }
  function evenimente() {
    if (window.SUSPECTI_EVENTS && window.SUSPECTI_EVENTS.length) return Promise.resolve(window.SUSPECTI_EVENTS);
    if (!evIncarcare) {
      evIncarcare = incarcaScript('https://bilete.suspectilacina.com/sync/events.js')
        .then(function () { return window.SUSPECTI_EDITORIAL ? null : incarcaScript('/evenimente-editorial.js'); })
        .then(function () { return incarcaScript('/events.js'); })
        .then(function () { return window.SUSPECTI_EVENTS || []; });
    }
    return evIncarcare;
  }

  function rezultate(q, evs) {
    var t = norm(q).split(/\s+/).filter(Boolean);
    if (!t.length) return [];
    function potriveste(text) { var n = norm(text); return t.every(function (x) { return n.indexOf(x) >= 0; }); }
    var r = [];
    (evs || []).forEach(function (e) {
      var text = [e.concept, e.title, e.tip, e.city, e.venue, e.date, e.format].join(' ');
      if (potriveste(text)) r.push({ t: e.title, u: e.page, d: e.date + (e.time ? ' · ' + e.time : '') + ' · ' + e.venue + ', ' + e.city + (e.bookable ? ' · ' + e.price : ''), k: 'Eveniment · ' + (e.concept || '') });
    });
    PAGINI.forEach(function (p) { if (potriveste(p.join(' '))) r.push({ t: p[0], u: p[1], d: p[2], k: 'Pagină' }); });
    (window.SUSPECTI_FAQ_COMUN || []).forEach(function (f) {
      var raspuns = String(f[1]).replace(/<[^>]+>/g, '');
      if (potriveste(f[0] + ' ' + raspuns)) r.push({ t: f[0], u: '/intrebari', d: raspuns.slice(0, 120) + (raspuns.length > 120 ? '…' : ''), k: 'Întrebare frecventă' });
    });
    return r.slice(0, 20);
  }

  var ov = null, ultimul = null;
  function deschide() {
    stiluri();
    ultimul = document.activeElement;
    ov = document.createElement('div');
    ov.className = 'cauta-ov';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'Caută pe site');
    ov.innerHTML = '<div class="cauta-box"><div class="cauta-sus">' + LUPA +
      '<input type="search" placeholder="Caută: revelion, Gatsby, team building…" aria-label="Caută pe site" autocomplete="off" enterkeyhint="search">' +
      '<button type="button" data-inchide>Închide</button></div>' +
      '<ul class="cauta-rez" aria-live="polite"></ul></div>';
    document.body.appendChild(ov);
    var input = ov.querySelector('input'), lista = ov.querySelector('.cauta-rez');
    function arata() {
      var q = input.value.trim();
      if (!q) { lista.innerHTML = '<li class="cauta-gol">Scrie ce cauți: o experiență, un oraș, o tematică sau o întrebare.</li>'; return; }
      evenimente().then(function (evs) {
        if (input.value.trim() !== q) return;
        var r = rezultate(q, evs);
        lista.innerHTML = r.length ? r.map(function (x) { return '<li><a href="' + esc(x.u) + '"><em>' + esc(x.k) + '</em><strong>' + esc(x.t) + '</strong><span>' + esc(x.d) + '</span></a></li>'; }).join('')
          : '<li class="cauta-gol">Nu am găsit nimic pentru „' + esc(q) + '”. Încearcă alt cuvânt sau vezi <a href="/calendar">calendarul</a>.</li>';
      });
    }
    input.addEventListener('input', arata);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var a = lista.querySelector('a'); if (a) location.href = a.getAttribute('href'); } });
    ov.addEventListener('click', function (e) { if (e.target === ov || e.target.hasAttribute('data-inchide')) inchide(); else if (e.target.closest('a')) inchide(true); });
    arata();
    evenimente();
    setTimeout(function () { input.focus(); }, 30);
  }
  function inchide(faraFocus) {
    if (!ov) return;
    ov.remove(); ov = null;
    if (!faraFocus && ultimul && ultimul.focus) ultimul.focus();
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') inchide(); });

  function butonul() {
    stiluri();
    var header = document.querySelector('header');
    if (!header || header.querySelector('.cauta-btn')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'cauta-btn';
    b.setAttribute('aria-label', 'Caută pe site');
    b.innerHTML = LUPA;
    b.addEventListener('click', deschide);
    var meniu = header.querySelector('.snav-menu');
    var dreapta = meniu ? meniu.parentNode : header.querySelector('div > div:last-child');
    if (meniu) dreapta.insertBefore(b, meniu); else if (dreapta) dreapta.appendChild(b);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', butonul); else butonul();
})();
