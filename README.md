# VOIAJOR

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Interactive simulation of the Voyager 1 and 2 trajectories — from launch in 1977 to a billion years from now, from the planets out to the Milky Way.

Version: 1.0.0 · Last update: 2026-11-06

## What it does

- Time runs from the 1977 launches to +1 billion years. The app opens at today's date in real time, and the 📅 button jumps to any past or future moment.
- Zoom from 1 AU to tens of thousands of light-years, with reference rings for the light-hour, the light-day (≈173 AU) and the light-year.
- Ballistic arcs (Lambert problem) between the real flyby dates, then extrapolation with solar gravity and local galactic dynamics (epicyclic / Hill equations).
- Heliosphere, Oort cloud and 19 nearby stars with proper motion, plus a table of the closest approaches.
- One offline HTML file; layout adapts to phones, tablets and desktops.

## Use

Open `index.html` in any modern browser — no installation, no network. Online: https://chiuta.github.io/voiajor/

## Accuracy and limits

- The positions of 5 Nov 2026 (Voyager 1 ≈172.3 AU, Voyager 2 ≈145.1 AU) are calibrated to the public mission figures, including the light-day milestone of 15 Nov 2026. They are model inputs, not independent validation.
- Flybys are treated as points (patched conics); no trajectory corrections or other bodies' gravity.
- The star catalog is approximate. Close-approach distances are sensitive to the exact velocity direction: Voyager 2–Sirius gives ≈6.4 ly in the model against ≈4.3 ly in the literature; the app shows both.
- The galactic model is a linearisation around the Sun's orbit: good over tens of millions of years, indicative beyond a few hundred million.
- End-of-transmission dates are estimates, not official forecasts.

## Tests

`node tests/model.test.js` checks the model (planets, flybys, 2026 positions, heliopause distances, speeds, finite values, star approaches).

## License and credits

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Mission data: NASA/JPL.

Support: https://buymeacoffee.com/echo.of.the.strings
