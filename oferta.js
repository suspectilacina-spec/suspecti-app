/* Formularele de ofertă (companii, evenimente private): validare cu mesaj lângă fiecare câmp,
   trimitere pe email prin suspectiEmail (forms.js), iar dacă trimiterea nu reușește, mesajul gata
   completat pentru WhatsApp sau email. Subiectul începe cu „Cerere de ofertă”, ca înainte. */

function suspectiOferta(cfg) {
  var form = document.getElementById(cfg.form);
  if (!form) return;
  var eroare = document.getElementById(cfg.eroare);
  var trimis = document.getElementById(cfg.trimis);

  function camp(id) { return document.getElementById(id); }
  function mesaj(el, text) {
    var m = el.parentNode.querySelector('.of-msg');
    if (!text) { el.removeAttribute('aria-invalid'); if (m) m.remove(); return; }
    el.setAttribute('aria-invalid', 'true');
    if (!m) { m = document.createElement('span'); m.className = 'of-msg'; m.id = el.id + 'Err'; el.parentNode.appendChild(m); }
    m.textContent = text;
    el.setAttribute('aria-describedby', m.id);
  }
  function valideaza() {
    var primul = null;
    cfg.obligatorii.forEach(function (o) {
      var el = camp(o[0]), gol = el.type === 'checkbox' ? !el.checked : !String(el.value).trim();
      var gresit = !gol && el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      if (el.type === 'checkbox') { el.closest('label').style.color = gol ? '#A3172F' : ''; if (gol && !primul) primul = el; return; }
      mesaj(el, gol ? o[1] : (gresit ? 'Adresa de email nu pare corectă.' : ''));
      if ((gol || gresit) && !primul) primul = el;
    });
    return primul;
  }
  form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid')) mesaj(e.target, ''); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var primul = valideaza();
    if (primul) {
      eroare.textContent = 'Completează câmpurile marcate, ca să putem pregăti oferta.';
      eroare.hidden = false;
      primul.focus();
      return;
    }
    eroare.hidden = true;
    var date = cfg.date();
    var subiect = cfg.subiect(date);
    var text = Object.keys(date).filter(function (k) { return date[k]; }).map(function (k) { return '• ' + k + ': ' + date[k]; }).join('\n');
    var btn = form.querySelector('button[type="submit"]');
    var eticheta = btn.textContent;
    btn.disabled = true; btn.textContent = 'Se trimite…';
    suspectiEmail(subiect, date).then(function () {
      form.hidden = true; trimis.hidden = false;
    }).catch(function () {
      form.hidden = true; trimis.hidden = false;
      camp(cfg.trimisTitlu).textContent = 'Cererea e gata de trimis';
      camp(cfg.trimisText).textContent = 'Nu am reușit să o trimitem automat. Alege cum vrei să ne-o trimiți: se deschide aplicația ta, cu mesajul deja completat.';
      camp(cfg.wa).href = 'https://wa.me/40755639871?text=' + encodeURIComponent(subiect + '\n' + text);
      var mail = camp(cfg.mail);
      mail.href = 'mailto:contact@suspectilacina.com?subject=' + encodeURIComponent(subiect) + '&body=' + encodeURIComponent(text);
      mail.hidden = false;
    }).then(function () { btn.disabled = false; btn.textContent = eticheta; });
  });
}

// Butoanele „Cere ofertă pentru …” aleg formatul în formular și duc la el.
function suspectiAlegeFormat(selectId, tinta) {
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-format]') : null;
    if (!b) return;
    var s = document.getElementById(selectId);
    if (s) s.value = b.getAttribute('data-format');
    var t = document.getElementById(tinta);
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
