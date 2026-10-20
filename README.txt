SUSPECȚI — export static, gata de pus pe hosting (Megahost)
=============================================================

Ce este acest folder
---------------------
Conține cele 15 pagini ale site-ului SUSPECȚI, convertite din formatul intern
de design (Claude) în fișiere HTML/CSS/JS simple, standard — fără nicio
dependență de instrumentul de design folosit la realizarea machetei. Poți
deschide direct orice fișier .html într-un browser ca să vezi rezultatul, îl
poți pune direct pe hosting (vezi mai jos) sau îl poți preda unui dezvoltator
/ îl poți încărca în Lovable.

Actualizat pe 18 octombrie 2026: include restaurarea badge-ului din hero
(„EXPERIENȚE INTERACTIVE" + subtitlul), textul nou de dress code de pe
Cina.html și cele trei reparații de linkuri (WhatsApp pe Private.html se
deschide acum într-un tab nou, checkbox-ul GDPR de pe Main.html duce corect
la pagina de Confidențialitate, linkul mort „Politica foto-video" a fost
scos din footer-ul de pe Acasa.html).

Cum îl pui pe suspectilacina.com, prin Megahost
-------------------------------------------------
1. Intră în contul tău de Megahost și deschide panoul de control al
   hostingului (cPanel sau similar).
2. Deschide „File Manager" și navighează în folderul public_html (acolo
   trebuie să ajungă fișierele site-ului; dacă vezi fișiere vechi acolo de
   la o încercare anterioară, mută-le deoparte sau șterge-le întâi).
3. Încarcă tot conținutul acestui folder (toate fișierele .html, folderul
   images/ și acest README) direct în public_html, păstrând structura
   exact așa cum e — nu pune totul într-un subfolder suplimentar.
   Dacă File Manager are opțiune de „Upload" pentru o arhivă .zip, cel mai
   simplu e să încarci arhiva și apoi să dai „Extract" direct în
   public_html.
4. Pagina principală e deja inclusă de două ori, ca index.html și ca
   Acasa.html (conținut identic) — exact ca să nu trebuiască să redenumești
   nimic. Când cineva intră pe suspectilacina.com, hostingul va încărca
   automat index.html.
5. Poți folosi și FTP (FileZilla sau alt client), cu aceiași pași: te
   conectezi cu datele de FTP din contul de Megahost și încarci totul în
   public_html.
6. Dacă domeniul a fost cumpărat recent sau ai schimbat ceva la DNS,
   așteaptă până la câteva ore să se propage, apoi verifică
   suspectilacina.com într-o fereastră incognito.

Ce funcționează deja
---------------------
Interactivitatea reală a fost reconstruită cu JavaScript simplu, nu doar
"îngheța" pe starea implicită:
- meniul mobil (hamburger) din header;
- acordeoanele de întrebări frecvente (FAQ) de pe Cina.html și Main.html;
- filtrul de oraș și tematică de pe Calendar.html (actualizează lista de
  evenimente și numărul de ediții afișate);
- filtrul de oraș de pe Acasa.html;
- tab-urile de format și galeria foto cu carusel (săgeți, puncte, glisare pe
  mobil) de pe Main.html;
- butoanele de sunet de pe cele patru video-uri din hero (Acasa, Brunch,
  Party, TreasureHunt);
- formularele de preînscriere / cerere de ofertă (Automachiaj, Brunch, Party,
  Povesti, PrimaVedere, Private, TreasureHunt, Calendar, Cina, Main) — la
  trimitere, formularul se validează și afișează mesajul de confirmare, exact
  ca în macheta originală;
- pe Main.html, formularul "Cerere de ofertă" generează, la trimitere, un
  rezumat text și linkuri reale către WhatsApp și email, cu toate datele
  completate.

Fără server, fără bază de date
---------------------------------
Acest export e un site 100% static (doar HTML/CSS/JS), fără server și fără
bază de date în spate. Asta înseamnă:
- cumpărarea biletelor se face exact ca acum, prin linkurile externe către
  AmBilet, nu printr-un sistem propriu de plată;
- formularele de preînscriere („Anunță-mă”, „Vreau să fiu anunțat”, „Mă
  preînscriu”) trimit datele în Google Form-ul „Preînscriere SUSPECȚI”;
  răspunsurile se văd în Google Forms, la tab-ul Răspunsuri;
- cererile de ofertă (Main.html, Private.html) și abonările la noutăți
  („Mă abonez”) ajung pe email la contact@suspectilacina.com, prin serviciul
  gratuit FormSubmit.co (prima trimitere cere o confirmare unică pe email);
- totul e configurat în fișierul forms.js.

Important — datele "fixe" din calendar
------------------------------------------
În macheta originală, anumite conținuturi erau controlate din panoul de
editare (de exemplu: dacă o ediție are sau nu dată stabilită, lista de
evenimente din calendar, câte întrebări sunt deschise implicit la FAQ etc.).
În acest export static, acele valori au fost transformate în conținut fix,
scris direct în HTML/JavaScript (cu valorile implicite din machetă, la data
exportului). Asta înseamnă că, de acum, orice modificare de conținut (o
ediție nouă în calendar, un preț schimbat, un text de buton etc.) se face
direct în codul HTML/JavaScript al paginii respective, nu dintr-un panou
vizual — pentru cineva fără cunoștințe tehnice, va fi nevoie de ajutorul unui
dezvoltator (sau al Lovable / AI).

Evenimentele din Calendar.html și Acasa.html, de exemplu, sunt scrise ca o
listă (array) în interiorul fișierului, în JavaScript — oricine poate edita
acea listă pentru a adăuga/schimba/șterge o ediție, dar e nevoie de atenție
la formatul datelor (JSON).

Imaginile
---------
Toate imaginile folosite în site sunt în folderul "images/", cu nume formate
dintr-un cod (id-ul original al fiecărei imagini) + extensia corectă
(.jpg/.webp). Fiecare pagină HTML face referire la aceste imagini prin căi
relative (de exemplu: images/abcd1234.jpg).

FOARTE IMPORTANT: folderul "images/" trebuie să rămână alături de fișierele
.html, cu exact această structură de foldere, inclusiv pe hosting. Dacă muți
fișierele .html fără folderul "images/", pozele nu se vor mai încărca.

Fonturile (Google Fonts — Playfair Display, Great Vibes, Manrope) sunt
încărcate online, exact ca în original, printr-un link către Google Fonts,
deci ai nevoie de conexiune la internet pentru ca paginile să arate exact ca
în machetă (altfel browserul va folosi un font de rezervă, similar).

Lista completă a paginilor
----------------------------
Adresele de pe site sunt curate, fără .html (setate în vercel.json):
/ (index.html), /calendar (calendar.html), /calendar/bucuresti și
/calendar/timisoara (aceeași pagină, filtrată pe oraș), /cina, /party,
/treasurehunt, /brunch, /primavedere, /automachiaj, /povesti, /corporate
(corporate.html, pagina pentru companii), /private, /despre, /intrebari,
/termeni, /confidentialitate. Adresele vechi (ex. /Main.html) redirecționează
automat spre cele noi.

Recomandare
-----------
Dacă vrei ca site-ul să rămână ușor de editat chiar și de tine, fără cod
(calendar, formulare conectate real, imagini schimbate din panou), varianta
cealaltă e să duci acest folder în Lovable și să ceri reconstruirea lui ca
proiect editabil acolo, conectat la o bază de date reală — nu e obligatoriu,
dar e o variantă de luat în calcul pe termen lung.

Bilete — white label AmBilet (bilete.suspectilacina.com)
--------------------------------------------------------
Biletele se cumpără prin white label-ul AmBilet, găzduit pe Megahost (Apache + PHP,
subdomeniul bilete.suspectilacina.com). Plata propriu-zisă are loc pe ambilet.ro
(ambilet.ro/plata/...), după care clientul revine pe bilete.suspectilacina.com/multumim.
Fișierele white label NU sunt în acest proiect (conțin cheia API); copia de lucru
este în „Suspecti app/bilete-wl”.

REGULA pentru butoanele „Cumpără bilet” (aplicată automat de bilete.js):
- fiecare ediție are în events.js linkul ei AmBilet, de forma
  https://www.ambilet.ro/bilete/<slug>-<ID>   (ID = identificatorul unic AmBilet)
- bilete.js îl transformă în https://bilete.suspectilacina.com/<slug>-<ID>
  (același slug, același ID → aceeași ediție, dată și oraș)
- edițiile noi apar automat din sincronizare (vezi mai jos); un link copiat manual
  de pe AmBilet (în pagină sau în lista de rezervă din events.js) e transformat la fel.
- comutatorul este SUSPECTI_BILETE.activ în bilete.js (false = linkurile rămân pe ambilet.ro).

Aspectul paginilor de bilete (bilete.suspectilacina.com) copiază site-ul: antetul și subsolul sunt
în includes/site-header.php și includes/footer.php, culorile în assets/css/suspecti.css.
Video-ul și pozele „Din edițiile anterioare” de pe pagina fiecărui eveniment se aleg după concept
(din numele evenimentului) în includes/media.php și se încarcă direct de pe www.suspectilacina.com
(/images, /videos) — dacă schimbi o poză aici, păstreaz-o și acolo.
Copie a fișierelor dinainte de schimbarea aspectului: /home/suspecti/bilete.suspectilacina.com/_backup-2026-10-20/.

Sincronizarea automată a evenimentelor din AmBilet
--------------------------------------------------
Ce face: la fiecare 15 minute, un cron pe Megahost citește evenimentele publicate ale
organizatorului (SOLEX SUPPLY SRL) din API-ul folosit de white label (aceeași cheie, care
rămâne doar pe server) și publică rezultatul la
  https://bilete.suspectilacina.com/sync/events.js     (citit de calendar și pagini)
  https://bilete.suspectilacina.com/sync/status.json   (ultima rulare, ciorne, erori)
Site-ul nu trebuie republicat pentru evenimente noi sau modificate.

Unde e pe server (Megahost, contul cPanel „suspecti”):
- script:  /home/suspecti/ambilet-sync/sync.php   (copie locală: „Suspecti app/ambilet-sync”)
- stare:   /home/suspecti/ambilet-sync/state.json (ID AmBilet → adresa paginii, fixată la prima apariție)
- jurnal:  /home/suspecti/ambilet-sync/logs/sync-AAAA-LL.log (o linie „OK | ...” sau „EROARE | ...” pe rulare)
- cron:    */15 * * * * /usr/local/bin/php -q /home/suspecti/ambilet-sync/sync.php
De ce 15 minute: limita API este 60 de cereri/minut; o rulare face ~1 + câte o cerere
pe eveniment, deci rămâne cu mult sub limită.

Reguli:
- ID-ul unic este numărul de la finalul slug-ului AmBilet (ex. ...-5044) → fără duplicate;
  adresa paginii nu se schimbă nici dacă titlul se modifică în AmBilet.
- Conceptul se recunoaște din titlu (Cină, Brunch, Party, Treasure Hunt); altfel pagina
  generică /eveniment/<slug> (cu descrierea din AmBilet).
- Stări: activ, reprogramat (se vând bilete), epuizat, anulat (pagina rămâne, fără
  „Cumpără bilet”, cu mesaj). Retrase din AmBilet / încheiate → dispar de pe site.
- Incomplete (lipsă titlu, dată, oră, oraș, locație, imagine, link sau preț) → NU se publică;
  apar ca ciorne în status.json, la „drafts”, cu lista „missing”. Nu se completează nimic inventat.
- Ajustările editoriale (titlu scurt, poză, tematică, preț cu termen, mențiuni, ascundere)
  se fac în evenimente-editorial.js, după ID; sincronizarea nu le suprascrie niciodată.
- Dacă API-ul nu răspunde, rămâne ultima variantă bună publicată, iar status.json are ok:false.
  Dacă sync/events.js nu se încarcă deloc, site-ul folosește lista de rezervă din events.js.

Re-rulare manuală (cPanel → Terminal, sau o comandă cron temporară):
  /usr/local/bin/php /home/suspecti/ambilet-sync/sync.php
Test fără efect pe site (scrie în ambilet-sync/test-output/, cu evenimente fictive):
  /usr/local/bin/php /home/suspecti/ambilet-sync/sync.php --test
