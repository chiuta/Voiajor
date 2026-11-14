# VOIAJOR

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Interactive simulation of the Voyager 1 and 2 trajectories — from launch in 1977 to a billion years from now, from the planets out to the Milky Way.

Version: 1.2.0 · Last update: 2026-11-14

## What it does

- Time runs from the 1977 launches to +10¹⁰⁰ years — the end of time, when the stars are gone and matter falls apart, but Voyager endures (by assumption). The app opens at today's date in real time, and the 📅 button jumps to any past or future moment.
- A guided tour (16 stops from the launch to the end of time), a live countdown to Voyager 1's first light-day (NASA: 18 Nov 2026, 10:16 UTC) with a radio-signal animation, and scale analogies for the current distance.
- Zoom from 1 AU to tens of thousands of light-years, with reference rings for the light-hour, the light-day (≈173 AU) and the light-year.
- Ballistic arcs (Lambert problem) between the real flyby dates, then extrapolation with solar gravity and local galactic dynamics (epicyclic / Hill equations).
- Heliosphere, Oort cloud and 19 nearby stars with proper motion, plus a table of the closest approaches.
- Interface in 8 languages (EN, RO, FR, IT, ES, PT, DE, HU): pick it in Options, or open the page with `?lang=xx`. The choice is remembered; the default follows the browser language.
- One offline HTML file; layout adapts to phones, tablets and desktops.

## Use

Open `index.html` in any modern browser — no installation, no network. Online: https://voiajor.chiuta.ro/

## Accuracy and limits

- The positions of 5 Nov 2026 (Voyager 1 ≈172.3 AU, Voyager 2 ≈145.1 AU) are calibrated to the public mission figures, for the first light-day (the model gives 15 Nov 2026; NASA announced 18 Nov 2026, 10:16 UTC). They are model inputs, not independent validation.
- Flybys are treated as points (patched conics); no trajectory corrections or other bodies' gravity.
- The star catalog is approximate. Close-approach distances are sensitive to the exact velocity direction: Voyager 2–Sirius gives ≈6.4 ly in the model against ≈4.3 ly in the literature; the app shows both.
- The galactic model is a linearisation around the Sun's orbit: good over tens of millions of years, indicative beyond a few hundred million.
- Beyond a few billion years the paths are illustrative: the probes are assumed indestructible, the Galaxy evaporates at ≈10¹⁹ years, and cosmic expansion halts them a few million ly out.
- End-of-transmission dates are estimates, not official forecasts.

## Tests

`node tests/model.test.js` checks the model (planets, flybys, 2026 positions, heliopause distances, speeds, finite values, star approaches). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## License and credits

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Mission data: NASA/JPL.

Support: https://buymeacoffee.com/echo.of.the.strings
