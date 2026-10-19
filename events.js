/* Edițiile programate SUSPECȚI — un singur loc pentru calendar, paginile pe ediție și bara de cumpărare.
   Pentru o ediție nouă: copiază un bloc, schimbă datele și adresa (page). Adresa trebuie să înceapă cu
   /cina/, /party/, /brunch/ sau /treasurehunt/ (vezi vercel.json). m = luna din CAL_MONTH_LABELS (calendar). */

var SUSPECTI_EVENTS = [
  {
    m: 0, key: 'Treasure Hunt', page: '/treasurehunt/family-timisoara-24-octombrie', theme: '#family',
    img: '/images/cal-treasurehunt-family.jpg', pos: 'center 55%',
    weekday: 'SÂM', day: '24', month: 'OCT', date: 'Sâmbătă, 24 octombrie 2026',
    format: 'Suspecți în Treasure Hunt', city: 'Timișoara', title: 'Family Edition',
    time: '10:00', venue: 'Parcul Copiilor, intrarea principală', meta: '10:00 · Parcul Copiilor, intrarea principală',
    price: '60 lei', extra: 'Pentru fiecare participant, adult sau copil.',
    prize: 'Premiul ediției: vouchere la Beat Se7en, game room-ul cu podea LED din centrul Timișoarei.',
    link: 'https://www.ambilet.ro/bilete/suspecti-in-treasure-hunt-family-edition-timisoara-5062'
  },
  {
    m: 0, key: 'Treasure Hunt', page: '/treasurehunt/adults-timisoara-24-octombrie', theme: '#adults',
    img: '/images/cal-treasurehunt-adulti.jpg', pos: 'center 30%',
    weekday: 'SÂM', day: '24', month: 'OCT', date: 'Sâmbătă, 24 octombrie 2026',
    format: 'Suspecți în Treasure Hunt', city: 'Timișoara', title: 'Adults Edition',
    time: '15:00', venue: 'Piața Unirii, Domul Catolic', meta: '15:00 · Piața Unirii, Domul Catolic',
    price: '70 lei', extra: 'Ofertă de grup 4 + 1 gratis: 56 lei de persoană.',
    prize: 'Premiul ediției: vouchere de relaxare la Zen Expert – Select Massage & Spa.',
    link: 'https://www.ambilet.ro/bilete/suspecti-in-treasure-hunt-adults-only-timisoara-5032'
  },
  {
    m: 0, key: 'Brunch', page: '/brunch/25-octombrie', theme: '',
    img: '/images/cal-singing-brunch.jpg', pos: 'center 20%',
    weekday: 'DUM', day: '25', month: 'OCT', date: 'Duminică, 25 octombrie 2026',
    format: 'Suspecți la Brunch', city: 'București', title: 'The Singing Brunch',
    time: '14:00', venue: 'Naive', meta: '14:00 · Naive',
    price: '89 lei', extra: 'Include un pahar de Prosecco. Mâncarea și băuturile se plătesc la restaurant. Ofertă de grup 4 + 1 gratis: 71,20 lei de persoană.',
    link: 'https://www.ambilet.ro/bilete/the-singing-brunch-suspecti-la-brunch-5024'
  },
  {
    m: 0, key: 'Party', page: '/party/addams-family-31-octombrie', theme: '#wednesday',
    img: '/images/3f9d64dc6ea8553293017bb4038fa7ee.jpg', pos: 'center 35%',
    weekday: 'SÂM', day: '31', month: 'OCT', date: 'Sâmbătă, 31 octombrie 2026',
    format: 'Suspecți la Party', city: 'Timișoara', title: 'Addams Family',
    time: '20:00', venue: 'DaHUB', meta: '20:00 · DaHUB',
    price: '139 lei', extra: '',
    tiers: [{ until: '2026-10-23', price: '119 lei', label: 'Second Wave' }],
    link: 'https://www.ambilet.ro/bilete/suspecti-la-party-halloween-edition-5061'
  },
  {
    m: 1, key: 'Cină', page: '/cina/ultimul-dans-6-noiembrie', theme: '#disco',
    img: '/images/1c5728cbe7ccc20295c79ce659021628.jpg', pos: 'center 35%',
    weekday: 'VIN', day: '6', month: 'NOI', date: 'Vineri, 6 noiembrie 2026',
    format: 'Suspecți la Cină', city: 'București', title: 'Ultimul Dans · ’80s Disco Party',
    time: '20:00', venue: 'Mirador Rooftop', meta: '20:00 · Mirador Rooftop',
    price: '179 lei', extra: 'Mâncarea și băuturile se plătesc la restaurant; este necesară comanda unui preparat din meniu. Doar After Party: 60 lei.',
    tiers: [{ until: '2026-10-23', price: '149 lei', label: 'Early Bird' }],
    link: 'https://www.ambilet.ro/bilete/suspecti-la-cina-ultimul-dans-5044'
  },
  {
    m: 1, key: 'Treasure Hunt', page: '/treasurehunt/adults-bucuresti-15-noiembrie', theme: '#adults',
    img: '/images/cal-treasurehunt-adulti.jpg', pos: 'center 30%',
    weekday: 'DUM', day: '15', month: 'NOI', date: 'Duminică, 15 noiembrie 2026',
    format: 'Suspecți în Treasure Hunt', city: 'București', title: 'Adults Edition #2',
    time: '14:00', venue: 'Piața Victoriei', meta: '14:00 · Piața Victoriei',
    price: '120 lei', extra: '',
    link: 'https://www.ambilet.ro/bilete/suspecti-in-treasure-hunt-aduls-edition-2-bucuresti-5089'
  }
];

/* Prețuri cu termen (tiers): până la data „until” (inclusiv, ora României) se afișează prețul redus,
   evidențiat cu termenul; după aceea, automat, prețul obișnuit din „price”. */
(function () {
  var LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
  var acum = new Date();
  SUSPECTI_EVENTS.forEach(function (ev) {
    ev.priceNote = '';
    (ev.tiers || []).some(function (t) {
      var sfarsit = new Date(t.until + 'T23:59:59+03:00');
      if (acum > sfarsit) return false;
      var d = t.until.split('-');
      ev.priceNote = t.label + ': ' + t.price + ' până pe ' + parseInt(d[2], 10) + ' ' + LUNI[parseInt(d[1], 10) - 1] + ', apoi ' + ev.price;
      ev.price = t.price;
      return true;
    });
  });

  // Prima pagină („Urmează”): cardurile sunt scrise direct în pagină; aici le actualizăm prețul și termenul.
  function cardurileDePeAcasa() {
    SUSPECTI_EVENTS.forEach(function (ev) {
      var a = document.querySelector('article.event-card a.btn[href="' + ev.page + '"]');
      if (!a) return;
      var pret = a.parentNode.querySelector('span');
      if (pret) pret.textContent = ev.price;
      if (ev.priceNote && !a.parentNode.parentNode.querySelector('.pret-termen')) {
        var n = document.createElement('span');
        n.className = 'pret-termen';
        n.style.cssText = 'display:inline-block; margin-top:8px; padding:4px 10px; border-radius:999px; background:#A3172F; color:#FFFFFF; font-size:12px; font-weight:700;';
        n.textContent = ev.priceNote;
        a.parentNode.parentNode.insertBefore(n, a.parentNode);
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', cardurileDePeAcasa);
  else cardurileDePeAcasa();
})();
