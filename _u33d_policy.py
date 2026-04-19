# -*- coding: utf-8 -*-
"""U33 Part D — inject full footer CSS into policy pages (privacy/terms/cookies/gdpr)"""
import os, io

ROOT = os.path.dirname(os.path.abspath(__file__))

def read(p):
    with io.open(p, 'r', encoding='utf-8') as f: return f.read()
def write(p, s):
    with io.open(p, 'w', encoding='utf-8', newline='') as f: f.write(s)

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

FOOTER_CSS = ('/* U33D: Footer unificat pentru policy pages */'
    '.ft-wrap{position:relative;z-index:2;margin-top:4rem;background:linear-gradient(180deg,rgba(4,6,14,0) 0%,rgba(6,8,18,.95) 20%,rgba(4,6,14,1) 100%);border-top:1px solid rgba(0,224,192,.15);padding:2.5rem 2rem 1.5rem;font-family:DM Sans,sans-serif}'
    '.ft-inner{max-width:1200px;margin:0 auto}'
    '.ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.3fr;gap:3rem;margin-bottom:3rem}'
    '.ft-brand .ft-logo img{height:52px;filter:drop-shadow(0 0 16px rgba(0,224,192,.5));margin-bottom:1.2rem}'
    '.ft-tag{color:#a8b5c0;font-size:.85rem;line-height:1.65;max-width:340px;margin-bottom:1.5rem}'
    '.ft-social{display:flex;gap:.7rem}'
    '.ft-social a{width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:#a8b5c0;transition:all .3s;text-decoration:none}'
    '.ft-social a:hover{background:rgba(0,224,192,.15);border-color:#00e0c0;color:#00e0c0;transform:translateY(-2px)}'
    '.ft-col h4{font-size:.82rem;font-weight:800;color:#fff5e6;text-transform:uppercase;letter-spacing:.15em;margin:0 0 1.2rem}'
    '.ft-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.7rem}'
    '.ft-col li{font-size:.85rem;color:#a8b5c0;margin-bottom:0}'
    '.ft-col a{color:#a8b5c0;text-decoration:none;transition:color .25s;font-size:.85rem}'
    '.ft-col a:hover{color:#00e0c0}'
    '.ft-contact li{color:#a8b5c0;font-size:.85rem}'
    '.ft-cta{display:inline-flex;align-items:center;gap:.4rem;margin-top:1.2rem;padding:.7rem 1.2rem;background:linear-gradient(135deg,#ff9a3d,#ffb86b);color:#1a0a00 !important;border-radius:100px;font-weight:800;font-size:.78rem;text-decoration:none;transition:all .3s;box-shadow:0 8px 20px rgba(255,154,61,.25)}'
    '.ft-cta:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(255,154,61,.4);color:#1a0a00 !important}'
    '.ft-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:2rem;border-top:1px solid rgba(255,255,255,.08);flex-wrap:wrap;gap:1rem}'
    '.ft-legal{display:flex;flex-direction:column;gap:.3rem;font-size:.72rem;color:#a0aab4}'
    '.ft-links{display:flex;gap:1.5rem}'
    '.ft-links a{color:#a0aab4;font-size:.75rem;text-decoration:none;transition:color .25s}'
    '.ft-links a:hover{color:#00e0c0}'
) + NEW_FT_CSS

TARGETS = ["privacy.html", "terms.html", "cookies.html", "gdpr.html"]

for rel in TARGETS:
    p = os.path.join(ROOT, rel)
    if not os.path.exists(p):
        print(f"SKIP {rel}: not found")
        continue
    s = read(p)
    if ".ft-wrap{position:relative" in s:
        print(f"SKIP {rel}: ft-wrap CSS already present")
        continue
    # Inject before first </style>
    idx = s.find("</style>")
    if idx < 0:
        print(f"SKIP {rel}: no </style>")
        continue
    new_s = s[:idx] + FOOTER_CSS + s[idx:]
    write(p, new_s)
    print(f"APPLIED {rel}: {len(s)} -> {len(new_s)} bytes")

print("=== U33 PART D DONE ===")
