# VOIAJOR

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

A Voyager–1 és a Voyager–2 pályájának interaktív szimulációja — az 1977-es indítástól egymilliárd évvel későbbig, a bolygóktól a Tejútrendszerig.

Verzió: 1.2.1 · Utolsó frissítés: 2026-11-14

## Mit tud

- Az idő az 1977-es indításoktól +10¹⁰⁰ évig telik — az idők végéig, amikor a csillagok eltűntek és az anyag szétesik, de a Voyager (feltevés szerint) kitart. Az app a mai dátummal nyílik valós időben, a 📅 gomb bármely múltbeli vagy jövőbeli pillanatra ugrik.
- Vezetett túra (20 állomás az indítástól az idők végéig), élő visszaszámlálás a Voyager 1 első fénynapjáig (NASA: 2026. nov. 18., 10:16 UTC) rádiójel-animációval és léptékanalógiákkal a jelenlegi távolsághoz.
- Nagyítás 1 CSE-től több tízezer fényévig, fényóra, fénynap (≈173 CSE) és fényév referenciakörökkel.
- Ballisztikus ívek (Lambert-probléma) a valós elhaladási dátumok között, majd extrapoláció a Nap gravitációjával és a helyi galaktikus dinamikával (epiciklikus / Hill-egyenletek).
- Helioszféra, Oort-felhő és 19 közeli csillag sajátmozgással, valamint a legközelebbi megközelítések táblázata.
- Felület 8 nyelven (EN, RO, FR, IT, ES, PT, DE, HU): a Beállításokban választható, vagy az oldal `?lang=xx` címmel való megnyitásával. A választás megmarad; alapértelmezés a böngésző nyelve.
- Egyetlen, offline HTML-fájl; a felület alkalmazkodik telefonhoz, táblagéphez és asztali géphez.

## Használat

Nyisd meg az `index.html` fájlt egy modern böngészőben — telepítés és hálózat nélkül. Online: https://voiajor.chiuta.ro/

## Pontosság és korlátok

- A 2026. nov. 5-i pozíciók (Voyager–1 ≈172,3 CSE, Voyager–2 ≈145,1 CSE) a küldetés nyilvános adataihoz vannak igazítva, az első fénynapra (2026. nov. 18., 10:16 UTC, a NASA bejelentése szerint; a Voyager 1 pályája erre van hangolva). Ezek a modell bemenő adatai, nem független ellenőrzés.
- Az elhaladásokat pontként kezeljük (illesztett kúpszeletek); nincs pályakorrekció és más égitestek gravitációja.
- A csillagkatalógus közelítő. A megközelítési távolság a sebesség pontos irányától függ: a Voyager–2 és a Szíriusz a modellben ≈6,4 fényév, az irodalomban ≈4,3 fényév; az alkalmazás mindkettőt mutatja.
- A galaktikus modell a Nap pályája körüli linearizáció: több tízmillió évre jó, néhány százmillió év fölött csak tájékoztató jellegű.
- Néhány milliárd éven túl a pályák szemléltetők: a szondákat elpusztíthatatlannak tételezzük fel, a Galaxis ≈10¹⁹ év körül elpárolog, a kozmikus tágulás pedig néhány millió fényévnél megállítja őket.
- Az adás megszűnésének időpontjai becslések, nem hivatalos előrejelzések.

## Tesztek

A `node tests/model.test.js` ellenőrzi a modellt (bolygók, elhaladások, 2026-os pozíciók, heliopauza-távolságok, sebességek, véges értékek, csillag-megközelítések). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## Licenc és köszönet

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Küldetési adatok: NASA/JPL.

Támogasd a projektet: https://buymeacoffee.com/echo.of.the.strings
