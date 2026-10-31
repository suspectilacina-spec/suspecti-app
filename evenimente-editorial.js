/* Ajustări editoriale pentru evenimentele sincronizate din AmBilet — se aplică PESTE datele din AmBilet
   și nu sunt niciodată suprascrise de sincronizare. Cheia este ID-ul unic AmBilet (numărul de la finalul slug-ului).

   Câmpuri posibile (toate opționale):
     page    adresa paginii pe site (dacă lipsește, o generează sincronizarea și rămâne fixă)
     title   titlul afișat pe site (ex. fără numele conceptului)
     tip     tipul experienței, afișat sub titlu (ex. 'Mystery Dinner & ’80s Disco Party')
     durata  durata afișată (ex. '2 ore'); pentru Treasure Hunt există valori implicite în events.js
     theme   ancora tematicii pe pagina conceptului (ex. '#disco')
     img,pos poza și încadrarea ei      venue  numele locației, cu diacritice
     imgMobil  poza verticală afișată pe telefon în primul ecran al ediției (img rămâne pentru calculator)
     concept   numele conceptului afișat deasupra titlului (ex. 'Suspecți la Revelion')
     video,poster  videoul din primul ecran al paginii ediției
     price   prețul afișat (în loc de cel calculat din AmBilet)
     tiers   prețuri cu termen: [{ until: 'AAAA-LL-ZZ', price: '149 lei', label: 'Early Bird' }]
     extra   mențiuni sub preț          prize  premiul ediției
     hidden  true = nu se afișează pe site, deși e publicat în AmBilet
   Textele lungi ale paginii de ediție sunt în editii-continut.js. */

window.SUSPECTI_EDITORIAL = {
  '5062': {
    page: '/treasurehunt/family-timisoara-24-octombrie', title: 'Family Edition', theme: '#family',
    tip: 'Treasure Hunt pentru părinți și copii', durata: '2 ore',
    img: '/images/7e2c1325ff3ce5e3efda7490acef4600.webp', pos: 'center 22%', venue: 'Parcul Copiilor, intrarea principală',
    video: '/videos/v2/ed-family2.mp4', poster: '/images/v2/ed-family2-poster.jpg',
    extra: 'Pentru fiecare participant, adult sau copil. Recomandat copiilor între 5 și 14 ani.',
    prize: 'Premiul ediției: vouchere la Beat Se7en, game room-ul cu podea LED din centrul Timișoarei.'
  },
  '5032': {
    page: '/treasurehunt/adults-timisoara-24-octombrie', title: 'Adults Edition', theme: '#adults',
    tip: 'Treasure Hunt pentru adulți, prin centrul orașului', durata: '3 ore',
    img: '/images/5d290e437062693dcdb40fc99bb167c6.webp', pos: 'center 22%', venue: 'Piața Unirii, Domul Catolic',
    video: '/videos/v2/ed-adults-tm.mp4', poster: '/images/v2/ed-adults-tm-poster.jpg',
    extra: 'Ofertă de grup 4 + 1 gratis: 56 lei de persoană.',
    prize: 'Premiul ediției: vouchere de relaxare la Zen Expert – Select Massage & Spa.'
  },
  '5024': {
    page: '/brunch/25-octombrie', title: 'The Singing Brunch',
    tip: 'Brunch cu DJ, MC și karaoke de grup', durata: 'Aprox. 4 ore, apoi dans',
    img: '/images/c7b375750bd73a01060470a4f618e5f1.webp', pos: 'center 22%', venue: 'Naïve',
    video: '/videos/v2/ed-brunch.mp4', poster: '/images/v2/ed-brunch-poster.jpg',
    price: 'de la 70 lei',
    extra: 'Early Bird: 70 lei, apoi 89 lei. Ofertă de grup 4 + 1 gratis. Include un pahar de Prosecco.'
  },
  '5061': {
    hidden: true, /* Halloween Timișoara – scos de pe site la cererea Alexandrei, 31.10.2026 */
    page: '/party/addams-family-31-octombrie', title: 'Addams Family', theme: '#wednesday',
    tip: 'Petrecere tematică de Halloween', durata: 'Joc aprox. 2 ore, apoi petrecere',
    img: '/images/180881b877a3c92af6721923aab715f6.jpg', pos: 'center 22%', venue: 'DaHUB',
    video: '/videos/v2/ed-party-addams2.mp4', poster: '/images/v2/ed-party-addams2-poster.jpg',
    price: 'de la 89 lei',
    extra: '89 lei, apoi 119 lei (până pe 23 octombrie), apoi 139 lei.'
  },
  '5044': {
    page: '/cina/ultimul-dans-6-noiembrie', title: 'Ultimul Dans', theme: '#disco',
    tip: 'Mystery Dinner & ’80s Disco Party', durata: 'Aprox. 4 ore, apoi petrecere',
    img: '/images/4effe9715b4a5bae50ea64d83bdb1fe5.jpg', pos: 'center 33%',
    video: '/videos/v2/ed-cina-disco2.mp4', poster: '/images/v2/ed-cina-disco2-poster.jpg',
    price: '179 lei', tiers: [{ until: '2026-10-23', price: '149 lei', label: 'Early Bird' }],
    extra: 'Consumația nu este inclusă în bilet; participarea presupune comanda unui preparat din meniu. Bilet „Doar After Party”: 60 lei.'
  },
  '5089': {
    page: '/treasurehunt/adults-bucuresti-15-noiembrie', title: 'Adults Edition', theme: '#adults',
    tip: 'Treasure Hunt pentru adulți, cu Hai să Socializăm', durata: '3 ore',
    img: '/images/46756a140b4d483b3cd121dd63dd0d90.webp', pos: 'center 22%', venue: 'Piața Victoriei',
    video: '/videos/v2/ed-adults-buc.mp4', poster: '/images/v2/ed-adults-buc-poster.jpg'
  },
  '5197': {
    page: '/revelion/scandalous-2027', concept: 'Suspecți la Revelion', title: 'Scandalous Edition',
    tip: 'Mystery Dinner, meniu festiv, băuturi incluse și petrecere',
    venue: 'Naïve',
    img: '/images/revelion/scandalous-desktop.webp', pos: 'right center',
    price: '885 lei',
    tiers: [
      { until: '2026-11-13', price: '750 lei', label: 'Early Bird' },
      { until: '2026-11-30', price: '819 lei', label: 'Second Wave' }
    ],
    extra: 'Biletul include experiența, meniul festiv și selecția de băuturi.'
  }
};
