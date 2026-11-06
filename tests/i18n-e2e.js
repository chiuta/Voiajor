// Usage: node tests/i18n-e2e.js [index.html] [shots-dir]
// Loads the app in each of the 8 languages at phone / tablet / desktop sizes, checks for console errors,
// untranslated keys, empty data-i nodes, clipped text, then (optionally) saves screenshots.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const file = path.resolve(process.argv[2] || 'index.html');
const shots = process.argv[3] ? path.resolve(process.argv[3]) : null;
if (shots) fs.mkdirSync(shots, { recursive: true });
const LANGS = ['en', 'ro', 'fr', 'it', 'es', 'pt', 'de', 'hu'];
const VPS = [['phone', 390, 844], ['phoneL', 844, 390], ['tablet', 820, 1180], ['desktop', 1366, 768]];
(async () => {
  const br = await chromium.launch(); let bad = 0;
  const fail = m => { bad++; console.log('  FAIL', m); };
  for (const lang of LANGS) {
    for (const [vn, w, h] of VPS) {
      const ctx = await br.newContext({ viewport: { width: w, height: h }, locale: lang, deviceScaleFactor: 1, hasTouch: vn !== 'desktop' });
      const pg = await ctx.newPage(); const errs = [];
      pg.on('pageerror', e => errs.push(String(e))); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
      await pg.goto('file://' + file + '?lang=' + lang); await pg.waitForTimeout(700);
      const tag = lang + '/' + vn;
      if (errs.length) fail(tag + ' console: ' + errs[0]);
      const r = await pg.evaluate(() => {
        const out = { lang: document.documentElement.lang, title: document.title, keys: [], empty: [], clip: [] };
        const isKey = s => /^[a-z]{1,4}\.[A-Za-z0-9.]+$/.test(s.trim());
        const vis = e => e.offsetParent !== null || getComputedStyle(e).position === 'fixed';
        document.querySelectorAll('body *').forEach(e => {
          if (e.children.length === 0 && e.textContent && isKey(e.textContent)) out.keys.push(e.textContent);
        });
        document.querySelectorAll('[data-i]').forEach(e => { if (!e.textContent.trim()) out.empty.push(e.dataset.i); });
        document.querySelectorAll('#top button,#ctl button,#ctl select,.tabs button,.chips button,.row .small,#hud div').forEach(e => {
          if (!vis(e)) return; const cs = getComputedStyle(e);
          if (e.scrollWidth > e.clientWidth + 1 && cs.overflow !== 'visible' ) out.clip.push((e.id || e.className || e.tagName) + ':' + e.textContent.trim().slice(0, 24));
        });
        const ctl = document.getElementById('ctl').getBoundingClientRect(), top = document.getElementById('top').getBoundingClientRect();
        out.docOverflow = document.documentElement.scrollWidth > innerWidth + 1;
        out.ctlOverflow = [...document.querySelectorAll('#ctl .row')].some(r => r.scrollWidth > r.clientWidth + 1);
        out.topOverflow = document.getElementById('top').scrollWidth > innerWidth + 1;
        out.ctlH = Math.round(ctl.height);
        return out;
      });
      if (r.lang !== lang) fail(tag + ' html lang ' + r.lang);
      if (r.keys.length) fail(tag + ' untranslated keys: ' + r.keys.slice(0, 4));
      if (r.empty.length) fail(tag + ' empty data-i: ' + r.empty.slice(0, 4));
      if (r.clip.length) fail(tag + ' clipped: ' + r.clip.slice(0, 4));
      if (r.docOverflow || r.ctlOverflow || r.topOverflow) fail(tag + ' overflow doc/ctl/top ' + [r.docOverflow, r.ctlOverflow, r.topOverflow]);
      if (vn === 'phone' || vn === 'desktop') {
        await pg.click('#bOpt'); await pg.waitForTimeout(150);
        const o = await pg.evaluate(() => { const o = document.getElementById('opt'); const r = o.getBoundingClientRect(); return { inside: r.left >= -1 && r.right <= innerWidth + 1 && r.top >= 40 - 1, sw: o.scrollWidth > o.clientWidth + 1 }; });
        if (!o.inside || o.sw) fail(tag + ' options panel geometry ' + JSON.stringify(o));
        if (shots) await pg.screenshot({ path: path.join(shots, tag.replace('/', '-') + '-opt.png') });
        await pg.click('#bOpt');
        await pg.click('#bGo'); await pg.waitForTimeout(150);
        const g = await pg.evaluate(() => { const b = document.querySelector('#goto .gbox').getBoundingClientRect(); return { inside: b.left >= -1 && b.right <= innerWidth + 1, months: document.querySelectorAll('#gM option').length, chips: document.querySelectorAll('#gChips button').length }; });
        if (!g.inside || g.months !== 12 || g.chips !== 12) fail(tag + ' dialog ' + JSON.stringify(g));
        if (shots && vn === 'phone') await pg.screenshot({ path: path.join(shots, tag.replace('/', '-') + '-goto.png') });
        await pg.click('#gX');
      }
      if (shots) await pg.screenshot({ path: path.join(shots, tag.replace('/', '-') + '.png') });
      await ctx.close();
    }
    console.log(lang, 'done');
  }
  // switching, persistence, fallback
  const ctx = await br.newContext({ viewport: { width: 1280, height: 800 }, locale: 'xx-YY' });
  const pg = await ctx.newPage(); await pg.goto('file://' + file); await pg.waitForTimeout(400);
  if (await pg.evaluate(() => document.documentElement.lang) !== 'en') fail('fallback language not en');
  await pg.click('#bOpt'); await pg.click('#lang button[data-l=de]'); await pg.waitForTimeout(300);
  if (await pg.evaluate(() => document.documentElement.lang) !== 'de') fail('switch to de');
  await pg.reload(); await pg.waitForTimeout(400);
  if (await pg.evaluate(() => document.documentElement.lang) !== 'de') fail('persistence');
  await pg.click('.tabs button[data-t=evs]'); await pg.waitForTimeout(300);
  const ev = await pg.evaluate(() => document.querySelector('#evList .ev').textContent);
  console.log('events sample (de):', ev.slice(0, 90));
  await ctx.close(); await br.close();
  console.log(bad ? 'FAILED ' + bad : 'ALL OK'); process.exit(bad ? 1 : 0);
})();
