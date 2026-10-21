/* Conținutul paginilor de ediție (/cina/..., /party/..., /brunch/..., /treasurehunt/...).
   Datele de bază (dată, oră, locație, preț, link de bilete) vin din events.js (sincronizarea AmBilet +
   evenimente-editorial.js). Aici sunt textele care explică ediția, după ID-ul AmBilet.

   Câmpuri:
     scurt       explicația de 2–3 propoziții din primul ecran
     poveste     paragrafe despre tema ediției
     pasi        [{ t: 'titlu', d: 'descriere' }] — cum decurge
     include     ce include biletul
     conditii    condițiile de participare (preț, consumație, vârstă)
     extraTitlu, extra   o listă suplimentară (ex. meniul de la brunch)
     dress       { titlu, text } — dress code
     practic     informații practice (punct de întâlnire, ce aduci)
     foto        [[src, alt]] — fotografii reale din edițiile anterioare
     testimoniale [[text, nume]] — doar testimoniale existente
     faq         [[întrebare, răspuns]]
   Câmpurile lipsă iau valoarea din SUSPECTI_CONCEPTE (după tipul ediției). */

window.SUSPECTI_CONCEPTE = {
  cina: {
    foto: [
      ['/images/ee5d8795c05d54b56dfbcfb8f5e4d27c.jpg', 'Invitate în ținute de epocă la Suspecți la Cină'],
      ['/images/23e89225616de4f3571f5a3ac06a2af1.jpg', 'Invitată cu banii jocului'],
      ['/images/d4cbd282701ab33b38c65fab31ef79d6.jpg', 'Indicii și bani de joc schimbați între suspecți'],
      ['/images/3a49be23427ad034b3c1f7622a58c9e0.jpg', 'Suspecți la un pahar de vorbă'],
      ['/images/0f08b49843983eb53aa57c7893e2b01b.jpg', 'Gazda serii arată spre un suspect'],
      ['/images/779057d2d84743beab678d468174a4af.jpg', 'Suspecta numărul 2']
    ],
    testimoniale: [
      ['Nu mă așteptam să mă implic atât de mult. După ce am primit rolul, chiar am intrat în poveste și am început să vorbesc cu oameni cu care probabil nu aș fi interacționat altfel.', 'Raluca D. · Suspecți la Cină'],
      ['Am venit cu doi prieteni și la final ajunseserăm să vorbim cu jumătate din sală. Atmosfera a fost foarte naturală.', 'Mihai S. · Suspecți la Cină']
    ],
    faq: [
      ['Pot veni singur?', 'Da. Mulți participanți vin singuri. Personajul tău are legături cu alți invitați, așa că ai de la început motive să intri în vorbă cu ei.'],
      ['Trebuie să știu să joc teatru?', 'Nu. Nu înveți replici și nu ieși pe scenă. Primești în plic tot ce trebuie să știi despre personaj, iar gazda serii îți explică regulile.'],
      ['Cina este inclusă în bilet?', 'Consumația nu este inclusă în bilet; participarea presupune comanda unui preparat din meniu.'],
      ['Ce fac dacă sunt mai timid?', 'Rolurile se aleg după un chestionar scurt, așa că primești un personaj cu care te simți confortabil.']
    ]
  },
  party: {
    foto: [
      ['/images/87e0590026551a9509ed81155a77e934.jpg', 'Invitați rezolvând o provocare la masă'],
      ['/images/056f8df0113cc0d0fff225686f32f0fe.jpg', 'Ringul plin la o petrecere Suspecți'],
      ['/images/13c6658816d838bbbce74d32696ea7b2.jpg', 'Invitată cu bani de joc'],
      ['/images/79ed698b82d3e931afdae8244aba056b.jpg', 'Selfie la masă'],
      ['/images/3ea06ca431528a1165032cfa1f3dd4fb.jpg', 'Invitați dansând'],
      ['/images/a6e0c0554baf9093b1d713ec3e2713a4.jpg', 'Fotografie de grup la finalul unei petreceri Suspecți']
    ],
    testimoniale: [
      ['Nu mă așteptam să fie atât de entertaining. Am râs mult, am vorbit cu oameni noi și chiar a fost diferit față de orice altă ieșire.', 'Vlad C. · Suspecți la Party'],
      ['Mi-a plăcut că nu era doar party și nu era doar joc. Era combinația perfectă între cele două.', 'Andrei P. · Suspecți la Party'],
      ['A fost unul dintre puținele evenimente la care oamenii chiar vorbeau între ei și nu stăteau doar în grupul lor.', 'Diana P. · Suspecți la Party']
    ],
    faq: [
      ['Pot veni singur?', 'Da. Primești un rol și o „familie” încă de la început, așa că ai cu cine să vorbești din primele minute.'],
      ['Trebuie să am experiență în actorie?', 'Nu. Îți explicăm cum funcționează jocul, iar personajul îl joci în felul tău.']
    ]
  },
  brunch: {
    foto: [
      ['/images/f0c19d7592705101776ea87540fdd69c.webp', 'The Singing Brunch, fotografia 1'],
      ['/images/b07d7cc9d3bd8ca8a20351868ea27ab3.webp', 'The Singing Brunch, fotografia 2'],
      ['/images/aeca7acfc13f86c64f83ff52742cfb83.webp', 'The Singing Brunch, fotografia 3'],
      ['/images/f0cbb2a45714df2d34963cc1466de74f.webp', 'The Singing Brunch, fotografia 4'],
      ['/images/b9b18186dfbc85cde9e6c11c58fc25c2.webp', 'The Singing Brunch, fotografia 5'],
      ['/images/ab55df5ed84129cb5ac707b88f734189.webp', 'The Singing Brunch, fotografia 6']
    ],
    testimoniale: [
      ['Nu trebuie să știi să cânți. Atmosfera este atât de faină, încât ajungi să cânți și să dansezi fără să îți dai seama.', 'Bianca T. · The Singing Brunch']
    ],
    faq: [
      ['Trebuie să știu să cânt?', 'Nu. Cântăm toată sala odată, cu versurile pe ecrane. Nimeni nu e chemat singur la microfon.'],
      ['Pot veni singur?', 'Da. Provocările muzicale de la mese te pun în vorbă cu ceilalți din primele minute.']
    ]
  },
  family: {
    foto: [
      ['/images/87e64e2d0c36722deb34982705273eef.jpg', 'Copii și părinți la o probă în parc'],
      ['/images/fff5d85df2fce2701d12d2af926270ce.jpg', 'Familie citind harta jocului'],
      ['/images/9dedfca303708724d8a04d1b1557996e.jpg', 'Părinți și copil rezolvând un indiciu la masă'],
      ['/images/bd4754247c7f7df3d38db8b0534e9530.jpg', 'Echipă de familie cu harta'],
      ['/images/d26a85600d1ca81ed0db2e204a1c1b26.jpg', 'Copii la proba de cățărare'],
      ['/images/a52240b88ef68363775dc2a31dfdb0e7.jpg', 'Proba de cățărare în parc']
    ],
    testimoniale: [],
    faq: [
      ['Ce vârstă trebuie să aibă copiii?', 'Jocul e recomandat copiilor între 5 și 14 ani. Misiunile sunt gândite pentru părinți și copii împreună.'],
      ['Plătesc și părinții bilet?', 'Da. Biletul e pentru fiecare participant, adult sau copil.'],
      ['Vin doar eu cu copilul. Avem echipă?', 'Da. Fiecare familie formează o echipă, iar dacă vii singur cu copilul, vă alăturăm altei familii.'],
      ['Cât durează?', 'Jocul durează 2 ore.']
    ]
  },
  adults: {
    foto: [
      ['/images/34ecfa4f6f3f385dc4f6721f8ba0c727.webp', 'Echipă la startul traseului'],
      ['/images/c3d8d42c019ba7dd61d87e2593ad252d.webp', 'Echipe alergând pe strada cu umbrele'],
      ['/images/7dcb35d0bad9a99e3d4b3075022facbd.webp', 'Echipă descifrând un indiciu'],
      ['/images/56978fb068bece72070a9ed8aa194464.jpg', 'Puzzle rezolvat în echipă'],
      ['/images/e91d487b2d2f91df2146b41c78062875.jpg', 'Misiune foto: săritura echipei'],
      ['/images/edd0cabd1f27ae7e13059c5774f4a085.webp', 'Misiune foto în fața unei vitrine']
    ],
    testimoniale: [],
    faq: [
      ['Trebuie să vin cu o echipă?', 'Nu. Poți veni singur, în doi sau cu prietenii. Formăm echipele la start.'],
      ['Am nevoie de experiență?', 'Nu. Explicăm regulile înainte de start, iar echipa noastră e pe traseu dacă aveți nevoie de îndrumare.'],
      ['Cât durează?', 'Jocul durează 3 ore.'],
      ['Ce iau cu mine?', 'Încălțăminte comodă, haine potrivite vremii și telefonul încărcat, pentru probele foto și video.']
    ]
  }
};

// Întrebări valabile pentru toate edițiile publice (se adaugă după cele ale conceptului).
window.SUSPECTI_FAQ_COMUN = [
  ['Pot anula și primi banii înapoi?', 'Poți cere rambursarea biletului cu cel puțin 7 zile calendaristice înainte de eveniment, scriindu-ne la contact@suspectilacina.com cu numele, ediția și numărul comenzii. Comisionul platformei de ticketing nu se returnează. Detalii în <a href="/termeni">Termenii de participare</a>.'],
  ['Pot da biletul altcuiva?', 'Da, dacă ne anunți în scris înainte de eveniment. Transferul e valabil după ce îl confirmăm.'],
  ['Cum primesc biletul?', 'Biletele se cumpără prin AmBilet, partenerul nostru de ticketing. După plată, biletul vine pe email.']
];

window.SUSPECTI_EDITII = {
  /* Suspecți la Cină: Ultimul Dans — Mystery Dinner & ’80s Disco Party · Mirador Rooftop, București */
  '5044': {
    scurt: 'Primești un personaj cu secrete și obiective proprii. La cină vorbești cu ceilalți invitați, faci schimb de informații și afli, din conversații, cine ascunde ce. După ce se descoperă vinovatul, seara continuă cu o petrecere disco, cu DJ.',
    poveste: [
      'Suntem în Club Studio 88. Roxy Star își lansează noul album, iar tu ești printre invitații de la petrecere. În timp ce ringul se umple, în culise apar conflicte care pot strica seara. Ce rol ai tu în toate astea afli când deschizi plicul.',
      'Primești un personaj cu trecut, relații și informații pe care alții nu le au. Felul în care jucați schimbă povestea, așa că fiecare masă ajunge la final pe un drum puțin diferit.'
    ],
    pasi: [
      { t: 'Înainte', d: 'Răspunzi la câteva întrebări, iar noi îți alegem personajul.' },
      { t: 'La sosire', d: 'Primești plicul cu personajul, relațiile lui și primele secrete. Gazda serii explică regulile.' },
      { t: 'Prima rundă', d: 'Apare crima. Începi să pui întrebări, să aduni indicii și să-ți faci aliați.' },
      { t: 'A doua rundă', d: 'Primești obiective noi. Informațiile se schimbă pe bani de joc, iar alianțele se mai rup.' },
      { t: 'Finalul', d: 'Votați, aflați vinovatul și premiem cea mai apreciată ținută și cel mai implicat personaj.' },
      { t: 'Petrecerea', d: 'Continuăm cu DJ, hituri disco și timp de povestit cu oamenii pe care i-ai cunoscut la cină.' }
    ],
    include: [
      'Welcome drink',
      'Un rol în jocul Mystery Dinner, cu personaj și materiale de joc',
      'Participarea la joc: misiuni, indicii și interacțiuni cu ceilalți invitați',
      'Petrecerea cu DJ de după joc'
    ],
    conditii: [
      'Consumația nu este inclusă în bilet; participarea presupune comanda unui preparat din meniu.',
      'Early Bird: 149 lei, până pe 23 octombrie. Apoi biletul costă 179 lei.',
      'Dacă vii doar la petrecerea de după joc, există bilet „Doar After Party”, 60 lei.',
      'Vârsta minimă: 16 ani.',
      'Poți veni singur, în cuplu sau cu prietenii.'
    ],
    dress: {
      titlu: 'Dress code: ’80s Disco Party',
      text: 'Paiete, materiale metalizate, culori puternice, umeri accentuați, sacouri oversized, denim, piele sau un accesoriu care se vede de departe. Nu ai nevoie de costum. O ținută de azi, cu câteva accente din anii ’80, e suficientă.'
    },
    practic: [
      'Începem la 20:00, la Mirador Rooftop, București.',
      'Personajul îl primești la intrare. Ai câteva minute să-l citești înainte să înceapă jocul.',
      'Pe parcursul serii facem fotografii. Dacă nu vrei să apari, spune-i gazdei la început.'
    ],
    foto: [
      ['/images/1c5728cbe7ccc20295c79ce659021628.jpg', 'Ringul de dans la ’80s Disco'],
      ['/images/6d40e529f9a11a85c1781f5e69266619.jpg', 'Invitate în ținute cu paiete'],
      ['/images/c57c8920460d6c8217f1f5d8adca05b6.jpg', 'Invitată cu banii jocului'],
      ['/images/5485e878ea2ef4a979c936374ed5b9ab.jpg', 'Invitați cântând și dansând'],
      ['/images/3a070c42cd342522c67516f52e5f03d9.jpg', 'Două invitate cu bani de joc'],
      ['/images/a09ee22971e2338de939ac48ec6966fc.jpg', 'Râsete la ’80s Disco']
    ],
    faq: [
      ['Ce înseamnă biletul „Doar After Party”?', 'E pentru cine vrea să vină doar la petrecerea cu DJ de după joc, fără să participe la Mystery Dinner.']
    ]
  },

  /* Suspecți la Party: Addams Family · Halloween · DaHUB, Timișoara */
  '5061': {
    scurt: 'Wednesday își sărbătorește majoratul, iar tu ești una dintre rudele invitate. În prima parte a serii primești un personaj, îți afli „familia” și aveți misiuni de dus la capăt. Apoi seara continuă cu muzică și dans.',
    poveste: [
      'Rudele familiei Addams vin din toate colțurile lumii. Fiecare grup e o ramură a familiei dintr-o altă țară, cu personaje excentrice și obiceiuri pe măsură.',
      'Primești un nume, un rol cu câteva trăsături amuzante și informații despre rudele tale. Misiunile de echipă te trimit să vorbești și cu invitații din celelalte ramuri.'
    ],
    pasi: [
      { t: 'La sosire', d: 'Primești numele, rolul și primele informații despre „familia” ta.' },
      { t: 'Jocul, 90–120 de minute', d: 'Îți cauți rudele și duceți la capăt misiunile de echipă, printre ceilalți invitați.' },
      { t: 'Premiile', d: 'Premiem cele mai creative ținute și implicarea în joc. Avem și premii de la sponsori, pe care le anunțăm în perioada următoare.' },
      { t: 'Petrecerea', d: 'Continuăm cu muzică și dans, cu oameni pe care deja i-ai cunoscut.' }
    ],
    include: [
      'Experiența interactivă de la începutul serii',
      'Accesul la petrecere',
      'Surprizele tematice ale serii',
      'Fotografii de la eveniment, cu ținuta și „familia” ta'
    ],
    conditii: [
      'Prețul crește pe măsură ce se vând biletele: 89 lei, apoi 119 lei (până pe 23 octombrie, inclusiv), apoi 139 lei. Pe pagina de bilete vezi prețul disponibil acum.',
      'Dacă intervine ceva, îți rambursăm biletul dacă ne anunți cu cel puțin 3 zile înainte de eveniment.',
      'Vârsta minimă: 18 ani.',
      'Poți veni singur sau cu prietenii.'
    ],
    dress: {
      titlu: 'Dress code: Black & White Glam',
      text: 'Ne inspirăm din eleganța gotică a familiei Addams: o ținută all black, all white sau alb cu negru. Dantelă, perle, mănuși sau un accesoriu neobișnuit completează ținuta. Poți veni ca un personaj din universul Wednesday sau cu propria interpretare a temei.'
    },
    practic: [
      'Începem la 20:00, la DaHUB, Timișoara.',
      'Nu ai nevoie de experiență în actorie. Îți explicăm cum funcționează jocul.'
    ],
    foto: [
      ['/images/3978c8ca762987ac174b66aa5fa792c7.jpg', 'Addams Family Edition, invitați în ținute alb-negru'],
      ['/images/3f9d64dc6ea8553293017bb4038fa7ee.jpg', 'Addams Family Edition, detaliu'],
      ['/images/1f07ebf1781b59ea6b65c774a3d2e9fc.jpg', 'Addams Family Edition, invitați'],
      ['/images/9cf71833af55703fff4d61faeeff7af8.jpg', 'Addams Family Edition, fotografia 1'],
      ['/images/0d3f7f09bb54f3a7cbf0553af023eba3.jpg', 'Addams Family Edition, fotografia 2'],
      ['/images/0288f53585bd7ed0f9911955a0b1cdd3.webp', 'Addams Family Edition, fotografia 3']
    ],
    faqFaraComun: ['Pot anula și primi banii înapoi?']
  },

  /* The Singing Brunch · Naïve, București */
  '5024': {
    scurt: 'Un brunch de duminică la care cântăm toți împreună, cu versurile pe ecrane, DJ și MC. Între melodii avem provocări muzicale la mese. Nu trebuie să știi să cânți și nimeni nu te cheamă singur la microfon.',
    poveste: [
      'Hituri pe care le știe toată lumea, refrene cântate de toată sala și microfoane gonflabile. DJ-ul și MC-ul țin ritmul, iar provocările muzicale de la mese te pun în vorbă cu oamenii de lângă tine.',
      'Poți veni cu prietenii sau singur. De restul ne ocupăm noi.'
    ],
    pasi: [
      { t: 'La sosire', d: 'Primești welcome drink-ul și te așezi la masă.' },
      { t: 'Provocările muzicale', d: 'Începem cu provocări la mese, care pornesc discuțiile.' },
      { t: 'Cântăm împreună', d: 'Versurile apar pe ecrane, microfoanele gonflabile ies la iveală și cântă toată sala.' }
    ],
    include: [
      'Acces la eveniment',
      'Welcome drink: un pahar de Prosecco',
      'DJ și MC',
      'Provocări muzicale și karaoke de grup, cu versurile pe ecrane'
    ],
    conditii: [
      'Pe lângă bilet, la Naïve este necesar pachetul de brunch, de 100 lei/persoană, achitat separat. Pachetul include un preparat la alegere și un pahar de Bellini, Mimosa sau Prosecco, pe lângă welcome drink-ul din bilet.',
      'Early Bird: 70 lei, apoi 89 lei.',
      'Ofertă de grup 4 + 1 gratis: 56 lei de persoană la Early Bird, apoi 71,20 lei de persoană.'
    ],
    extraTitlu: 'Ce poți alege din meniu',
    extra: [
      'Omletă cu toppinguri la alegere și salată de sezon',
      'Shakshuka cu ouă, sos ușor picant de ardei copt și roșii, feta și pâine crocantă',
      'Waffle sărată cu pui crispy, miere picantă și salată de castraveți',
      'English muffin cu pulled pork, cheddar și salată de castraveți',
      'English muffin cu ouă poșate, sos Hollandaise, bacon și salată de sezon',
      'Croissant cu ouă jumări, chives, cheddar și salată de sezon',
      'Gaufre cu toppinguri la alegere și fructe',
      'Pancakes cu sirop de arțar și frișcă',
      'Budincă de brioșă servită caldă, cu sos de vanilie'
    ],
    practic: [
      'Începem la 14:00, la Naïve, București.',
      'Preparatele se finalizează la stația de live cooking, de unde le ridici și te întorci la masă.'
    ],
    faq: [
      ['Ce include pachetul de brunch?', 'Un preparat la alegere din meniu și un pahar de Bellini, Mimosa sau Prosecco. Pachetul costă 100 lei/persoană și se achită separat.']
    ]
  },

  /* Treasure Hunt · Family Edition · Parcul Copiilor, Timișoara */
  '5062': {
    scurt: 'Părinții și copiii fac echipă și pornesc prin Parcul Copiilor după indicii, misiuni și probe foto. Povestea ediției: un cronometru trebuie oprit înainte ca părinții să devină copii, iar copiii adulți.',
    poveste: [
      'Căutați locuri și obiecte prin parc, descifrați indicii și rezolvați provocări în care aveți nevoie unii de ceilalți. Unele misiuni cer atenție, altele vă lasă să fiți creativi și să faceți fotografii sau filmulețe amuzante.',
      'Cei mici vin cu ideile lor, cei mari intră în joacă, iar fiecare reușită aduce puncte echipei. La final rămâneți și cu fotografiile și filmulețele făcute pe traseu.'
    ],
    pasi: [
      { t: 'Startul', d: 'Ne întâlnim la intrarea principală. Formăm echipele, explicăm regulile și primiți materialele de joc.' },
      { t: 'Traseul prin parc', d: 'Indicii de descifrat, obiecte de găsit și probe foto. Fiecare misiune rezolvată aduce puncte.' },
      { t: 'Finalul', d: 'Aflăm echipa câștigătoare. Premiul: vouchere la Beat Se7en, game room-ul cu podea LED din centrul Timișoarei.' }
    ],
    include: [
      'Participarea la joc, pentru fiecare participant cu bilet',
      'Materialele de joc și explicațiile de la start',
      'Îndrumare pe traseu din partea echipei noastre'
    ],
    conditii: [
      '60 lei pentru fiecare participant, adult sau copil.',
      'Recomandat copiilor între 5 și 14 ani.',
      'Părinții și copiii participă împreună la misiuni.',
      'Fiecare familie formează o echipă. Dacă vii singur cu copilul, vă alăturăm altei familii.'
    ],
    practic: [
      'Punct de întâlnire: Parcul Copiilor, Timișoara, intrarea principală, la ora 10:00.',
      'Încălțăminte comodă și haine potrivite vremii.',
      'Un telefon cu care să faceți fotografiile și filmulețele cerute de misiuni.'
    ]
  },

  /* Treasure Hunt · Adults Edition · Piața Unirii, Timișoara */
  '5032': {
    scurt: 'Pornești în echipă din Piața Unirii, descifrezi indicii, cauți detalii prin centrul Timișoarei și rezolvi misiuni contra cronometru. La final, indiciile adunate vă ajută să aflați codul unui cufăr încuiat.',
    poveste: [
      'Pe traseu cauți detalii pe lângă care poate ai trecut de zeci de ori și rezolvi misiuni care cer creativitate. Unele provocări sunt amuzante și au nevoie de puțin curaj și de ideile colegilor de echipă.',
      'Nu trebuie să vii cu o echipă. Formăm echipele la începutul jocului, așa că joci alături de oameni noi.'
    ],
    pasi: [
      { t: 'Startul', d: 'Ne întâlnim în Piața Unirii, lângă Domul Catolic. Formăm echipele și explicăm regulile.' },
      { t: 'Traseul', d: 'Indicii, misiuni și provocări prin centrul orașului, cu cronometrul pornit.' },
      { t: 'Cufărul', d: 'La final vă așteaptă un cufăr încuiat. Cine află primul codul?' }
    ],
    include: [
      'Participarea la joc și materialele de joc',
      'Formarea echipelor la start',
      'Premiul pentru echipa câștigătoare: vouchere de relaxare la Zen Expert – Select Massage & Spa'
    ],
    conditii: [
      '70 lei de persoană.',
      'Ofertă de grup 4 + 1 gratis: 56 lei de persoană.',
      'Eveniment pentru adulți.',
      'Poți veni singur sau cu prietenii.'
    ],
    practic: [
      'Punct de întâlnire: Piața Unirii, Timișoara, la ora 15:00.',
      'Încălțăminte comodă, haine potrivite vremii și telefonul încărcat.'
    ]
  },

  /* Treasure Hunt · Adults Edition · Piața Victoriei, București · cu Hai să Socializăm */
  '5089': {
    scurt: 'Pornim în echipe din Piața Victoriei, cu misiuni, puzzle-uri și provocări prin oraș. Printre indicii am ascuns câteva dintre destinațiile excursiilor Hai să Socializăm. La final ne strângem la o terasă și anunțăm câștigătorii.',
    poveste: [
      'Cauți locuri și obiecte, descifrezi indicii și îți folosești creativitatea. Pentru unele misiuni ai nevoie și de ajutorul unor necunoscuți, iar pe ei trebuie să-i convingi tu să intre în joc.',
      'Faci fotografii și filmări ca dovadă că ați îndeplinit misiunile, iar fiecare provocare rezolvată aduce puncte echipei. Timpul trece, așa că trebuie să decideți repede ce urmăriți mai departe.'
    ],
    pasi: [
      { t: 'Check-in, 13:45', d: 'Ne întâlnim în Piața Victoriei și formăm echipele.' },
      { t: 'Startul, 14:00', d: 'Primiți primele indicii și porniți prin oraș.' },
      { t: 'Traseul', d: 'Misiuni, puzzle-uri și probe foto-video, contra cronometru.' },
      { t: 'Finalul, la terasă', d: 'Aflăm ce s-a întâmplat pe traseu, anunțăm câștigătorii și tragem tombola.' }
    ],
    include: [
      'Participarea la joc și materialele de joc',
      'Formarea echipelor la start',
      'Premii pentru cele mai bune echipe, oferite de partenerii noștri',
      'Tombola de la final, cu excursii, bilete la evenimente și alte premii'
    ],
    conditii: [
      '120 lei de persoană.',
      'Eveniment pentru adulți.',
      'Poți veni singur, în doi sau cu prietenii. Noi formăm echipele.'
    ],
    practic: [
      'Ajungi în Piața Victoriei la 13:45, pentru check-in și formarea echipelor. Pornim la 14:00.',
      'Încălțăminte comodă și telefonul încărcat.'
    ]
  }
};
