# VOIAJOR

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Simulare interactivă a traseelor Voyager 1 și 2 — de la lansarea din 1977 până peste un miliard de ani, de la planete până în Calea Lactee.

Versiune: 1.1.0 · Ultima actualizare: 2026-11-06

## Ce face

- Timpul curge de la lansările din 1977 până la +1 miliard de ani. Aplicația se deschide la data de azi, în timp real, iar butonul 📅 sare la orice moment din trecut sau viitor.
- Zoom de la 1 UA la zeci de mii de ani-lumină, cu cercuri de referință pentru ora-lumină, ziua-lumină (≈173 UA) și anul-lumină.
- Arce balistice (problema Lambert) între datele reale ale zborurilor, apoi extrapolare cu gravitația Soarelui și dinamica galactică locală (ecuațiile epiciclice / Hill).
- Heliosferă, Norul Oort și 19 stele apropiate cu mișcare proprie, plus un tabel al celor mai mici apropieri.
- Interfață în 8 limbi (EN, RO, FR, IT, ES, PT, DE, HU): se alege din Opțiuni sau deschizând pagina cu `?lang=xx`. Alegerea se reține; implicit se folosește limba browserului.
- Un singur fișier HTML, offline; interfața se adaptează la telefon, tabletă și desktop.

## Utilizare

Deschide `index.html` în orice browser modern — fără instalare, fără rețea. Online: https://chiuta.github.io/voiajor/

## Precizie și limite

- Pozițiile din 5 nov. 2026 (Voyager 1 ≈172,3 UA, Voyager 2 ≈145,1 UA) sunt calibrate după cifrele publice ale misiunii, inclusiv reperul zilei-lumină din 15 nov. 2026. Sunt date de intrare ale modelului, nu o validare independentă.
- Zborurile pe lângă planete sunt tratate ca puncte (conice îmbinate); fără corecții de traiectorie și fără gravitația altor corpuri.
- Catalogul de stele este aproximativ. Distanțele de apropiere depind de direcția exactă a vitezei: Voyager 2–Sirius dă ≈6,4 a.l. în model față de ≈4,3 a.l. în literatură; aplicația le arată pe amândouă.
- Modelul galactic este o liniarizare în jurul orbitei Soarelui: bun pe zeci de milioane de ani, orientativ după câteva sute de milioane.
- Datările despre sfârșitul transmisiei sunt estimări, nu previziuni oficiale.

## Teste

`node tests/model.test.js` verifică modelul (planete, zboruri, poziții 2026, distanțe la heliopauză, viteze, valori finite, apropieri de stele). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## Licență și credite

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Date despre misiune: NASA/JPL.

Susține proiectul: https://buymeacoffee.com/echo.of.the.strings
