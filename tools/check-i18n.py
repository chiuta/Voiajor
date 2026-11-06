#!/usr/bin/env python3
"""Validates i18n/*.json against ro.json: keys, placeholders, inline markup, newlines, plural forms, leakage.
Usage: check-i18n.py [lang ...]   (default: every language file present, plus the embedded copy in index.html)"""
import json, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGS = ['en', 'ro', 'fr', 'it', 'es', 'pt', 'de', 'hu']
def jl(l): return json.load(open(os.path.join(ROOT, 'i18n', l + '.json'), encoding='utf-8'))
def tags(s): return sorted(re.sub(r'\s+', ' ', t) for t in re.findall(r'<[^>]+>', s))
def phs(s): return sorted(re.findall(r'\{\d+\}', s))
def check(lang, ref):
    errs = []; warn = []
    d = jl(lang)
    for k in ref:
        if k not in d: errs.append('missing ' + k); continue
        v, r = d[k], ref[k]
        if not isinstance(v, str) or not v.strip(): errs.append('empty ' + k); continue
        if phs(v) != phs(r): errs.append('placeholders %s: %s vs %s' % (k, phs(v), phs(r)))
        if tags(v) != tags(r): errs.append('markup %s: %s vs %s' % (k, tags(v), tags(r)))
        if v.count('\n') != r.count('\n'): errs.append('newlines ' + k)
        if v != v.strip() and r == r.strip(): errs.append('whitespace ' + k)
        if k.endswith(('.l', '.s')) and k.startswith('mo.') and len(v.split(', ')) != 12: errs.append('12 months ' + k)
        if k in ('mo.s', 'mo.l') and len(v.split(', ')) != 12: errs.append('12 months ' + k)
        if k in ('u.day', 'u.year', 'ru.day', 'ru.year'):
            n = len(v.split('|'))
            if n != (3 if lang == 'ro' else 2): errs.append('plural forms %s: %d' % (k, n))
        if lang != 'ro' and re.search('[ășțşţĂȘȚŞŢ]', v) and not k.startswith('mo.'): errs.append('romanian leakage ' + k + ': ' + v[:50])
        if len(r) > 12 and len(v) > 2.2 * len(r) + 20: warn.append('long ' + k)
        if k.startswith('tab.') and len(v) > 13: warn.append('tab label long ' + k + ' ' + v)
        if k.startswith('tl.') and len(v) > 24: warn.append('telemetry label long ' + k + ' ' + v)
    for k in d:
        if k not in ref: errs.append('extra ' + k)
    return errs, warn
def main():
    langs = sys.argv[1:] or [l for l in LANGS if os.path.exists(os.path.join(ROOT, 'i18n', l + '.json'))]
    ref = jl('ro'); bad = 0
    for l in langs:
        if l == 'ro': continue
        e, w = check(l, ref)
        print('%s: %d errors, %d warnings' % (l, len(e), len(w)))
        for x in e[:40]: print('  ERR', x)
        for x in w[:15]: print('  warn', x)
        bad += len(e)
    if not sys.argv[1:]:
        s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
        a = s.index('/*I18N-START*/const I18N=') + len('/*I18N-START*/const I18N=')
        b = s.index(';/*I18N-END*/')
        emb = json.loads(s[a:b].replace('<\\/', '</'))
        for l in langs:
            if emb.get(l) != jl(l): print('embedded copy of %s differs from i18n/%s.json — run tools/build-i18n.py' % (l, l)); bad += 1
    sys.exit(1 if bad else 0)
if __name__ == '__main__': main()
