/* Butonul de sunet de pe videouri: videoul pornește fără sunet (așa cer browserele), iar vizitatorul îl poate porni. */
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
    document.querySelectorAll('video[autoplay]').forEach(function (v) { v.pause(); v.removeAttribute('autoplay'); v.controls = true; });
  });
}
