/* Ajustări editoriale pentru evenimentele sincronizate din AmBilet — se aplică PESTE datele din AmBilet
   și nu sunt niciodată suprascrise de sincronizare. Cheia este ID-ul unic AmBilet (numărul de la finalul slug-ului).

   Câmpuri posibile (toate opționale):
     page    adresa paginii pe site (dacă lipsește, o generează sincronizarea și rămâne fixă)
     title   titlul afișat pe site (ex. fără numele conceptului)
     theme   ancora tematicii pe pagina conceptului (ex. '#disco')
     img,pos poza și încadrarea ei      venue  numele locației, cu diacritice
     price   prețul afișat (în loc de cel calculat din AmBilet)
     tiers   prețuri cu termen: [{ until: 'AAAA-LL-ZZ', price: '149 lei', label: 'Early Bird' }]
     extra   mențiuni sub preț          prize  premiul ediției
     hidden  true = nu se afișează pe site, deși e publicat în AmBilet */

window.SUSPECTI_EDITORIAL = {
  '5062': {
    page: '/treasurehunt/family-timisoara-24-octombrie', title: 'Family Edition', theme: '#family',
    img: '/images/cal-treasurehunt-family.jpg', pos: 'center 55%', venue: 'Parcul Copiilor, intrarea principală',
    extra: 'Pentru fiecare participant, adult sau copil.',
    prize: 'Premiul ediției: vouchere la Beat Se7en, game room-ul cu podea LED din centrul Timișoarei.'
  },
  '5032': {
    page: '/treasurehunt/adults-timisoara-24-octombrie', title: 'Adults Edition', theme: '#adults',
    img: '/images/cal-treasurehunt-adulti.jpg', pos: 'center 30%', venue: 'Piața Unirii, Domul Catolic',
    extra: 'Ofertă de grup 4 + 1 gratis: 56 lei de persoană.',
    prize: 'Premiul ediției: vouchere de relaxare la Zen Expert – Select Massage & Spa.'
  },
  '5024': {
    page: '/brunch/25-octombrie', title: 'The Singing Brunch',
    img: '/images/cal-singing-brunch.jpg', pos: 'center 20%',
    extra: 'Include un pahar de Prosecco. Mâncarea și băuturile se plătesc la restaurant. Ofertă de grup 4 + 1 gratis: 71,20 lei de persoană.'
  },
  '5061': {
    page: '/party/addams-family-31-octombrie', title: 'Addams Family', theme: '#wednesday',
    img: '/images/3f9d64dc6ea8553293017bb4038fa7ee.jpg', pos: 'center 35%', venue: 'DaHUB',
    price: '139 lei', tiers: [{ until: '2026-10-23', price: '119 lei', label: 'Second Wave' }]
  },
  '5044': {
    page: '/cina/ultimul-dans-6-noiembrie', title: 'Ultimul Dans · ’80s Disco Party', theme: '#disco',
    img: '/images/1c5728cbe7ccc20295c79ce659021628.jpg', pos: 'center 35%',
    price: '179 lei', tiers: [{ until: '2026-10-23', price: '149 lei', label: 'Early Bird' }],
    extra: 'Mâncarea și băuturile se plătesc la restaurant; este necesară comanda unui preparat din meniu. Doar After Party: 60 lei.'
  },
  '5089': {
    page: '/treasurehunt/adults-bucuresti-15-noiembrie', title: 'Adults Edition #2', theme: '#adults',
    img: '/images/cal-treasurehunt-adulti.jpg', pos: 'center 30%', venue: 'Piața Victoriei'
  }
};
