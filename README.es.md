# VOIAJOR

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Simulación interactiva de las trayectorias de Voyager 1 y 2 — desde el lanzamiento en 1977 hasta dentro de mil millones de años, de los planetas a la Vía Láctea.

Versión: 1.1.6 · Última actualización: 2026-11-13

## Qué hace

- El tiempo va de los lanzamientos de 1977 a +1000 millones de años. La aplicación se abre en la fecha de hoy, en tiempo real, y el botón 📅 salta a cualquier momento del pasado o del futuro.
- Zoom desde 1 UA hasta decenas de miles de años luz, con círculos de referencia para la hora luz, el día luz (≈173 UA) y el año luz.
- Arcos balísticos (problema de Lambert) entre las fechas reales de los sobrevuelos y después extrapolación con la gravedad del Sol y la dinámica galáctica local (ecuaciones epicíclicas / de Hill).
- Heliosfera, nube de Oort y 19 estrellas cercanas con movimiento propio, más una tabla de las aproximaciones más cercanas.
- Interfaz en 8 idiomas (EN, RO, FR, IT, ES, PT, DE, HU): se elige en Opciones o abriendo la página con `?lang=xx`. La elección se recuerda; por defecto se usa el idioma del navegador.
- Un solo archivo HTML sin conexión; la interfaz se adapta a teléfonos, tabletas y ordenadores.

## Uso

Abre `index.html` en un navegador moderno — sin instalación ni red. En línea: https://voiajor.chiuta.ro/

## Precisión y límites

- Las posiciones del 5 nov. 2026 (Voyager 1 ≈172,3 UA, Voyager 2 ≈145,1 UA) están calibradas con las cifras públicas de la misión, incluido el hito del día luz del 15 nov. 2026. Son datos de entrada del modelo, no una validación independiente.
- Los sobrevuelos se tratan como puntos (cónicas empalmadas); sin correcciones de trayectoria ni gravedad de otros cuerpos.
- El catálogo estelar es aproximado. Las distancias de aproximación dependen de la dirección exacta de la velocidad: Voyager 2–Sirio da ≈6,4 a.l. en el modelo frente a ≈4,3 a.l. en la literatura; la aplicación muestra ambos.
- El modelo galáctico es una linealización alrededor de la órbita del Sol: bueno durante decenas de millones de años, orientativo más allá de unos cientos de millones.
- Las fechas del fin de la transmisión son estimaciones, no previsiones oficiales.

## Pruebas

`node tests/model.test.js` verifica el modelo (planetas, sobrevuelos, posiciones de 2026, distancias a la heliopausa, velocidades, valores finitos, aproximaciones a estrellas). Translations live in `i18n/*.json` (`python3 tools/build-i18n.py` embeds them, `python3 tools/check-i18n.py` validates them, `node tests/i18n-e2e.js index.html` checks all languages and screen sizes).

## Licencia y créditos

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Datos de la misión: NASA/JPL.

Apoya el proyecto: https://buymeacoffee.com/echo.of.the.strings
