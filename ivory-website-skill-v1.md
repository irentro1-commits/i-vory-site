# i-VORY WEBSITE SKILL v1.0
**Ultima actualizare:** 10 Aprilie 2026
**Status:** ACTIV — derivat din build i-vory.ro v7 (commits d85b893 → 1476dc6, ~70 deploy-uri)
**Scop:** Replicabilitate completă pentru orice site premium 3D space-themed pe stack Cloudflare Pages + GitHub.

---

## §1. STACK & INFRASTRUCTURĂ

**Hosting:** Cloudflare Pages (free tier suficient)
**Repo:** GitHub (`irentro1-commits/i-vory-site`)
**Build:** zero — push HTML brut + assets, Cloudflare servește direct
**Local source:** `C:\Users\USER\Documents\i-vory\I-VORY sITE\`
**Deploy folder:** `C:\Users\USER\Documents\i-vory\deploy\` (separate, doar fișiere prod)

### Workflow deploy (verbatim, NU schimba):
```powershell
# 1. Edit fișier sursă în I-VORY sITE
# 2. Copy în deploy
Copy-Item "ivory-v7.html" "C:\Users\USER\Documents\i-vory\deploy\index.html" -Force
# 3. Push
cd "C:\Users\USER\Documents\i-vory\deploy"
git add -A
git commit -m "descriere"
git push origin main
# Cloudflare auto-deploy în ~30s
```

### Tools obligatorii local:
- **PowerShell** (NU Python, NU Node — nu sunt instalate)
- **ffmpeg** via winget: `C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\`
- **git** (cmd line)
- **Desktop Commander MCP** pentru editare fișiere

---

## §2. ARHITECTURĂ HTML — SINGLE FILE

**Filozofie:** TOT într-un fișier HTML (~110KB). Zero build step, zero React, zero framework.
**Excepții externe:**
- `premium-fx.js` (~1500 linii FX rounds)
- `earth-tex.js` (269KB NASA texture base64)
- `logo-svg.js`, `logo-nav.svg`, `logo.svg`, `favicon.svg`
- `hero-video-web.mp4` (4.3MB compresie 540×960 H.264)

**Importmap pentru Three.js:**
```html
<script type="importmap">
{"imports":{"three":"https://unpkg.com/three@0.160.0/build/three.module.js","three/addons/":"https://unpkg.com/three@0.160.0/examples/jsm/"}}
</script>
```

---

## §3. SCENĂ 3D HERO — REGULI BLOCANTE

### Camera:
- **PerspectiveCamera** FOV 90 mobile / 60 desktop (mobile NEEDS wider FOV or planets clip)
- ACESFilmicToneMapping, exposure 1.15
- pixelRatio max 2

### Earth/planete — TRAP-uri descoperite:
1. **MeshStandardMaterial necesită lights.** Dacă nu vezi planeta, switch la **MeshBasicMaterial** cu textură. Standard depinde de keyLight position și pe mobile cu cursor parallax se rupe.
2. **Cursor gravity loop OVERWRITE poziția mobile.** Variabilele `_pbx/_pby` (planet base x/y) trebuie inițializate mobile-aware ÎNAINTE de animation loop. Loop-ul de cursor face `planet.position.x = _pbx + offsetX`, deci dacă `_pbx` e desktop coord (-12), planeta dispare offscreen mobile.
3. **Duplicate `camera.position.z` patch-uri.** Vechi cod cu `camera.position.z = 8 + scrollProg*4` te omoară. Search ALL camera.position.z setters și consolidează în UN SINGUR loop.

### Stars/particles count:
- **Mobile:** 4500 stars / 3500 particles (premium look fără throttle)
- **Desktop:** 5500 stars
- 3 parallax shells, twinkle shader
- Global `window.__starMat` pentru audio-react access

### Bloom:
- **UnrealBloomPass** strength 0.7 (mai mult = blow out)
- Full resolution, NU half-res

### Canvas mounting:
```css
.hero3d{position:fixed;inset:0;z-index:0;pointer-events:none}
```
La nivel `<body>`, NU în nicio secțiune. `pointer-events:none` ESENȚIAL ca să nu blocheze click-uri.

---

## §4. CRITICAL CSS BUGS — PĂZEȘTE-TE

### overflow-x:hidden RUPE position:sticky
**NU folosi:** `html, body { overflow-x: hidden }` — sticky în .prob storytelling section nu mai funcționează, slide-urile nu mai avansează pe mobile Chrome.
**Folosește:** `overflow-x: clip` (sticky-safe alternative, support 95%+ browsers 2024+)
```css
html{overflow-x:clip;max-width:100vw}
body{overflow-x:clip;max-width:100vw}
```

### Cursor-aware word glow rupe BUTOANE
Effect care wrap-uiește textul în `<span class="gw">` pentru hover glow trebuie EXCLUS din butoane, FAQ, cards. Altfel apare `\\` între cuvinte în butoane.
**Selector restrictiv obligatoriu:**
```js
const ps = Array.from(document.querySelectorAll('.sec > .si > p, .sec > .si > div > p, section.sec > p')).filter(p=>{
  if(p.closest('a,button,.bh,.faq-a,.faq-item,.wf-step,.dce-item,.pk,.type-card,.proof-card,nav,.contact-cta'))return false;
  if(p.children.length>0)return false;
  if(p.textContent.length>200)return false;
  return true;
});
```

### Section flex-row siblings → mobile chaos
Dacă `.s2{display:flex}` și ai `.s2-wrap` + `.hero-video` ca SIBLINGS direct în `.s2`, pe mobile flex-row îi pune side-by-side. Override OBLIGATORIU:
```css
@media(max-width:900px){
  section.s2,.s2{display:block !important;min-height:0 !important}
  .s2 .hero-video{display:block !important;position:relative !important;margin:1.5rem auto 0 !important}
}
```

---

## §5. ENCODING / MOJIBAKE — REGULĂ DE AUR

**Problema:** PowerShell scripts cu literale conținând caractere mojibake (`Ă`, `ț`, `â€"`) PARSE-EAZĂ GREȘIT și se rup.

**Soluție:** Pentru orice replacement cu diacritice/caractere speciale, folosește **JSON file extern** + `ConvertFrom-Json`:

```powershell
# faqdata.json scris cu Desktop Commander write_file (UTF-8 garantat)
{
  "answers": [
    ["Întrebare cu diacritice?", "Răspuns cu ăîșțâ."]
  ]
}

# script.ps1
$json = Get-Content "faqdata.json" -Raw -Encoding UTF8 | ConvertFrom-Json
```

**Alternativ pentru content user-facing:** scrie fără diacritice deloc (i-Vory final FAQ așa). Mai sigur decât să rupi encoding-ul iar și iar.

**Save fișier UTF-8 fără BOM obligatoriu:**
```powershell
[System.IO.File]::WriteAllText($path, $s, [System.Text.UTF8Encoding]::new($false))
```

---

## §6. PALETĂ FINALĂ — 3D SPACE PREMIUM

```css
--bg: #04060e          /* deep space */
--t: #fff5e6           /* warm white text */
--td: #d8d4c8          /* muted text */
--ac: #00e0c0          /* teal accent */
--peach: #ff9a3d       /* CTA peach (NOT teal — peach converts mai bine) */
--peach-light: #ffb86b
--cream: #ffe4b5
```

**Reguli butoane:**
- CTA primary = peach gradient `linear-gradient(135deg,#ff9a3d,#ffb86b)` cu text `#1a0a00` + glow peach shadow
- CTA secondary `.b-ghost` = transparent + border `1.5px solid rgba(255,245,230,.5)` + backdrop-blur
- NICIODATĂ teal pe CTA principal — teal e pentru accente, brand, glow

**Numere stat / counters:**
- `#fff5e6` off-white cu glow shadow, **NU gradient** (gradient pe numere = ilizibil)

---

## §7. PREMIUM FX BANK — 51+ EFECTE ÎN 10 ROUNDS

Toate într-un singur `premium-fx.js`. Structură per round = 5-7 efecte adăugate incremental.

**Round-uri esențiale (build order):**
1. **Base** (R1-3): Magnetic CTAs, parallax titles, scroll reveal, warp stars, cursor trail, ambient WebAudio drone
2. **Counters & feedback** (R4): Number counter cubic-out, text scramble, 3D card tilt, scroll progress radial ring, click sfx
3. **Trust & UX** (R5): Live ticker, exit-intent modal, FAQ search, reduced-motion, lazy load, schema.org JSON-LD
4. **Interactive** (R6): Particle burst CTA click, kinetic typography hero, mouse spotlight, hover sound cards, glassmorphism nav
5. **Engagement** (R7): Liquid blob cursor, confetti form submit, workflow timeline, portfolio hover preview, smart WhatsApp float
6. **Polish** (R8): Film grain + chromatic aberration, custom scrollbar, page enter slide-in, dynamic favicon, skeleton loading
7. **Hyperpremium** (R9): Bento asymmetric grid, type-on cinematic, parallax depth, WebGL cursor distortion, glitch RGB, visitor counter, Konami easter egg
8. **Ultra** (R10): Audio-reactive star pulse, sticky scroll storytelling, cursor word-glow, water ripple SVG, perf HUD, lens flare

**Mobile optimization:** Hover-only effects DISABLE pe mobile via `__IS_MOBILE` check:
```js
const __IS_MOBILE = window.matchMedia("(max-width:768px)").matches || ("ontouchstart" in window);
const __LOW_PERF = __IS_MOBILE || (navigator.hardwareConcurrency||8) <= 4;
// Disable: magnetic, cursor trail, constellation, spotlight, hover sound, card tilt, liquid cursor, word glow
// Keep: stars, particles, parallax, counters, scramble, fx, workflow, audio
```

---

## §8. VIDEO HERO 9:16 — INTEGRARE

### Compresie obligatorie ffmpeg:
```powershell
$ff = "C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe"
& $ff -i source.mp4 -vf "scale=540:960" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart -y hero-video-web.mp4
```
Target: ~4-6 MB pentru hero video. CRF 28 = balance quality/size.

### HTML structure:
```html
<video id="hvVid" src="hero-video-web.mp4" autoplay muted loop playsinline preload="metadata"></video>
```
**`playsinline` ESENȚIAL** pentru iOS Safari (altfel se duce fullscreen la autoplay).
**`muted` ESENȚIAL** pentru autoplay (browsers block autoplay cu sound).

### Hover unmute + manual mute toggle:
```js
wrap.addEventListener("mouseenter", ()=>{ if(!manual){ v.muted=false; v.volume=.7 } });
wrap.addEventListener("mouseleave", ()=>{ if(!manual){ v.muted=true } });
button.addEventListener("click", e=>{ e.stopPropagation(); manual=true; v.muted=!v.muted });
```

### Plasare în secțiune (NU fixed peste site):
- Position **relative** în interiorul secțiunii
- Section parent `position:relative` + flex row desktop, block stacking mobile
- Mobile: `display:block !important` pe section + `position:relative` pe video

---

## §9. NAV LOGO — VIEWBOX TRAP

Inner SVG transforms (translate + scale + flip Y) **modifică range-ul Y**. Original `<g transform="translate(-10,685) scale(0.1,-0.1)">` mapează content în y range 105-685.

**Greșeala mea inițială:** viewBox 0 0 1700 520 → elefantul tăiat sus și jos.
**Soluție:** viewBox **2700×700** include tot Y range 0-700 + lățime pentru text "i-vory Creative" lângă.

```svg
<svg viewBox="0 0 2700 700" preserveAspectRatio="xMidYMid meet">
  <g transform="translate(-10,685) scale(0.1,-0.1)"><!-- elephant paths --></g>
  <text x="850" y="450" font-size="280" fill="#f5ecd7">i-vory</text>
  <text x="1700" y="450" font-size="220" fill="#00e0c0">Creative</text>
</svg>
```

**Casing exact = "i-vory Creative"** (lowercase i-vory, capital C în Creative). Andy prinde imediat dacă e altfel.

**Cache busting după update logo:** add `?v=N` query param în `<img src>` (Cloudflare cache 4h default).

---

## §10. MOBILE FINAL CHECKLIST

```css
@media(max-width:768px){
  /* Nav compact */
  nav{padding:.4rem .7rem !important;min-height:52px !important}
  nav .nl img{height:30px !important}
  nav .nc{padding:.45rem .75rem !important;font-size:.68rem !important;white-space:nowrap !important}
  
  /* Hero text NO letter-per-line break */
  .s2 h2{font-size:clamp(1.7rem,7vw,2.3rem) !important;line-height:1.08 !important;word-break:normal !important;hyphens:none !important}
  
  /* CTAs stack vertical, full width, nowrap */
  .s2-cta{flex-direction:column !important;gap:.7rem !important;max-width:300px !important;margin:0 auto !important}
  .s2-cta .bh{width:100% !important;white-space:nowrap !important;justify-content:center !important}
  
  /* Text shadow OVER starfield obligatoriu */
  .sec h1,.sec h2,.sec h3{text-shadow:0 4px 24px #000,0 0 60px rgba(0,0,0,.95) !important}
  .sec p{text-shadow:0 2px 12px rgba(0,0,0,.85) !important}
  
  /* Section flex-row → block (vezi §4) */
  section.s2,.s2{display:block !important}
  .s2 .hero-video{display:block !important;position:relative !important;margin:1.5rem auto 0 !important}
}
```

**Bonus radial dark panel pentru text peste starfield zgomotos:**
```css
.s2::before{
  content:"";position:absolute;inset:1rem;
  background:radial-gradient(ellipse at center,rgba(4,6,14,.82) 0%,rgba(4,6,14,.5) 60%,transparent 100%);
  z-index:-1;border-radius:24px;backdrop-filter:blur(3px);
}
```

---

## §11. WORKFLOW DEBUGGING ANDY

**Patternul Andy:** trimite screenshot urât, descrie problema în caps lock, cere fix instant.

**Cum răspunzi:**
1. **Verdict primul** ce e stricat și cauza root
2. Scriu script `.ps1` cu fix
3. Run + copy deploy + git push într-un singur `interact_with_process` call
4. Confirm commit hash
5. ZERO postamble explicații

**Anti-patterns interzise:**
- "Hai să verific..." (NU, fă direct)
- "Probabil cache..." (verifică deploy folder înainte să zici cache)
- "Ar trebui să meargă acum" (NU. Verifică efectiv structura HTML)
- Multiple deploy-uri pe aceeași problemă fără să citești CSS-ul actual din file

**Când Andy zice "ESTE ULTIMUL TASK":** Nu e ultimul. Pregătit pentru încă 5 iterații.

---

## §12. SCRIPTS REUSABLE TEMPLATES

### Template fix CSS prin replace:
```powershell
$path = "C:\Users\USER\Documents\i-vory\I-VORY sITE\ivory-v7.html"
$bytes = [System.IO.File]::ReadAllBytes($path)
$s = [System.Text.Encoding]::UTF8.GetString($bytes)

$old = 'CSS_VECHI_EXACT'
$new = 'CSS_NOU'
$s = $s.Replace($old, $new)

[System.IO.File]::WriteAllText($path, $s, [System.Text.UTF8Encoding]::new($false))
"done"
```

### Template inject CSS la end of style:
```powershell
$blk = '@media(max-width:768px){...}'
$s = $s -replace '</style>', ($blk + '</style>')
```

### Template git push one-liner:
```powershell
cd "C:\Users\USER\Documents\i-vory\I-VORY sITE"
powershell -ExecutionPolicy Bypass -File fix.ps1
Remove-Item fix.ps1
Copy-Item "ivory-v7.html" "C:\Users\USER\Documents\i-vory\deploy\index.html" -Force
cd "C:\Users\USER\Documents\i-vory\deploy"
git add -A
git commit -m "descriere"
git push origin main
```

---

## §13. CHEAT SHEET — DECIZII RAPIDE

| Problemă | Cauza root probabilă |
|---|---|
| Slide-uri nu avansează mobile | `overflow-x:hidden` rupe sticky → folosește `clip` |
| Planeta dispare mobile | Cursor gravity loop OR MeshStandardMaterial fără light |
| Text apare cu `\\` în butoane | Word glow effect wrap în spans, exclude din selector |
| Logo tăiat în nav | viewBox prea mic pentru inner SVG transform |
| Mojibake `Ățâ€"` în content | Encoding broken, folosește JSON extern UTF-8 |
| Video în dreapta pe mobil | `display:flex` pe parent section, override `display:block` mobile |
| h2 wrap letter-per-line | `font-size` prea mare + `word-break:break-all` undeva |
| CTA wrap "Scrie-ne pe / WhatsApp" | Add `white-space:nowrap` pe `.bh` |
| Text invizibil peste starfield | Add `text-shadow:0 4px 24px #000` |
| Cache Cloudflare nu update | Add `?v=N` query param pe asset |

---

## §14. FILES MAP — CURRENT STATE i-vory.ro

```
C:\Users\USER\Documents\i-vory\
├── I-VORY sITE\          ← SOURCE WORKING
│   ├── ivory-v7.html     ← main file ~110KB
│   ├── premium-fx.js     ← ~1500 lines FX bank
│   ├── earth-tex.js      ← 269KB NASA texture base64
│   ├── logo.svg          ← elephant only (28 paths teal)
│   ├── logo-nav.svg      ← elephant + "i-vory Creative" (viewBox 2700×700)
│   ├── logo-svg.js       ← base64 fallback
│   ├── favicon.svg
│   ├── logo-full.svg
│   └── hero-video-web.mp4 ← 4.3MB compressed 540×960
└── deploy\               ← GIT REPO ROOT
    ├── index.html        ← copy from source
    ├── premium-fx.js
    ├── earth-tex.js
    ├── logo*.svg
    ├── hero-video-web.mp4
    └── .git\
```

---

## §15. METRICI BUILD COMPLET

- **70+ commits** total (d85b893 → 1476dc6)
- **51+ premium effects** în 10 rounds
- **~110KB** HTML single file
- **4.3MB** hero video compressed
- **PageSpeed:** Perf 78 / Access 100 / BP 100 / SEO 100
- **Stack:** Three.js + vanilla JS + CSS, ZERO build step
- **Time to first paint:** <1.5s pe 4G mobile

---

**END SKILL v1.0**
**Next version trigger:** Site major refactor SAU client nou cere același stack.
