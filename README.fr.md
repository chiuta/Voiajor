# VOIAJOR

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Simulation interactive des trajectoires de Voyager 1 et 2 — du lancement en 1977 jusqu'à un milliard d'années dans le futur, des planètes à la Voie lactée.

Version: 1.2.1 · Dernière mise à jour: 2026-11-14

## Ce que fait l'application

- Le temps court des lancements de 1977 jusqu'à +10¹⁰⁰ ans — la fin des temps, quand les étoiles ont disparu et que la matière se défait, mais que Voyager résiste (par hypothèse). L'app s'ouvre à la date du jour, en temps réel, et le bouton 📅 saute à n'importe quel moment du passé ou du futur.
- Visite guidée (20 étapes, du lancement à la fin des temps), compte à rebours en direct jusqu'au premier jour-lumière de Voyager 1 (NASA : 18 nov. 2026, 10 h 16 UTC) avec animation du signal radio, et analogies d'échelle pour la distance actuelle.
- Zoom de 1 UA à des dizaines de milliers d'années-lumière, avec des cercles de repère pour l'heure-lumière, le jour-lumière (≈173 UA) et l'année-lumière.
- Arcs balistiques (problème de Lambert) entre les dates réelles des survols, puis extrapolation avec la gravité du Soleil et la dynamique galactique locale (équations épicycliques / de Hill).
- Héliosphère, nuage d'Oort et 19 étoiles proches avec leur mouvement propre, ainsi qu'un tableau des approches les plus proches.
- Interface en 8 langues (EN, RO, FR, IT, ES, PT, DE, HU) : à choisir dans Options, ou en ouvrant la page avec `?lang=xx`. Le choix est mémorisé ; par défaut, la langue du navigateur.
- Un seul fichier HTML hors ligne ; l'interface s'adapte aux téléphones, tablettes et ordinateurs.

## Utilisation

Ouvrez `index.html` dans un navigateur récent — sans installation ni réseau. En ligne : https://voiajor.chiuta.ro/

## Précision et limites

- Les positions du 5 nov. 2026 (Voyager 1 ≈172,3 UA, Voyager 2 ≈145,1 UA) sont calibrées sur les chiffres publics de la mission, pour le premier jour-lumière (18 nov. 2026, 10 h 16 UTC, annoncé par la NASA ; la trajectoire de Voyager 1 y est ajustée). Ce sont des données d'entrée du modèle, non une validation indépendante.
- Les survols sont traités comme des points (coniques raccordées) ; pas de corrections de trajectoire ni de gravité d'autres corps.
- Le catalogue d'étoiles est approximatif. Les distances d'approche dépendent de la direction exacte de la vitesse : Voyager 2–Sirius donne ≈6,4 a.l. dans le modèle contre ≈4,3 a.l. dans la littérature ; l'application affiche les deux.
- Le modèle galactique est une linéarisation autour de l'orbite du Soleil : fiable sur des dizaines de millions d'années, indicatif au-delà de quelques centaines de millions.
- Au-delà de quelques milliards d'années, les trajectoires sont illustratives : les sondes sont supposées indestructibles, la Galaxie s'évapore vers 10¹⁹ ans et l'expansion cosmique les arrête à quelques millions d'al.
- Les dates de fin de transmission sont des estimations, pas des prévisions officielles.

## Tests

`node tests/model.test.js` vérifie le modèle (planètes, survols, positions 2026, distances à l'héliopause, vitesses, valeurs finies, approches d'étoiles). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## Licence et crédits

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Données de mission : NASA/JPL.

Soutenir le projet : https://buymeacoffee.com/echo.of.the.strings
