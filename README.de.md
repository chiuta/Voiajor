# VOIAJOR

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Magyar](README.hu.md)

Interaktive Simulation der Bahnen von Voyager 1 und 2 — vom Start 1977 bis in eine Milliarde Jahre Zukunft, von den Planeten bis zur Milchstraße.

Version: 1.1.4 · Letzte Aktualisierung: 2026-11-10

## Was die App macht

- Die Zeit reicht von den Starts 1977 bis +1 Milliarde Jahre. Die App öffnet sich mit dem heutigen Datum in Echtzeit; die Schaltfläche 📅 springt zu jedem Zeitpunkt in Vergangenheit oder Zukunft.
- Zoom von 1 AE bis zu Zehntausenden Lichtjahren, mit Referenzkreisen für Lichtstunde, Lichttag (≈173 AE) und Lichtjahr.
- Ballistische Bögen (Lambert-Problem) zwischen den realen Vorbeiflugdaten, danach Extrapolation mit der Sonnengravitation und der lokalen galaktischen Dynamik (epizyklische / Hill-Gleichungen).
- Heliosphäre, Oortsche Wolke und 19 nahe Sterne mit Eigenbewegung sowie eine Tabelle der größten Annäherungen.
- Oberfläche in 8 Sprachen (EN, RO, FR, IT, ES, PT, DE, HU): Auswahl unter Optionen oder durch Öffnen der Seite mit `?lang=xx`. Die Wahl wird gespeichert; standardmäßig gilt die Browsersprache.
- Eine einzige HTML-Datei, offline nutzbar; die Oberfläche passt sich Smartphones, Tablets und Desktops an.

## Nutzung

`index.html` in einem aktuellen Browser öffnen — ohne Installation und ohne Netzwerk. Online: https://voiajor.chiuta.ro/

## Genauigkeit und Grenzen

- Die Positionen vom 5. Nov. 2026 (Voyager 1 ≈172,3 AE, Voyager 2 ≈145,1 AE) sind auf die öffentlichen Missionszahlen kalibriert, einschließlich des Lichttag-Meilensteins vom 15. Nov. 2026. Sie sind Eingabedaten des Modells, keine unabhängige Validierung.
- Vorbeiflüge werden als Punkte behandelt (angeschlossene Kegelschnitte); keine Bahnkorrekturen und keine Gravitation anderer Körper.
- Der Sternkatalog ist näherungsweise. Annäherungsabstände hängen von der genauen Geschwindigkeitsrichtung ab: Voyager 2–Sirius ergibt im Modell ≈6,4 Lj gegenüber ≈4,3 Lj in der Literatur; die App zeigt beide Werte.
- Das galaktische Modell ist eine Linearisierung um die Sonnenbahn: gut über Zehnermillionen Jahre, ab einigen Hundert Millionen Jahren nur Richtwert.
- Die Daten zum Ende der Übertragung sind Schätzungen, keine offiziellen Prognosen.

## Tests

`node tests/model.test.js` prüft das Modell (Planeten, Vorbeiflüge, Positionen 2026, Heliopausen-Abstände, Geschwindigkeiten, endliche Werte, Sternannäherungen). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## Lizenz und Nachweise

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Missionsdaten: NASA/JPL.

Das Projekt unterstützen: https://buymeacoffee.com/echo.of.the.strings
