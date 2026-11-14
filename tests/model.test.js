// Verificări numerice ale modelului VOIAJOR (fără dependențe): node tests/model.test.js
'use strict';
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const src = html.match(/\/\*MODEL-START\*\/([\s\S]*?)\/\*MODEL-END\*\//)[1];
const M = eval(src + ';M');
const [V1, V2] = M.VOY;
const LY = M.LY_AU;
let fail = 0, ok = 0;
function check(name, cond, info) {
  if (cond) { ok++; console.log('  ok   ' + name + (info ? '  [' + info + ']' : '')); }
  else { fail++; console.log('  FAIL ' + name + (info ? '  [' + info + ']' : '')); }
}
const near = (a, b, tol) => Math.abs(a - b) <= tol;
const year = t => 2000 + t;
const sub = M.sub, norm = M.norm;

console.log('Planete');
const e1 = norm(M.planetPos(2, M.T(2026, 1, 3))), e7 = norm(M.planetPos(2, M.T(2026, 7, 6)));
check('Pământ la periheliu (~0,983 UA, ian.)', near(e1, 0.9833, 0.002), e1.toFixed(4));
check('Pământ la afeliu (~1,017 UA, iul.)', near(e7, 1.0167, 0.002), e7.toFixed(4));
const eq = M.planetPos(2, M.T(2026, 3, 20, 14.5));
const lon = (Math.atan2(eq[1], eq[0]) * 180 / Math.PI + 360) % 360;
check('Longitudinea Pământului la echinocțiul de martie ≈ 180°', near(lon, 180, 1), lon.toFixed(2));

console.log('Zboruri pe lângă planete');
for (const V of M.VOY) {
  V.enc.forEach(x => {
    const d = norm(sub(M.voyPos(V, x.t), M.planetPos(x.pl, x.t)));
    check(V.name + ' ajunge la planeta ' + x.pl + ' la data zborului', d < 1e-6, d.toExponential(1) + ' UA');
  });
  check(V.name + ': toate segmentele sunt arce balistice (Lambert)', V.segs.every(s => s.f.ballistic));
  let mx = 0, prev = M.voyPos(V, V.launch);
  for (let t = V.launch; t <= M.TAU0; t += 0.5 / 365.25) {
    const p = M.voyPos(V, t); mx = Math.max(mx, norm(sub(p, prev)) * 730.5 / M.KMS); prev = p;
  }
  check(V.name + ': viteza heliocentrică maximă sub 45 km/s', mx < 45, mx.toFixed(1) + ' km/s');
}

console.log('Poziția din 5 nov. 2026');
check('Voyager 1 la ≈172,3 UA de Soare', near(norm(V1.p0), 172.3, 0.05), norm(V1.p0).toFixed(2));
check('Voyager 2 la ≈145,1 UA de Soare', near(norm(V2.p0), 145.1, 0.05), norm(V2.p0).toFixed(2));
const ld = norm(sub(M.voyPos(V1, M.T(2026, 11, 18.4)), M.planetPos(2, M.T(2026, 11, 18.4))));
check('Voyager 1 la 1 zi-lumină (173,14 UA) de Pământ în jur de 18 nov. 2026', near(ld, M.LD_AU, 0.1), ld.toFixed(2));
check('Viteza Voyager 1 ≈ 16,9 km/s', near(M.voySpeed(V1, M.TAU0), 16.9, 0.15), M.voySpeed(V1, M.TAU0).toFixed(2));
check('Viteza Voyager 2 ≈ 15,2 km/s', near(M.voySpeed(V2, M.TAU0), 15.2, 0.15), M.voySpeed(V2, M.TAU0).toFixed(2));
const r = (V, d) => norm(M.voyPos(V, M.T(...d)));
check('V1 la șocul terminal ≈ 94 UA', near(r(V1, [2004, 12, 16]), 94, 1.5), r(V1, [2004, 12, 16]).toFixed(1));
check('V1 la heliopauză ≈ 121,6 UA', near(r(V1, [2012, 8, 25]), 121.6, 1.5), r(V1, [2012, 8, 25]).toFixed(1));
check('V2 la șocul terminal ≈ 84 UA', near(r(V2, [2007, 8, 30]), 84, 1.5), r(V2, [2007, 8, 30]).toFixed(1));
check('V2 la heliopauză ≈ 119–122 UA', r(V2, [2018, 11, 5]) > 118 && r(V2, [2018, 11, 5]) < 123, r(V2, [2018, 11, 5]).toFixed(1));
check('Continuitate la 5 nov. 2026', norm(sub(M.voyPos(V1, M.TAU0 - 1e-6), M.voyPos(V1, M.TAU0 + 1e-6))) < 1e-4);

console.log('Extrapolare pe termen lung (fără valori nefinite)');
let bad = 0;
for (const V of M.VOY) for (const cor of [false, true]) for (let k = 0; k < 3000; k++) {
  const t = k < 1500 ? M.TAU0 - 49 + k / 1500 * 49 : M.TAU0 + Math.pow(10, -4 + (k - 1500) / 1500 * 13);
  if (M.voyPos(V, t, cor).some(x => !isFinite(x))) bad++;
}
check('Poziții finite de la lansare la +1 mld. ani', bad === 0, bad + ' valori nefinite');
let badS = 0;
for (const s of M.STARS) for (let k = 0; k < 300; k++) if (M.starPos(s, M.TAU0 + Math.pow(10, -2 + k / 300 * 11), false).some(x => !isFinite(x))) badS++;
check('Poziții finite pentru stele', badS === 0);

console.log('Stele (față de literatura NASA/JPL)');
const star = n => M.STARS.find(s => s.name === n);
const ross = M.closestSun(star('Ross 248'), 2e6);
check('Ross 248: apropiere de Soare ≈3,0 a.l. în jurul anului 38 000', near(ross.d / LY, 3.04, 0.1) && near(year(ross.t), 38400, 800), (ross.d / LY).toFixed(2) + ' a.l. @' + Math.round(year(ross.t)));
const a1 = M.closest(V2, star('Ross 248'), 1.2e6);
check('V2 – Ross 248: ≈1,7 a.l. în ~42 000 de ani (toleranță 0,4 a.l.)', near(a1.d / LY, 1.7, 0.4) && near(a1.t - M.TAU0, 42000, 3000), (a1.d / LY).toFixed(2) + ' a.l. @+' + Math.round(a1.t - M.TAU0));
const a2 = M.closest(V1, star('Gliese 445'), 1.2e6);
check('V1 – Gliese 445: ≈1,6 a.l. în ~40 000 de ani (toleranță 0,5 a.l. / 6 000 ani)', near(a2.d / LY, 1.6, 0.5) && near(a2.t - M.TAU0, 40000, 6000), (a2.d / LY).toFixed(2) + ' a.l. @+' + Math.round(a2.t - M.TAU0));
const a3 = M.closest(V2, star('Sirius'), 1.2e6);
check('V2 – Sirius: în apropiere de 296 000 de ani (distanța diferă de 4,3 a.l., vezi README)', near(a3.t - M.TAU0, 296000, 40000) && a3.d / LY < 8, (a3.d / LY).toFixed(2) + ' a.l. @+' + Math.round(a3.t - M.TAU0));

// ---- timp profund ----
for (const V of M.VOY) {
  let fin = true, mx = 0, prev = M.voyPos(V, M.TAU0 + 1e6);
  for (const e of [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19.5, 20, 30, 60, 100]) {
    const p = M.voyPos(V, M.TAU0 + Math.pow(10, e)); fin = fin && p.every(Number.isFinite); mx = Math.max(mx, norm(p));
  }
  check(V.name + ': poziții finite de la 10^6 la 10^100 ani', fin);
  const fa = M.voyPos(V, M.TAU0 + 1e100), fb = M.voyPos(V, M.TAU0 + 1e60);
  check(V.name + ': stabilă în golul final (expansiunea o oprește la 5–15 Mal)', norm(fa) / LY > 5e6 && norm(fa) / LY < 1.5e7 && norm([fa[0]-fb[0], fa[1]-fb[1], fa[2]-fb[2]]) / LY < 1, (norm(fa) / LY / 1e6).toFixed(2) + ' Mal');
  const g = norm(M.voyPos(V, M.TAU0 + 1e12)) / LY;
  check(V.name + ': la 10^12 ani încă pe orbită galactică (<60 000 a.l.)', g < 6e4, Math.round(g) + ' a.l.');
}

console.log('\n' + ok + ' reușite, ' + fail + ' eșuate');
process.exit(fail ? 1 : 0);
