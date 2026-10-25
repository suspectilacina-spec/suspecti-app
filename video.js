/* Videourile de pe site, redate direct în pagină.

   .v-mare: videoul apare întreg, în proporțiile lui (fără decupare), pornește singur fără sunet când ajunge
   în ecran (autoplay, muted, playsinline) și se oprește când iese. Are butoane pentru sunet și pauză.
   Dacă browserul blochează redarea automată sau vizitatorul a cerut „mișcare redusă”, videoul rămâne
   vizibil, cu un buton mare de redare. Videourile adăugate mai târziu în pagină pornesc la fel. */

(function () {
  if (window.suspectiVideoInit) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var boxes = [], io = null;

  function porneste(v) { if (v.preload === 'none') v.preload = 'metadata'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  function stare(box) {
    var v = box.querySelector('video');
    box.classList.toggle('v-ruleaza', !v.paused);
    var p = box.querySelector('[data-v="pauza"]');
    if (p) { p.textContent = v.paused ? '▶ Pornește' : '❚❚ Pauză'; p.setAttribute('aria-label', v.paused ? 'Pornește videoul' : 'Pune videoul pe pauză'); }
    var s = box.querySelector('[data-v="sunet"]');
    if (s) { s.textContent = v.muted ? '🔈 Pornește sunetul' : '🔊 Oprește sunetul'; s.setAttribute('aria-label', v.muted ? 'Pornește sunetul' : 'Oprește sunetul'); }
  }

  function initBox(box) {
    if (box.dataset.vInit) return;
    box.dataset.vInit = '1';
    boxes.push(box);
    var v = box.querySelector('video');
    if (!v) return;
    v.muted = true; v.playsInline = true; v.loop = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    if (reduce) v.removeAttribute('autoplay');
    // Caseta ia proporțiile reale ale videoului (implicit 9:16), ca să se vadă tot cadrul.
    function proportii() { if (v.videoWidth && v.videoHeight) box.style.aspectRatio = v.videoWidth + ' / ' + v.videoHeight; }
    v.addEventListener('loadedmetadata', proportii); proportii();
    ['play', 'pause', 'volumechange'].forEach(function (ev) { v.addEventListener(ev, function () { stare(box); }); });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]');
      if (!b) return;
      var a = b.getAttribute('data-v');
      if (a === 'pauza' || a === 'start') { box.dataset.oprit = v.paused ? '' : '1'; if (v.paused) porneste(v); else v.pause(); }
      if (a === 'sunet') {
        v.muted = !v.muted;
        if (!v.muted) boxes.forEach(function (alt) { var w = alt.querySelector('video'); if (w && w !== v) w.muted = true; });
        if (!v.muted && v.paused) porneste(v);
      }
    });
    stare(box);
    if (reduce) return;
    if (io) io.observe(box); else porneste(v);
  }

  function init(root) {
    if (!reduce && !io && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(function (intrari) {
        intrari.forEach(function (it) {
          var box = it.target, v = box.querySelector('video');
          if (it.isIntersecting && it.intersectionRatio > 0.35) { if (!box.dataset.oprit && v.paused) porneste(v); }
          else if (!v.paused) v.pause();
        });
      }, { threshold: [0, 0.35, 0.8] });
    }
    [].forEach.call((root || document).querySelectorAll('.v-mare'), initBox);
  }
  window.suspectiVideoInit = init;

  function start() {
    init();
    if ('MutationObserver' in window) {
      var programat = false;
      new MutationObserver(function () {
        if (programat) return;
        programat = true;
        setTimeout(function () { programat = false; init(); }, 50);
      }).observe(document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* Marcajul unui video redat în pagină (folosit și de SuspectiUI.videoThumb). */
window.suspectiVideoHTML = function (src, poster, eticheta) {
  function e(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  return '<div class="v-mare"><video src="' + e(src) + '"' + (poster ? ' poster="' + e(poster) + '"' : '') + ' muted loop playsinline autoplay preload="metadata" aria-label="' + e(eticheta || 'Video') + '"></video>' +
    '<button type="button" class="v-start" data-v="start" aria-label="Pornește videoul">▶</button>' +
    '<div class="v-ctrl"><button type="button" data-v="pauza">▶ Pornește</button><button type="button" data-v="sunet">🔈 Pornește sunetul</button></div></div>';
};

/* Butonul de sunet de pe videourile din primul ecran: videoul pornește fără sunet (așa cer browserele), iar vizitatorul îl poate porni. */
function suspectiSunet(btn) {
  var v = document.getElementById(btn.getAttribute('data-vid'));
  if (!v) return;
  var on = v.muted;
  v.muted = !on;
  if (on) {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }
  var text = on ? 'Oprește sunetul' : 'Pornește sunetul';
  btn.textContent = (on ? '🔊 ' : '🔈 ') + text;
  btn.setAttribute('aria-label', text);
}

// Cine a cerut „mișcare redusă” în setările dispozitivului: videourile nu pornesc singure, dar pot fi pornite cu butonul de redare.
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('video[autoplay]').forEach(function (v) { if (v.closest('.v-mare')) return; v.pause(); v.removeAttribute('autoplay'); v.controls = true; });
  });
}
