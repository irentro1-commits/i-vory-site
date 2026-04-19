#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
U34 — mobile perf fix: extract Three.js module + lazy→eager + preload + version bump.

A. Extract inline <script type="module"> Three.js block (~595 lines) to external file hero-3d.module.js.
   Replace inline tag with a desktop-only dynamic loader (mobile skips parse + fetch entirely).
B. Remove duplicate <script src="logo-svg.js" defer></script> static line.
   Add logo-svg.js to desktop gate (next to earth-tex.js + premium-fx.js).
C. loading="lazy" → "eager" on above-fold images:
   - preloader logo (line ~1521)
   - nav logo (line ~1528)
D. Add <link rel="preload" as="image" href="/logo-nav.svg?v=4"> in <head>.
E. Bump versions in mobile gate: earth-tex.js?v=24→34, logo-svg.js?v=24→34, mobile-fx.js?v=27→34.

All changes preserve visual 100%. Only add optimization or remove junk.
"""
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

HTML_PATH = r"C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\index.html"
MODULE_PATH = r"C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\hero-3d.module.js"

with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

orig_size = len(html)
print(f"[READ] index.html = {orig_size} bytes")

# ============================================================
# PART A — Extract Three.js inline module to external file
# ============================================================
# Match: <script type="module">...</script> starting with the big Three.js block
# The block starts with: if(window.__IS_INAPP||window.__IS_MOBILE){...}else{
# It's the ONLY <script type="module"> in the file (importmap is <script type="importmap">)

module_pattern = re.compile(
    r'<script type="module">\s*\n?(if\(window\.__IS_INAPP\|\|window\.__IS_MOBILE\).*?)</script>',
    re.DOTALL
)
match = module_pattern.search(html)
if not match:
    print("[A] FAIL: could not find inline Three.js module block")
    sys.exit(1)

module_body = match.group(1).rstrip()
module_size = len(module_body)
print(f"[A] extracted module body = {module_size} chars / {module_body.count(chr(10))+1} lines")

# Write external module file with header
module_file_content = (
    "/* hero-3d.module.js — extracted from index.html inline module in U34 (19 Apr 2026).\n"
    " * Loaded ONLY on desktop via dynamic <script type=\"module\" src=\"...\"> tag.\n"
    " * Mobile + in-app WebView skip this file entirely (0 fetch, 0 parse).\n"
    " * Internal mobile short-circuit kept as defensive fallback in case of accidental load.\n"
    " * Requires importmap (still inline in index.html head) to resolve 'three' + 'three/addons/'.\n"
    " */\n"
    + module_body + "\n"
)

with open(MODULE_PATH, "w", encoding="utf-8") as f:
    f.write(module_file_content)
print(f"[A] WROTE hero-3d.module.js = {len(module_file_content)} bytes")

# Replace inline module in HTML with desktop-only dynamic loader
loader_replacement = (
    '<script>try{/* U34: load hero-3d.module.js DOAR desktop. Mobile + in-app skip parse 600+ linii Three.js. Preloader + .hero3d deja ascunse pe mobil via m-nopre CSS. */\n'
    '(function(){\n'
    'if(window.__IS_MOBILE||window.__IS_INAPP)return;\n'
    'var s=document.createElement(\'script\');s.type=\'module\';s.src=\'/hero-3d.module.js?v=34\';document.head.appendChild(s);\n'
    '})();}catch(_){}</script>'
)

html = module_pattern.sub(loader_replacement, html, count=1)
print(f"[A] replaced inline module with desktop-only loader")

# ============================================================
# PART B — Remove duplicate logo-svg.js static, add to desktop gate
# ============================================================
# Remove: <script src="logo-svg.js" defer></script>\n
static_logo = '<script src="logo-svg.js" defer></script>\n'
if static_logo in html:
    html = html.replace(static_logo, '', 1)
    print(f"[B] REMOVED static <script src=\"logo-svg.js\" defer></script>")
else:
    print(f"[B] WARN: static logo-svg.js tag not found exactly")

# Add logo-svg.js to desktop gate — inject between earth-tex.js and premium-fx.js
old_desktop_gate = (
    "  var et=document.createElement('script');et.src='earth-tex.js';et.defer=true;document.head.appendChild(et);\n"
    "  var pf=document.createElement('script');pf.src='premium-fx.js';pf.defer=true;document.head.appendChild(pf);"
)
new_desktop_gate = (
    "  var et=document.createElement('script');et.src='earth-tex.js';et.defer=true;document.head.appendChild(et);\n"
    "  var lg=document.createElement('script');lg.src='logo-svg.js';lg.defer=true;document.head.appendChild(lg);\n"
    "  var pf=document.createElement('script');pf.src='premium-fx.js';pf.defer=true;document.head.appendChild(pf);"
)
if old_desktop_gate in html:
    html = html.replace(old_desktop_gate, new_desktop_gate, 1)
    print(f"[B] ADDED logo-svg.js to desktop gate")
else:
    print(f"[B] WARN: desktop gate block not found exactly")

# ============================================================
# PART C — loading="lazy" → "eager" on nav logo + preloader logo
# ============================================================
# Nav logo (line ~1528)
nav_logo_old = '<a class="nl" href="#" style="display:flex;align-items:center;text-decoration:none;padding:.2rem 0"><img loading="lazy" decoding="async" src="logo-nav.svg?v=4"'
nav_logo_new = '<a class="nl" href="#" style="display:flex;align-items:center;text-decoration:none;padding:.2rem 0"><img loading="eager" decoding="async" fetchpriority="high" src="logo-nav.svg?v=4"'
if nav_logo_old in html:
    html = html.replace(nav_logo_old, nav_logo_new, 1)
    print(f"[C1] nav logo: lazy → eager + fetchpriority=high")
else:
    print(f"[C1] WARN: nav logo img tag not found")

# Preloader logo (line ~1521)
pre_logo_old = '<img loading="lazy" decoding="async" src="logo-nav.svg?v=4" alt="i-vory Creative" style="height:90px;width:auto;display:block;margin:0 auto 1.2rem;'
pre_logo_new = '<img loading="eager" decoding="async" src="logo-nav.svg?v=4" alt="i-vory Creative" style="height:90px;width:auto;display:block;margin:0 auto 1.2rem;'
if pre_logo_old in html:
    html = html.replace(pre_logo_old, pre_logo_new, 1)
    print(f"[C2] preloader logo: lazy → eager")
else:
    print(f"[C2] WARN: preloader logo img tag not found")

# ============================================================
# PART D — Preload logo-nav.svg in <head>
# ============================================================
# Inject right after the font preload line (line ~80)
preload_anchor = '<link rel="preload" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700;800&family=Geist+Mono:wght@500&display=swap" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
preload_new = preload_anchor + '\n<link rel="preload" as="image" href="/logo-nav.svg?v=4" type="image/svg+xml" fetchpriority="high"><!-- U34: LCP hint for above-fold logo -->'
if preload_anchor in html:
    html = html.replace(preload_anchor, preload_new, 1)
    print(f"[D] ADDED <link rel=\"preload\" as=\"image\" href=\"/logo-nav.svg?v=4\">")
else:
    print(f"[D] WARN: preload anchor not found")

# ============================================================
# PART E — Bump cache versions in mobile gate (v24/v27 → v34)
# ============================================================
bumps = [
    ("et.src='earth-tex.js?v=24';",  "et.src='earth-tex.js?v=34';"),
    ("lg.src='logo-svg.js?v=24';",   "lg.src='logo-svg.js?v=34';"),
    ("bg.src='mobile-fx.js?v=27';",  "bg.src='mobile-fx.js?v=34';"),
]
for old, new in bumps:
    if old in html:
        html = html.replace(old, new, 1)
        print(f"[E] BUMPED: {old} → {new}")
    else:
        print(f"[E] WARN: not found: {old}")

# ============================================================
# WRITE
# ============================================================
with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

new_size = len(html)
print(f"\n[WRITE] index.html = {new_size} bytes (delta: {new_size - orig_size:+d})")
print(f"[DONE] U34 all parts applied.")
