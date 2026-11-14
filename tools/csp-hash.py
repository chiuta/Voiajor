#!/usr/bin/env python3
"""Recomputes the script-src sha256 hashes of the CSP meta in index.html (run after every edit of an inline <script>)."""
import base64, hashlib, os, re
P = os.path.abspath(__import__('sys').argv[1]) if len(__import__('sys').argv) > 1 else os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'index.html')
s = open(P, encoding='utf-8').read()
hs = []
for m in re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>', s, re.S):
    h = "'sha256-" + base64.b64encode(hashlib.sha256(m.group(1).encode('utf-8')).digest()).decode() + "'"
    if h not in hs: hs.append(h)
s2, n = re.subn(r"script-src [^;]*;", "script-src " + ' '.join(hs) + ";", s, count=1)
assert n == 1
open(P, 'w', encoding='utf-8').write(s2)
print('CSP script hashes:', len(hs))
