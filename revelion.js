/* Revelion 2027 pe tot site-ul:
   1. banda roșie de deasupra meniului (pe toate paginile);
   2. pop-up-ul „Nu ai planuri de Revelion? Hai cu noi!” pe prima pagină. Apare după alegerea pentru cookie-uri,
      iar „Nu mă interesează” îl ascunde pentru 7 zile. Pe pagina Revelionului nu apare.
   După 31 decembrie 2026 dispar singure. */

(function () {
  var PAGINA = '/revelion/scandalous-2027';
  var BILET = 'https://bilete.suspectilacina.com/suspecti-la-revelion-2027-scandalous-edition-5197';
  var SFARSIT = new Date('2027-01-01T00:00:00+02:00');
  if (new Date() >= SFARSIT) return;
  var cale = location.pathname.replace(/\/+$/, '') || '/';

  function citeste(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function scrie(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  function stiluri() {
    var s = document.createElement('style');
    s.textContent =
      '.rv-banda{display:block;background:linear-gradient(90deg,#7A0F22 0%,#A3172F 50%,#7A0F22 100%);color:#FFFFFF;text-decoration:none;font-family:Manrope,system-ui,sans-serif;position:relative;z-index:31;}' +
      '.rv-banda-in{max-width:1180px;margin:0 auto;padding:9px 20px;display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;text-align:center;}' +
      '.rv-banda-t{font-size:15px;font-weight:600;letter-spacing:0.01em;}' +
      '.rv-banda-t b{font-family:"Playfair Display",Georgia,serif;font-size:18px;font-weight:700;letter-spacing:0.02em;margin-right:6px;}' +
      '.rv-banda-t b::before{content:"✦ ";color:#F5C9CF;font-size:14px;}' +
      '.rv-banda-btn{display:inline-flex;align-items:center;min-height:36px;padding:0 16px;border-radius:999px;background:#FFFFFF;color:#A3172F !important;font-size:14px;font-weight:800;text-decoration:none;white-space:nowrap;}' +
      '.rv-banda-btn:hover{background:#FBF3F1;}' +
      '@media (max-width:519px){.rv-banda-in{padding:10px 14px;gap:10px;}.rv-banda-t{font-size:16px;}.rv-banda-t b{display:block;font-size:20px;margin:0;}.rv-banda-t span{display:block;}.rv-banda-btn{min-height:40px;font-size:16px;}}' +
      '.rv-pop{position:fixed;inset:0;z-index:1500;background:rgba(14,4,7,0.72);display:flex;align-items:center;justify-content:center;padding:16px;animation:rvf .25s ease-out;}' +
      '.rv-pop-box{position:relative;width:100%;max-width:460px;background:#0E0E0E;color:#FBF3F1;border-radius:22px;overflow:hidden;border:1px solid rgba(235,193,190,0.25);box-shadow:0 40px 80px -24px rgba(0,0,0,0.85);font-family:Manrope,system-ui,sans-serif;}' +
      '.rv-pop-box img{display:block;width:100%;height:auto;aspect-ratio:800/420;object-fit:cover;}' +
      '.rv-pop-in{padding:22px 24px 24px;text-align:center;}' +
      '.rv-pop-h{margin:0 0 8px;font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:32px;line-height:1.1;color:#FFFFFF;}' +
      '.rv-pop-h span{display:block;color:#E0314F;font-style:italic;}' +
      '.rv-pop-p{margin:0 0 18px;font-size:16px;line-height:1.55;color:#E9DCD6;}' +
      '.rv-pop-p strong{color:#FFFFFF;}' +
      '.rv-pop-b{display:grid;gap:10px;}' +
      '.rv-pop-b a{display:flex;align-items:center;justify-content:center;min-height:52px;border-radius:999px;background:#A3172F;color:#FFFFFF !important;text-decoration:none;font-size:17px;font-weight:800;}' +
      '.rv-pop-b button{min-height:48px;border-radius:999px;border:1px solid rgba(251,243,241,0.4);background:transparent;color:#E9DCD6;font:inherit;font-size:16px;font-weight:700;cursor:pointer;}' +
      '.rv-pop-x{position:absolute;top:10px;right:10px;width:40px;height:40px;border-radius:50%;border:0;background:rgba(0,0,0,0.55);color:#FFFFFF;font-size:18px;cursor:pointer;}' +
      '@media (max-width:519px){.rv-pop-h{font-size:34px;}.rv-pop-p{font-size:18px;}.rv-pop-b a{min-height:58px;font-size:19px;}.rv-pop-b button{min-height:52px;font-size:18px;}}' +
      '@keyframes rvf{from{opacity:0}to{opacity:1}}@media (prefers-reduced-motion:reduce){.rv-pop{animation:none}}';
    document.head.appendChild(s);
  }

  function banda() {
    var header = document.querySelector('header');
    if (!header || document.querySelector('.rv-banda')) return;
    var d = document.createElement('div');
    d.className = 'rv-banda';
    d.setAttribute('role', 'region');
    d.setAttribute('aria-label', 'Revelion 2027');
    d.innerHTML = '<div class="rv-banda-in">' +
      '<a href="' + PAGINA + '" class="rv-banda-t" style="color:#FFFFFF;text-decoration:none;"><b>Revelion 2027</b><span>Scandalous Edition · 31 decembrie, București</span></a>' +
      '<a class="rv-banda-btn" href="' + BILET + '" target="_blank" rel="noopener noreferrer" data-editie="Scandalous Edition">Cumpără bilet</a></div>';
    header.parentNode.insertBefore(d, header);
  }

  function popup() {
    if (cale !== '/' && cale !== '/index' && cale !== '/index.html') return;
    var ascuns = parseInt(citeste('suspecti_revelion_pop') || '0', 10);
    if (ascuns && Date.now() < ascuns) return;
    var incercari = 0;
    (function asteapta() {
      // Mai întâi bannerul de cookie-uri; pop-up-ul vine după alegere.
      var faraAlegere = typeof window.suspectiAcord === 'function' && window.suspectiAcord() === null;
      if ((faraAlegere || document.getElementById('suspecti-cookie')) && incercari++ < 1200) return setTimeout(asteapta, 500);
      setTimeout(arata, 1800);
    })();
    function arata() {
      if (document.querySelector('.rv-pop')) return;
      var ultimul = document.activeElement;
      var p = document.createElement('div');
      p.className = 'rv-pop';
      p.setAttribute('role', 'dialog');
      p.setAttribute('aria-modal', 'true');
      p.setAttribute('aria-labelledby', 'rv-pop-h');
      p.innerHTML = '<div class="rv-pop-box"><button type="button" class="rv-pop-x" aria-label="Închide">✕</button>' +
        '<img src="/images/revelion/scandalous-desktop.webp" alt="Suspecți la Revelion 2027 · Scandalous Edition" width="800" height="420">' +
        '<div class="rv-pop-in"><h2 class="rv-pop-h" id="rv-pop-h">Nu ai planuri de Revelion? <span>Hai cu noi!</span></h2>' +
        '<p class="rv-pop-p"><strong>Imaginează-ți că la petrecerea de Revelion toată lumea te cunoaște. Doar că sub alt nume.</strong> Mystery dinner, meniu festiv, băuturi și petrecere, pe 31 decembrie.</p>' +
        '<div class="rv-pop-b"><a href="' + PAGINA + '">Vezi programul</a><button type="button" data-nu>Nu mă interesează</button></div></div></div>';
      function inchide(definitiv) {
        if (definitiv) scrie('suspecti_revelion_pop', String(Date.now() + 7 * 864e5));
        else scrie('suspecti_revelion_pop', String(Date.now() + 864e5)); // închis cu ✕: revine peste o zi
        p.remove();
        if (ultimul && ultimul.focus) ultimul.focus();
      }
      p.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-nu')) inchide(true);
        else if (e.target === p || e.target.classList.contains('rv-pop-x')) inchide(false);
        else if (e.target.closest('a')) scrie('suspecti_revelion_pop', String(Date.now() + 864e5));
      });
      document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape' && document.body.contains(p)) { inchide(false); document.removeEventListener('keydown', esc); } });
      document.body.appendChild(p);
      p.querySelector('.rv-pop-b a').focus();
    }
  }

  function start() { stiluri(); banda(); popup(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
