#!/usr/bin/env python3
# U35: restore .bgblobs reduced on mobile + accelerate mobile-fx load trigger.
# Zero visual change desktop. Fix "dreptunghi at scroll" + Pamant apare mai repede pe mobil.

import sys, re, os
sys.stdout.reconfigure(encoding='utf-8')

HTML = r"C:\Users\USER\Documents\i-vory\websites\ivory-ro\deploy\index.html"

with open(HTML, 'r', encoding='utf-8') as f:
    html = f.read()

size_before = len(html)
print(f"[INFO] size before: {size_before} bytes")

# ===== PART A — restore .bgblobs reduced on mobile =====
# Replace the U29 kill block (lines 1431-1436) with U35 light version:
# - blob3 + blob4 hidden (keep compositing count down: 2 layers vs 4)
# - blur 100px -> 50px (GPU cost ~4x lower)
# - opacity reduced .55 -> .4 (softer, less saturation)
# - animations kept (will-change:transform already set, GPU cheap)

OLD_A = """  /* U29: KILL .bgblobs pe mobile — canvas mobile-fx.js ofera deja galaxy+stars+earth.
     4 blobs × filter:blur(100px) × animation 22-30s infinite = GPU layer × 4 recomputat per frame. */
  .bgblobs, .bgblobs .blob, .blob1, .blob2, .blob3, .blob4 {
    display: none !important;
    animation: none !important;
  }"""

NEW_A = """  /* U35: .bgblobs RESTAURAT pe mobile (light mode). Fix "dreptunghi cretin" la scroll — bg continuu garantat.
     Reduceri: 4 blobs -> 2 (blob1 + blob2 only), blur 100px -> 50px (GPU ~4x ieftin), opacitate .55 -> .4. */
  .bgblobs { display: block !important; }
  .bgblobs .blob { filter: blur(50px) !important; opacity: .4 !important; }
  .blob3, .blob4 { display: none !important; }"""

if OLD_A not in html:
    print("[ERR] OLD_A block not found")
    sys.exit(1)
html = html.replace(OLD_A, NEW_A)
print("[A] bgblobs mobile: KILL -> light restore (2 blobs, blur 50px)")

# ===== PART B — accelerate mobile-fx load trigger =====
# Current: scroll/touch/2s hardstop (lines 1709-1713)
# New: DOMContentLoaded immediate + scroll/touch fallback + 1s hardstop (was 2s)
# Result: Pamant appears ~500ms-1s instead of ~3-4s

OLD_B = """  var attach=function(){
    window.addEventListener('scroll',doLoad,{once:true,passive:true});
    window.addEventListener('touchstart',doLoad,{once:true,passive:true});
    setTimeout(doLoad,2000);
  };"""

NEW_B = """  var attach=function(){
    /* U35: trigger imediat la load, nu mai asteapta scroll/touch/2s. Pamant apare ~500ms vs 3-4s. */
    doLoad();
    window.addEventListener('scroll',doLoad,{once:true,passive:true});
    window.addEventListener('touchstart',doLoad,{once:true,passive:true});
    setTimeout(doLoad,1000);
  };"""

if OLD_B not in html:
    print("[ERR] OLD_B block not found")
    sys.exit(1)
html = html.replace(OLD_B, NEW_B)
print("[B] doLoad trigger: scroll/touch/2s -> imediat + fallback")

# Write
with open(HTML, 'w', encoding='utf-8') as f:
    f.write(html)

size_after = len(html)
print(f"[INFO] size after: {size_after} bytes (delta: {size_after-size_before:+d})")
print("[DONE] U35 applied.")
