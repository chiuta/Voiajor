# VOIAJOR

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

A Voyager–1 és a Voyager–2 pályájának interaktív szimulációja — az 1977-es indítástól egymilliárd évvel későbbig, a bolygóktól a Tejútrendszerig.

Verzió: 1.0.0 · Utolsó frissítés: 2026-11-06

## Mit tud

- Az idő az 1977-es indításoktól +1 milliárd évig tart. Az alkalmazás a mai dátummal, valós időben nyílik meg, a 📅 gomb pedig a múlt vagy a jövő bármely pillanatára ugrik.
- Nagyítás 1 CSE-től több tízezer fényévig, fényóra, fénynap (≈173 CSE) és fényév referenciakörökkel.
- Ballisztikus ívek (Lambert-probléma) a valós elhaladási dátumok között, majd extrapoláció a Nap gravitációjával és a helyi galaktikus dinamikával (epiciklikus / Hill-egyenletek).
- Helioszféra, Oort-felhő és 19 közeli csillag sajátmozgással, valamint a legközelebbi megközelítések táblázata.
- Egyetlen, offline HTML-fájl; a felület alkalmazkodik telefonhoz, táblagéphez és asztali géphez.

## Használat

Nyisd meg az `index.html` fájlt egy modern böngészőben — telepítés és hálózat nélkül. Online: https://chiuta.github.io/voiajor/

## Pontosság és korlátok

- A 2026. nov. 5-i pozíciók (Voyager–1 ≈172,3 CSE, Voyager–2 ≈145,1 CSE) a küldetés nyilvános adataihoz vannak igazítva, beleértve a 2026. nov. 15-i fénynap-mérföldkövet. Ezek a modell bemenő adatai, nem független ellenőrzés.
- Az elhaladásokat pontként kezeljük (illesztett kúpszeletek); nincs pályakorrekció és más égitestek gravitációja.
- A csillagkatalógus közelítő. A megközelítési távolság a sebesség pontos irányától függ: a Voyager–2 és a Szíriusz a modellben ≈6,4 fényév, az irodalomban ≈4,3 fényév; az alkalmazás mindkettőt mutatja.
- A galaktikus modell a Nap pályája körüli linearizáció: több tízmillió évre jó, néhány százmillió év fölött csak tájékoztató jellegű.
- Az adás megszűnésének időpontjai becslések, nem hivatalos előrejelzések.

## Tesztek

A `node tests/model.test.js` ellenőrzi a modellt (bolygók, elhaladások, 2026-os pozíciók, heliopauza-távolságok, sebességek, véges értékek, csillag-megközelítések).

## Licenc és köszönet

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Küldetési adatok: NASA/JPL.

Támogasd a projektet: https://buymeacoffee.com/echo.of.the.strings
