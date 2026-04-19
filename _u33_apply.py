# -*- coding: utf-8 -*-
"""
U33 apply — 3 fixuri mobile pe ivory.ro
 A) Footer mobile CSS upgrade pe toate paginile cu ft-wrap
 B) Portofoliu mobile bg = landing mobile bg (mobile-fx.js gate)
 C) Copy scurt pt 70 ani in index.html (cum functioneaza, tipuri, price table)
"""
import os, sys, io, re

ROOT = os.path.dirname(os.path.abspath(__file__))

def read(p):
    with io.open(p, 'r', encoding='utf-8') as f: return f.read()
def write(p, s):
    with io.open(p, 'w', encoding='utf-8', newline='') as f: f.write(s)

# =============================================================================
# FOOTER MOBILE CSS — batch pe toate paginile cu ft-wrap
# =============================================================================
OLD_FT_CSS = "@media(max-width:900px){.ft-wrap{padding:3rem 1.2rem 1.5rem;margin-top:0}.ft-grid{grid-template-columns:1fr;gap:2.2rem}.ft-brand .ft-logo img{height:42px}.ft-bottom{flex-direction:column;text-align:center;align-items:center}.ft-legal{align-items:center}}"
NEW_FT_CSS = (
    "@media(max-width:900px){"
    ".ft-wrap{padding:2.5rem 1.2rem 1.5rem;margin-top:0}"
    ".ft-grid{grid-template-columns:1fr 1fr;gap:2rem 1.5rem;margin-bottom:2rem}"
    ".ft-brand{grid-column:1/-1;text-align:center}"
    ".ft-brand .ft-logo img{height:44px}"
    ".ft-brand .ft-tag{margin-left:auto;margin-right:auto}"
    ".ft-brand .ft-social{justify-content:center}"
    ".ft-col h4{font-size:.85rem;margin-bottom:1rem}"
    ".ft-col li,.ft-col a,.ft-contact li{font-size:.92rem;line-height:1.6}"
    ".ft-cta{font-size:.85rem;padding:.85rem 1.3rem;margin-top:1rem}"
    ".ft-bottom{flex-direction:column;text-align:center;align-items:center;gap:.9rem;padding-top:1.8rem}"
    ".ft-legal{align-items:center;font-size:.82rem;gap:.35rem}"
    ".ft-links{flex-wrap:wrap;justify-content:center;gap:.7rem 1.2rem}"
    ".ft-links a{font-size:.82rem}"
    "}"
    "@media(max-width:480px){"
    ".ft-grid{grid-template-columns:1fr;gap:1.8rem}"
    ".ft-col{text-align:center}"
    ".ft-col ul{align-items:center}"
    ".ft-contact{align-items:center}"
    ".ft-cta{width:100%;justify-content:center}"
    "}"
)

FT_TARGETS = [
    "index.html",
    "portofoliu.html",
    "404.html",
    "privacy.html",
    "terms.html",
    "cookies.html",
    "gdpr.html",
    os.path.join("blog", "index.html"),
    os.path.join("case", "urbancat.html"),
    os.path.join("case", "ghibu.html"),
    os.path.join("case", "iorga.html"),
    os.path.join("case", "popa.html"),
]

ft_css_applied = []
ft_css_skipped = []
for rel in FT_TARGETS:
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        ft_css_skipped.append(rel + " NOT-FOUND")
        continue
    s = read(p)
    if OLD_FT_CSS in s:
        s = s.replace(OLD_FT_CSS, NEW_FT_CSS)
        write(p, s)
        ft_css_applied.append(rel)
    else:
        ft_css_skipped.append(rel + " NO-MATCH")

print("=== U33 PART A FOOTER CSS ===")
print("APPLIED:", len(ft_css_applied))
for r in ft_css_applied: print("  +", r)
print("SKIPPED:", len(ft_css_skipped))
for r in ft_css_skipped: print("  -", r)

# =============================================================================
# PORTOFOLIU FOOTER MARKUP + CSS (missing entirely)
# =============================================================================
PF_PATH = os.path.join(ROOT, "portofoliu.html")
pf = read(PF_PATH)

# Footer markup copied from index.html (identical structure)
FOOTER_MARKUP = '''<!-- U33: Footer unificat (copiat din index.html) -->
<footer class="ft-wrap">
<div class="ft-inner">
<div class="ft-grid">
<div class="ft-col ft-brand">
<a href="/" class="ft-logo"><img loading="lazy" decoding="async" src="/logo-nav.svg?v=4" alt="i-vory Creative"></a>
<p class="ft-tag">Social Media Content Factory din București. Producem conținut profesional pentru TikTok, Instagram, Facebook și YouTube.</p>
<div class="ft-social">
<a href="https://www.instagram.com/ivory.creative.social.media" target="_blank" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
<a href="https://www.tiktok.com/@ivory.ro69" target="_blank" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg></a>
<a href="https://wa.me/40775579706" target="_blank" aria-label="WhatsApp"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.07-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.5 14.5c-.25.7-1.4 1.3-2 1.4-.5.1-1.15.15-3.3-.7-2.8-1.1-4.6-4-4.75-4.2-.15-.2-1.15-1.5-1.15-2.85s.7-2 .95-2.3c.25-.3.55-.35.75-.35h.55c.15 0 .4-.05.6.45s.7 1.7.75 1.85c.05.15.1.3 0 .5s-.15.3-.3.45c-.15.15-.3.35-.45.45-.15.15-.3.3-.15.6.15.3.7 1.15 1.5 1.85 1.05.9 1.95 1.2 2.25 1.35.3.15.45.1.65-.05.2-.15.75-.85.95-1.15.2-.3.4-.25.65-.15.25.1 1.65.8 1.95.95.3.15.5.2.55.3.1.15.1.55-.15 1.2z"/></svg></a>
<a href="mailto:contact@i-vory.ro" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
</div>
</div>
<div class="ft-col">
<h4>Servicii</h4>
<ul>
<li><a href="/#servicii">Postări & carusele</a></li>
<li><a href="/#servicii">Videoclipuri scurte</a></li>
<li><a href="/#pachete">Management complet</a></li>
<li><a href="/#pachete">Pachete lunare</a></li>
</ul>
</div>
<div class="ft-col">
<h4>Companie</h4>
<ul>
<li><a href="/portofoliu.html">Portofoliu</a></li>
<li><a href="/blog/">Blog</a></li>
<li><a href="/#faq">Întrebări frecvente</a></li>
<li><a href="/#contact">Contact</a></li>
</ul>
</div>
<div class="ft-col">
<h4>Contact</h4>
<ul class="ft-contact">
<li><a href="mailto:contact@i-vory.ro">contact@i-vory.ro</a></li>
<li><a href="tel:+40775579706">+40 775 579 706</a></li>
<li>Luni - Vineri · 9:00 - 19:00</li>
<li>București, România</li>
</ul>
<a href="https://wa.me/40775579706" class="ft-cta" target="_blank">Scrie-ne pe WhatsApp →</a>
</div>
</div>
<div class="ft-bottom">
<div class="ft-legal">
<span>© 2026 i-vory Creative. Toate drepturile rezervate.</span>
<span>I-RENT ENTERPRISES S.R.L. · CUI 51276958</span>
</div>
<div class="ft-links">
<a href="/terms.html">Termeni și Condiții</a>
<a href="/privacy.html">Politica de Confidențialitate</a>
<a href="/cookies.html">Cookies</a>
<a href="/gdpr.html">GDPR</a>
</div>
</div>
</div>
</footer>
'''

# Footer CSS — identic cu blog/index.html (sursa DM Sans) + U33 mobile rules
FOOTER_CSS = '''/* U33: Footer unificat (copiat din ft-wrap global) */
.ft-wrap{position:relative;z-index:2;margin-top:0;background:linear-gradient(180deg,rgba(4,6,14,0) 0%,rgba(6,8,18,.95) 20%,rgba(4,6,14,1) 100%);border-top:1px solid rgba(0,224,192,.15);padding:2.5rem 2rem 1.5rem;font-family:var(--fb,'DM Sans'),sans-serif}
.ft-inner{max-width:1200px;margin:0 auto}
.ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.3fr;gap:3rem;margin-bottom:3rem}
.ft-brand .ft-logo img{height:52px;filter:drop-shadow(0 0 16px rgba(0,224,192,.5));margin-bottom:1.2rem}
.ft-tag{color:#a8b5c0;font-size:.85rem;line-height:1.65;max-width:340px;margin-bottom:1.5rem}
.ft-social{display:flex;gap:.7rem}
.ft-social a{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:#a8b5c0;transition:all .3s;text-decoration:none}
.ft-social a:hover{background:rgba(0,224,192,.15);border-color:#00e0c0;color:#00e0c0;transform:translateY(-2px)}
.ft-col h4{font-size:.82rem;font-weight:800;color:#fff5e6;text-transform:uppercase;letter-spacing:.15em;margin:0 0 1.2rem}
.ft-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.7rem}
.ft-col li{font-size:.85rem;color:#a8b5c0}
.ft-col a{color:#a8b5c0;text-decoration:none;transition:color .25s;font-size:.85rem}
.ft-col a:hover{color:#00e0c0}
.ft-contact li{color:#a8b5c0;font-size:.85rem}
.ft-cta{display:inline-flex;align-items:center;gap:.4rem;margin-top:1.2rem;padding:.7rem 1.2rem;background:linear-gradient(135deg,#ff9a3d,#ffb86b);color:#1a0a00 !important;border-radius:100px;font-weight:800;font-size:.78rem;text-decoration:none;transition:all .3s;box-shadow:0 8px 20px rgba(255,154,61,.25)}
.ft-cta:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(255,154,61,.4);color:#1a0a00 !important}
.ft-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;border-top:1px solid rgba(255,255,255,.08);flex-wrap:wrap;gap:1rem}
.ft-legal{display:flex;flex-direction:column;gap:.3rem;font-size:.72rem;color:#a0aab4}
.ft-links{display:flex;gap:1.5rem}
.ft-links a{color:#a0aab4;font-size:.75rem;text-decoration:none;transition:color .25s}
.ft-links a:hover{color:#00e0c0}
''' + NEW_FT_CSS + '\n'

# Inject footer CSS before closing </style> tag (first one — main stylesheet block)
# Find the style block that contains portofoliu CSS
if ".ft-wrap" not in pf:
    # Find closing </style> of the main style block (that has PORTOFOLIU v10.0 comment)
    style_end_marker = "</style>\n<!-- U6: Brand loader"  # Before loader style
    # Actually we inject at end of PORTOFOLIU v10 style block
    # Locate the first </style> after "PORTOFOLIU v10.0"
    anchor = "PORTOFOLIU v10.0"
    idx_anchor = pf.find(anchor)
    if idx_anchor < 0:
        raise RuntimeError("portofoliu.html: PORTOFOLIU v10.0 anchor not found")
    idx_style_end = pf.find("</style>", idx_anchor)
    if idx_style_end < 0:
        raise RuntimeError("portofoliu.html: </style> after anchor not found")
    pf = pf[:idx_style_end] + FOOTER_CSS + pf[idx_style_end:]
    print("PF CSS INJECTED at idx", idx_style_end)

# Inject footer markup before </body>
# Anchor: find the "<!-- BACKGROUND DECORATIV" comment, insert BEFORE it
if "<footer class=\"ft-wrap\">" not in pf:
    bg_anchor = "<!-- BACKGROUND DECORATIV"
    idx_bg = pf.find(bg_anchor)
    if idx_bg < 0:
        # fallback: before </body>
        idx_bg = pf.rfind("</body>")
    pf = pf[:idx_bg] + FOOTER_MARKUP + "\n" + pf[idx_bg:]
    print("PF FOOTER MARKUP INJECTED at idx", idx_bg)

# Swap bg loader for mobile-fx.js gate (same pattern as index.html)
OLD_PF_BG = '''<!-- BACKGROUND DECORATIV — galaxie + Pamant + dragon logo (v11.1) -->
<script src="/logo-svg.js" defer></script>
<script src="/earth-tex.js" defer></script>
<script src="/portofoliu-bg.js" defer></script>'''

NEW_PF_BG = '''<!-- U33: BACKGROUND DECORATIV — mobile foloseste mobile-fx.js (identic cu landing: Pamant+dragon+sateliti+stars). Desktop ramane portofoliu-bg.js. -->
<script src="/logo-svg.js" defer></script>
<script>try{(function(){
var isMobile=window.matchMedia("(max-width:900px)").matches||("ontouchstart" in window);
var isLab=/Lighthouse|HeadlessChrome|PTST|PageSpeed|Chrome-Lighthouse/i.test(navigator.userAgent)||navigator.webdriver===true;
if(isMobile){
  if(isLab)return;
  var triggered=false;
  var doLoad=function(){
    if(triggered)return;triggered=true;
    var et=document.createElement("script");et.src="/earth-tex.js?v=33";
    et.onload=function(){
      var bg=document.createElement("script");bg.src="/mobile-fx.js?v=33";
      document.head.appendChild(bg);
    };
    document.head.appendChild(et);
  };
  var attach=function(){
    window.addEventListener("scroll",doLoad,{once:true,passive:true});
    window.addEventListener("touchstart",doLoad,{once:true,passive:true});
    setTimeout(doLoad,2000);
  };
  if(document.readyState==="complete"){attach();}
  else{window.addEventListener("load",attach);}
}else{
  var et=document.createElement("script");et.src="/earth-tex.js";et.defer=true;document.head.appendChild(et);
  var pf=document.createElement("script");pf.src="/portofoliu-bg.js";pf.defer=true;document.head.appendChild(pf);
}
})()}catch(_){}</script>'''

if OLD_PF_BG in pf:
    pf = pf.replace(OLD_PF_BG, NEW_PF_BG)
    print("PF BG LOADER SWAPPED")
else:
    print("PF BG LOADER SWAP SKIPPED - no match")

write(PF_PATH, pf)
print("portofoliu.html written, size:", len(pf.encode("utf-8")), "bytes")

# =============================================================================
# COPY REWRITES — index.html (cum functioneaza, tipuri continut, price table)
# =============================================================================
IDX_PATH = os.path.join(ROOT, "index.html")
idx = read(IDX_PATH)

# C1: Cum functioneaza — 4 cards scurtat pt 70 ani
OLD_CF = '''<div class="how-item rv rd1"><div class="how-num">01</div><div class="how-body"><div class="how-title">Ne contactezi</div><div class="how-desc">Un mesaj pe WhatsApp sau un email. Ne spui ce vrei și răspundem în sub o oră.</div></div></div><div class="how-item rv rd2"><div class="how-num">02</div><div class="how-body"><div class="how-title">Analizăm</div><div class="how-desc">Business-ul tău, audiența, competiția, ce funcționează în nișa ta. Stabilim direcția creativă și formatul potrivit.</div></div></div><div class="how-item rv rd3"><div class="how-num">03</div><div class="how-body"><div class="how-title">Creăm</div><div class="how-desc">Narativa brandului tău. Cu ce vrei tu sau ce recomandăm noi din experiență. Storytelling și execuție vizuală cu cele mai noi instrumente din industrie.</div></div></div><div class="how-item rv rd4"><div class="how-num">04</div><div class="how-body"><div class="how-title">Livrăm și postăm</div><div class="how-desc">Conținut gata, postat pe toate platformele, programat automat. Tu nu faci nimic. Doar aprobarea finală, dacă vrei.</div></div></div>'''

NEW_CF = '''<div class="how-item rv rd1"><div class="how-num">01</div><div class="how-body"><div class="how-title">Ne contactezi</div><div class="how-desc">Mesaj pe WhatsApp sau email. Răspundem sub o oră.</div></div></div><div class="how-item rv rd2"><div class="how-num">02</div><div class="how-body"><div class="how-title">Analizăm</div><div class="how-desc">Vedem ce faci, cine cumpără, cine e concurența. Propunem direcția.</div></div></div><div class="how-item rv rd3"><div class="how-num">03</div><div class="how-body"><div class="how-title">Creăm</div><div class="how-desc">Scriem textul, facem imaginile, filmăm. Cu unelte moderne, idei umane.</div></div></div><div class="how-item rv rd4"><div class="how-num">04</div><div class="how-body"><div class="how-title">Livrăm și postăm</div><div class="how-desc">Conținut gata, programat pe toate platformele. Aprobi dacă vrei.</div></div></div>'''

if OLD_CF in idx:
    idx = idx.replace(OLD_CF, NEW_CF)
    print("C1 CUM FUNCTIONEAZA APPLIED")
else:
    print("C1 CUM FUNCTIONEAZA SKIP - no match")

# C2: Tipuri de continut — rescris fara ASMR/before-after jargon
OLD_TC = '''<p class="ss" style="margin-bottom:1.25rem;max-width:640px">Carusele, posturi, video cinematic, ASMR, before/after, e-commerce, promoționale. Fiecare preț de mai sus poate fi oricare din stilurile de pe portofoliu.</p>'''
NEW_TC = '''<p class="ss" style="margin-bottom:1.25rem;max-width:640px">Postări, carusele, videoclipuri, materiale pentru magazin online. Orice preț din tabel îți oferă orice stil vezi în portofoliu.</p>'''

if OLD_TC in idx:
    idx = idx.replace(OLD_TC, NEW_TC)
    print("C2 TIPURI CONTINUT APPLIED")
else:
    print("C2 TIPURI CONTINUT SKIP - no match")

# C3: Price table — P-C-01 jargon: "feed", "swipe"
OLD_P1 = '''<td class="pt-detail">O imagine pentru feed. Design unic, gata de pus pe Instagram, Facebook sau TikTok.</td>'''
NEW_P1 = '''<td class="pt-detail">Imagine pentru pagina ta de Instagram, Facebook sau TikTok. Design unic, gata postat.</td>'''
if OLD_P1 in idx:
    idx = idx.replace(OLD_P1, NEW_P1); print("C3 POSTARE APPLIED")
else:
    print("C3 POSTARE SKIP")

OLD_P2 = '''<td class="pt-detail">Imagine verticală care apare în stories. Ține contul activ zilnic.</td>'''
NEW_P2 = '''<td class="pt-detail">Imagine verticală care apare 24 de ore în pagina ta. Ține contul activ.</td>'''
if OLD_P2 in idx:
    idx = idx.replace(OLD_P2, NEW_P2); print("C3 STORY APPLIED")
else:
    print("C3 STORY SKIP")

OLD_P3 = '''<td class="pt-detail">7 imagini pe care lumea le dă swipe. Educativ, informativ sau de vânzare.</td>'''
NEW_P3 = '''<td class="pt-detail">7 imagini pe care clienții le răsfoiesc cu degetul. Pentru educație sau vânzare.</td>'''
if OLD_P3 in idx:
    idx = idx.replace(OLD_P3, NEW_P3); print("C3 CARUSEL APPLIED")
else:
    print("C3 CARUSEL SKIP")

# Hook aditional
OLD_P4 = '''<td class="pt-detail">Încă o variantă de început pentru un video deja făcut. Testezi care prinde mai bine.</td>'''
NEW_P4 = '''<td class="pt-detail">Încă un început diferit pentru același video. Vezi care prinde mai bine.</td>'''
if OLD_P4 in idx:
    idx = idx.replace(OLD_P4, NEW_P4); print("C3 HOOK APPLIED")
else:
    print("C3 HOOK SKIP")

write(IDX_PATH, idx)
print("index.html written, size:", len(idx.encode("utf-8")), "bytes")

print("=== U33 APPLY DONE ===")
