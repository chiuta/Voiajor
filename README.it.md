# VOIAJOR

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Simulazione interattiva delle traiettorie di Voyager 1 e 2 — dal lancio del 1977 a un miliardo di anni nel futuro, dai pianeti alla Via Lattea.

Versione: 1.0.0 · Ultimo aggiornamento: 2026-11-06

## Cosa fa

- Il tempo scorre dai lanci del 1977 a +1 miliardo di anni. L'app si apre alla data di oggi, in tempo reale, e il pulsante 📅 salta a qualsiasi momento del passato o del futuro.
- Zoom da 1 UA a decine di migliaia di anni luce, con cerchi di riferimento per l'ora luce, il giorno luce (≈173 UA) e l'anno luce.
- Archi balistici (problema di Lambert) tra le date reali dei sorvoli, poi estrapolazione con la gravità del Sole e la dinamica galattica locale (equazioni epicicliche / di Hill).
- Eliosfera, nube di Oort e 19 stelle vicine con moto proprio, più una tabella dei passaggi più ravvicinati.
- Un solo file HTML offline; l'interfaccia si adatta a telefoni, tablet e desktop.

## Uso

Apri `index.html` in un browser moderno — senza installazione né rete. Online: https://chiuta.github.io/voiajor/

## Precisione e limiti

- Le posizioni del 5 nov. 2026 (Voyager 1 ≈172,3 UA, Voyager 2 ≈145,1 UA) sono calibrate sulle cifre pubbliche della missione, compresa la tappa del giorno luce del 15 nov. 2026. Sono dati di ingresso del modello, non una convalida indipendente.
- I sorvoli sono trattati come punti (coniche raccordate); nessuna correzione di traiettoria né gravità di altri corpi.
- Il catalogo stellare è approssimativo. Le distanze di avvicinamento dipendono dalla direzione esatta della velocità: Voyager 2–Sirio dà ≈6,4 a.l. nel modello contro ≈4,3 a.l. in letteratura; l'app mostra entrambi i valori.
- Il modello galattico è una linearizzazione attorno all'orbita del Sole: buono su decine di milioni di anni, indicativo oltre qualche centinaio di milioni.
- Le date della fine delle trasmissioni sono stime, non previsioni ufficiali.

## Test

`node tests/model.test.js` verifica il modello (pianeti, sorvoli, posizioni 2026, distanze all'eliopausa, velocità, valori finiti, avvicinamenti a stelle).

## Licenza e crediti

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Dati della missione: NASA/JPL.

Sostieni il progetto: https://buymeacoffee.com/echo.of.the.strings
