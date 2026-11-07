// Rulează suita VOIAJOR (model numeric + i18n e2e) și iese cu cod ≠ 0 la primul eșec. Necesită playwright.
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let ok = 0;
for (const s of [['tests/model.test.js'], ['tests/i18n-e2e.js', 'index.html']]) {
  const r = spawnSync('node', s, {cwd: dir, encoding: 'utf8', timeout: 580000});
  const tail = (r.stdout || '').trim().split('\n').slice(-1)[0];
  console.log(`${r.status === 0 ? 'ok' : 'FAIL'} ${s[0]} — ${tail}`);
  if (r.status !== 0) { console.log((r.stderr || '').slice(-400)); process.exit(1); }
  ok++;
}
console.log(`${ok} ok`);
