/* Trimiterea formularelor SUSPECȚI.
   - Preînscrierile ajung în Google Form-ul „Preînscriere SUSPECȚI” (răspunsurile se văd în Google Forms).
   - Cererile de ofertă și abonările ajung pe email la contact@suspectilacina.com (prin FormSubmit.co). */

var SUSPECTI_GFORM = 'https://docs.google.com/forms/d/e/1FAIpQLSegFNl2Ci1kd9crLS6um2_M5FNzcceja7eIJWHULhGHS7Co5A/formResponse';
var SUSPECTI_EMAIL = 'https://formsubmit.co/ajax/contact@suspectilacina.com';
var SUSPECTI_WHATSAPP = 'https://wa.me/40755639871';

// Textele trebuie să fie identice cu opțiunile din Google Form.
var SUSPECTI_EXP = {
  cinaGatsby: 'Suspecți la Cină · Balul lui Gatsby',
  cinaDance: 'Suspecți la Cină · Murder on the Dance Floor',
  cinaPeaky: 'Suspecți la Cină · Peaky Blinders',
  cinaDisco: 'Suspecți la Cină · ’80s Disco',
  cinaMafia: 'Suspecți la Cină · Mafia Night',
  thAdults: 'Suspecți în Treasure Hunt · Adults',
  thFamily: 'Suspecți în Treasure Hunt · Family',
  brunch: 'The Singing Brunch',
  primaVedere: 'Suspecți la Prima Vedere · Sippin’ Singles',
  automachiaj: 'Suspecți la Automachiaj',
  povesti: 'Suspecți la Povești with a touch of tarot'
};
var SUSPECTI_ACORD = 'Sunt de acord să fiu contactat(ă) de SUSPECȚI despre edițiile următoare.';

function suspectiVal(id) {
  var el = document.getElementById(id);
  return el ? String(el.value).trim() : '';
}

// d = { experiente: [...], nume, email, telefon, oras, cuCine, zi }
function suspectiPreinscriere(d) {
  var p = new URLSearchParams();
  d.experiente.forEach(function (x) { p.append('entry.91598127', x); });
  p.append('entry.261983872', d.nume);
  p.append('entry.1828393457', d.email);
  if (d.telefon) p.append('entry.1582920305', d.telefon);
  if (d.oras) p.append('entry.385925672', d.oras);
  if (d.cuCine) p.append('entry.860761923', d.cuCine);
  p.append('entry.1885758907', d.zi || 'Oricare');
  p.append('entry.1651465826', SUSPECTI_ACORD);
  // Google nu permite citirea răspunsului de pe alt site (no-cors), dar datele ajung.
  return fetch(SUSPECTI_GFORM, { method: 'POST', mode: 'no-cors', body: p });
}

// campuri = { 'Nume': ..., 'Email': ..., ... } — câmpurile goale nu se trimit.
function suspectiEmail(subiect, campuri) {
  var data = { _subject: subiect, _template: 'table', _captcha: 'false' };
  Object.keys(campuri).forEach(function (k) { if (campuri[k]) data[k] = campuri[k]; });
  if (campuri.Email) data._replyto = campuri.Email;
  return fetch(SUSPECTI_EMAIL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (r) { return r.json(); }).then(function (j) {
    if (String(j.success) !== 'true') throw new Error(j.message || 'Trimiterea a eșuat');
    return j;
  });
}

// Trimite formularul: blochează butonul, apoi arată confirmarea sau un mesaj de eroare.
function suspectiTrimite(form, sent, trimitere) {
  var btn = form.querySelector('button[type="submit"]');
  var text = btn ? btn.textContent : '';
  var err = form.querySelector('.suspecti-err');
  if (err) err.remove();
  if (btn) { btn.disabled = true; btn.textContent = 'Se trimite…'; }
  return trimitere().then(function () {
    form.style.display = 'none';
    if (sent) sent.style.display = '';
  }).catch(function () {
    if (btn) { btn.disabled = false; btn.textContent = text; }
    var p = document.createElement('p');
    p.className = 'suspecti-err';
    p.setAttribute('role', 'alert');
    p.style.cssText = 'margin:0; font-size:14px; color:#A3172F;';
    p.innerHTML = 'Nu am reușit să trimitem mesajul. Încearcă din nou sau scrie-ne pe <a href="' + SUSPECTI_WHATSAPP + '" target="_blank" rel="noopener noreferrer">WhatsApp</a> ori la <a href="mailto:contact@suspectilacina.com">contact@suspectilacina.com</a>.';
    form.appendChild(p);
  });
}
