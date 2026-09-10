# Kohtaamo 3:n 360-simulaatio

Paikallinen, yhden equirektangulaarisen 360-panoraaman oppimissovellus osioon 2 **Reitit, rytmi ja tilannetaju**.

## Käynnistäminen

Käynnistä kurssiprojektin juuressa paikallinen palvelin:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Avaa selaimessa:

```text
http://127.0.0.1:8000/content/02-reitit-ja-rytmi/simulation/
```

Suoraa `file://`-avausta ei suositella, koska selain voi estää JavaScript-moduulin tai panoraamatekstuurin lataamisen.

## Sisältö

- `index.html`: käyttöliittymä
- `style.css`: responsiivinen ja näppäimistökäyttöä tukeva ulkoasu
- `app.js`: 360-renderöinti, ohjaus, hotspotit ja etenemislogiikka
- `scene-data.js`: oppimissisältö ja hotspotien sijainnit
- `accessible.html`: tekstimuotoinen vaihtoehto
- `assets/kohtaamo3-panorama.png`: generoitu 1774 × 887 pikselin 2:1-panoraama
- `vendor/three.module.min.js` ja `vendor/three.core.min.js`: paikallinen Three.js 0.180.0
- `vendor/THREE-LICENSE.txt`: Three.js-lisenssi

## Rajaus

Panoraama on tekoälyllä tuotettu fiktiivinen harjoitustila. Simulaatio harjoittaa havaintojen perustelua, mutta sitä ei käytetä todellisen tilan turvallisuuden, saavutettavuuden tai mitoituksen arviointiin.

Hotspotien sijoittelua voi tarkistaa lisäämällä osoitteen loppuun `?debug=1` ja kaksoisnapsauttamalla panoraamaa. Näkymä näyttää ja tulostaa konsoliin yaw- ja pitch-arvot.
