# VOIAJOR

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Simulation interactive des trajectoires de Voyager 1 et 2 — du lancement en 1977 jusqu'à un milliard d'années dans le futur, des planètes à la Voie lactée.

Version: 1.1.0 · Dernière mise à jour: 2026-11-06

## Ce que fait l'application

- Le temps va des lancements de 1977 à +1 milliard d'années. L'application s'ouvre à la date du jour, en temps réel, et le bouton 📅 permet de sauter à n'importe quel moment du passé ou du futur.
- Zoom de 1 UA à des dizaines de milliers d'années-lumière, avec des cercles de repère pour l'heure-lumière, le jour-lumière (≈173 UA) et l'année-lumière.
- Arcs balistiques (problème de Lambert) entre les dates réelles des survols, puis extrapolation avec la gravité du Soleil et la dynamique galactique locale (équations épicycliques / de Hill).
- Héliosphère, nuage d'Oort et 19 étoiles proches avec leur mouvement propre, ainsi qu'un tableau des approches les plus proches.
- Interface en 8 langues (EN, RO, FR, IT, ES, PT, DE, HU) : à choisir dans Options, ou en ouvrant la page avec `?lang=xx`. Le choix est mémorisé ; par défaut, la langue du navigateur.
- Un seul fichier HTML hors ligne ; l'interface s'adapte aux téléphones, tablettes et ordinateurs.

## Utilisation

Ouvrez `index.html` dans un navigateur récent — sans installation ni réseau. En ligne : https://voiajor.chiuta.ro/

## Précision et limites

- Les positions du 5 nov. 2026 (Voyager 1 ≈172,3 UA, Voyager 2 ≈145,1 UA) sont calibrées sur les chiffres publics de la mission, y compris le jalon du jour-lumière du 15 nov. 2026. Ce sont des données d'entrée du modèle, non une validation indépendante.
- Les survols sont traités comme des points (coniques raccordées) ; pas de corrections de trajectoire ni de gravité d'autres corps.
- Le catalogue d'étoiles est approximatif. Les distances d'approche dépendent de la direction exacte de la vitesse : Voyager 2–Sirius donne ≈6,4 a.l. dans le modèle contre ≈4,3 a.l. dans la littérature ; l'application affiche les deux.
- Le modèle galactique est une linéarisation autour de l'orbite du Soleil : fiable sur des dizaines de millions d'années, indicatif au-delà de quelques centaines de millions.
- Les dates de fin de transmission sont des estimations, pas des prévisions officielles.

## Tests

`node tests/model.test.js` vérifie le modèle (planètes, survols, positions 2026, distances à l'héliopause, vitesses, valeurs finies, approches d'étoiles). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## Licence et crédits

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Données de mission : NASA/JPL.

Soutenir le projet : https://buymeacoffee.com/echo.of.the.strings
