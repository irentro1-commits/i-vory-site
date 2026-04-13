# i-VORY CREATIVE WEBSITE — COMPLETE BUILD SKILL v2.0
**Ultima actualizare: 13 Aprilie 2026**
**Scop:** Document complet care permite rebuild 100% al site-ului i-vory.ro într-un proiect Claude nou, fără memorie anterioară.

---

## 0. REGULI ABSOLUTE (CITEȘTE ÎNTÂI)

1. **NICIODATĂ PowerShell pentru string-uri cu diacritice**. Parser-ul PS rupe `ă`, `â`, `î`, `ș`, `ț`, `—`. **MEREU folosește Python** cu `open(p, "rb")` + `encode("utf-8")`.
2. **NICIODATĂ `cat > file` cu heredoc RO în PS**. Folosește Python sau `create_file` tool.
3. **MEREU backup înainte de regex large-scale**. Dacă `replace()` nu găsește pattern, nu presupune — verifică întâi cu `find()`.
4. **MEREU verifică deploy cu `curl.exe -s https://i-vory.ro/ | findstr`** înainte să zici că e live.
5. **Calitate peste economie credite**. Andy plătește Claude Max 20x. Zero `FAIL EXPLICIT` pe task-uri normale.

---

## 1. INFRASTRUCTURE

### Stack
- **Hosting:** Cloudflare Pages (auto-deploy on push)
- **Repo:** `https://github.com/irentro1-commits/i-vory-site` (branch: `main`)
- **Domain:** `i-vory.ro` (Cloudflare DNS)
- **Email:** Resend (contact@i-vory.ro) — pentru booking worker
- **Analytics:** GA4 `G-256CM7TGEG`
- **Scheduling:** Calendly `calendly.com/ivorymarketing2/30min`

### Paths locale Andy
- **Source HTML dev:** `C:\Users\USER\Documents\i-vory\I-VORY sITE\ivory-v7.html`
- **Deploy folder (git repo):** `C:\Users\USER\Documents\i-vory\deploy\`
- **Worker code:** `C:\Users\USER\Documents\i-vory\worker\src\index.js`
- **ffmpeg:** `C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe`
- **Python 3.14:** instalat global, `python` în PATH
- **Chrome:** `C:\Program Files\Google\Chrome\Application\chrome.exe`
- **Git:** PATH OK, fără node, fără WSL

### Deploy workflow (canonical)
```powershell
# 1. Edit /I-VORY sITE/ivory-v7.html (Python scripts preferate)
# 2. Copy to deploy/
Copy-Item "C:\Users\USER\Documents\i-vory\I-VORY sITE\ivory-v7.html" "C:\Users\USER\Documents\i-vory\deploy\index.html" -Force
# 3. Commit & push
cd "C:\Users\USER\Documents\i-vory\deploy"
git add -A
git commit -m "descriptive message"
git push origin main
# 4. Cloudflare Pages picks up push → live în 30-60s
```

### Cache invalidation
- HTML: `max-age=600, stale-while-revalidate=3600` (vezi `_headers`)
- Assets: immutable 1 year pe JS/CSS/SVG/WOFF2, 30 zile pe img/video
- Pentru bust manual: `?v=N` pe URL (ex: `logo-nav.svg?v=4`)

---

## 2. FILE STRUCTURE (deploy/)

```
deploy/
├── index.html                  # Homepage (principala)
├── portfolio.html              # Portfolio hub cu 4 proiecte
├── 404.html                    # Error page
├── terms.html                  # Termeni și Condiții
├── privacy.html                # Politica Confidențialitate (GDPR)
├── cookies.html                # Politica Cookies
├── gdpr.html                   # Pagină GDPR dedicată
├── logo-nav.svg                # Logo header (48px)
├── favicon.svg
├── og-image.jpg                # 1200x630 (generated via Chrome headless)
├── robots.txt
├── sitemap.xml
├── llms.txt                    # Pentru AI crawlers
├── _headers                    # Cloudflare cache rules
├── .well-known/
│   └── security.txt
├── blog/
│   ├── index.html
│   ├── cat-costa-social-media-romania-2026.html
│   ├── de-ce-ai-nevoie-de-social-media.html
│   └── tiktok-vs-instagram-2026.html
├── case/
│   ├── ghibu.html
│   ├── iorga.html
│   ├── popa.html
│   ├── urbancat.html
│   └── urbancat-assets/        # 38 files: 35 JPG + 2 MP4 + 1 meme
│       ├── c1_1.jpg ... c1_6.jpg   (educational CTA)
│       ├── c2_1.jpg ... c2_7.jpg   (engagement)
│       ├── c3_1.jpg ... c3_7.jpg   (istoric pisici)
│       ├── c4_1.jpg ... c4_7.jpg   (action)
│       ├── c5_1.jpg ... c5_7.jpg   (humor)
│       ├── p1_1.jpg, p1_2.jpg      (emotional post)
│       ├── p2_meme.jpg
│       ├── v1_asmr.mp4             (540p)
│       └── v2_cinematic.mp4        (720p)
```

---

## 3. DESIGN SYSTEM (CSS VARIABLES)

```css
:root{
  --ink: #04060e;        /* Background principal */
  --ti:  #fff5e6;        /* Text primary (warm off-white) */
  --td:  #d8d4c8;        /* Text secondary */
  --a8:  #a8b5c0;        /* Text muted */
  --ac:  #00e0c0;        /* Accent primary (teal) */
  --am:  #ff9a3d;        /* Accent warm (orange) */
  --pa:  #f5f1e8;        /* Paper warm */
  --pd:  #ffb86b;        /* Peach highlight */
  --fb:  'DM Sans', sans-serif;     /* Body */
  --fd:  'Syne', sans-serif;         /* Display/headings */
  --e:   cubic-bezier(.2,.9,.3,1.2); /* Easing premium */
}
```

**Typography:**
- Display headings: Syne 700/800, letter-spacing -.03em, line-height 1.05-1.1
- Body: DM Sans 400/600/700
- Eyebrow labels: small uppercase, letter-spacing .2em, teal border

**Shadows/effects:**
- Card lift: `box-shadow: 0 30px 60px rgba(0,0,0,.6), 0 0 40px rgba(0,224,192,.25)`
- Logo glow: `filter: drop-shadow(0 0 14px rgba(0,224,192,.45))`
- Text on dark bg: `text-shadow: 0 4px 24px #000, 0 0 60px rgba(0,0,0,.95)`

**Background:**
- Body: `radial-gradient(ellipse at 25% 20%, #1a0a2e 0%, #0a0617 45%, #04060e 100%)`
- Stars: body::before cu 3 radial-gradients, animație 80s linear infinite

---

## 4. HOMEPAGE SECTIONS (index.html)

### Order
1. **nav** — fixed top, backdrop-blur, logo + 5 linkuri + WhatsApp btn + ham mobile
2. **s1** — Three.js 3D scene (hero video + elephant)
3. **s2** — Hero text "Noi ne ocupăm de social media. Tu îți vezi de business."
4. **prob** — Scroll storytelling 2 slides (desktop+mobile), height 150vh
5. **mq** — Client marquee (horizontal scroll 40s, desktop-only)
6. **servicii** — 3 pk cards (Postări, Video, Management)
7. **pachete** — 3 package cards + comparison table + calculator
8. **how** — Workflow timeline 5 steps
9. **portofoliu** — Preview 2×2 → `/portfolio.html`
10. **testimonials** — tc-card carousel 9:16 videos (desktop)
11. **proof** — 4 counters (Clienți/Postări/Platforme/Postări/zi)
12. **faq** — 6 items native `<details>/<summary>`
13. **contact** — CTA split
14. **footer** — 4 coloane premium

### Prob section (scroll storytelling)
```html
<div class="prob" id="prob">
  <div class="prob-sticky">
    <div class="prob-overlay"></div>
    <div class="prob-line" data-i="0">
      <span class="pac">Noi ne ocupăm<br>de social media.</span>
      <br>Tu îți vezi de business.
    </div>
    <div class="prob-line" data-i="1">
      Social media cere <span class="pac">volum, calitate</span> și <span class="pac">trend</span>,
      <br>în același timp.<br><br>
      Tu ai o <span class="pdm">afacere de condus.</span>
    </div>
    <div class="scroll-hint">...</div>
    <div class="prob-progress"><i id="probBar"></i></div>
  </div>
</div>
```
CSS: `.prob{position:relative;height:150vh}` `.prob-sticky{position:sticky;top:0;height:100vh}`
JS: calculează scroll progress, set `probBar.style.width = progress*100 + '%'`, activează `data-i` corespunzător cu `segment = 1/lines.length`.

### Calculator preț (desktop-only, ascuns mobil)
**Formula:**
```js
base = posts*35 + videos*280;
base *= (1 + (platforms-1)*0.08);
if(rush) base *= 1.2;
if(posts>=20 || videos>=6) base *= 0.78;
if(posts>=30 || videos>=10) base *= 0.88;
total = Math.max(450, Math.round(base/10)*10);
```
**UI:** 3 slider (posts, videos, platforms) + 2 toggle (rush, strategie default on) + output `total + " RON/lună"` + badge "Economie până la 40%".

### FAQ (native HTML)
6 items în structură `<div class="faq-item">` + `<button class="faq-q">` + SVG icon + `<div class="faq-a"><div class="faq-a-inner">`. Handler JS force-bound cu 3 triggere (DOMContentLoaded + 500ms + 2000ms). CSS `.faq-item.open .faq-a{max-height:2000px}`.

### Footer (4 coloane)
```
[Brand + tagline + 4 social icons] [Servicii] [Companie] [Contact + WhatsApp CTA]
----------------------------------------------------------------
© 2026 i-vory Creative · CUI 51276958 | Termeni · Privacy · Cookies · GDPR
```

---

## 5. MOBILE OPTIMIZATIONS

### Hidden on mobile (`@media(max-width:900px){display:none}`)
- Client marquee (.mq)
- Chat widget (.cw)
- Calculator (.calc-wrap)
- Comparison table (.cmp-wrap)
- Workflow timeline (.wti-wrap)
- Testimonial carousel (.tc-wrap)
- Exit-intent modal (.ei-ov)
- Case study modal trigger (.cs-ov)

### Mobile-specific CSS
```css
@media(max-width:900px){
  html,body{overflow-x:clip;max-width:100vw}
  nav{padding:.45rem .8rem;min-height:54px}
  nav .nl img{height:32px}
  .nk{display:none}
  .s2{display:block;min-height:auto;padding:3.5rem 1.2rem 2.5rem;text-align:center}
  .s2-content{flex:none;max-width:100%;width:100%;margin:0 auto}
  .hero-video{display:block;position:relative;margin:1.5rem auto 0;width:260px;height:462px}
  .sec{padding:3rem 1rem}
  .si{padding:2rem 1.2rem;border-radius:18px}
  
  /* Perf boost */
  .sec:not(#faq),section[class*="s"]:not(#faq),.cw,footer{
    content-visibility:auto;
    contain-intrinsic-size:auto 600px;
  }
  .prob-line,.bh,.si,.proof-item,.ft-wrap,.mq,.tc-card{
    will-change:transform;
    transform:translateZ(0);
    backface-visibility:hidden;
  }
  body::before{background-size:800px 800px;opacity:.4}
  nav{backdrop-filter:blur(8px)}
  
  /* Kill hyphenation */
  *{word-break:normal;overflow-wrap:normal;hyphens:none}
  .proof-label{white-space:nowrap;font-size:.62rem}
}
```

### Counter fallback mobile
```html
<script>
(function(){
  if(window.innerWidth > 900) return;
  setTimeout(function(){
    document.querySelectorAll('.proof-num[data-target]').forEach(function(el){
      if(el.textContent.trim()==='0'){
        var target = parseInt(el.dataset.target)||0, start=Date.now(), dur=1500;
        (function tick(){
          var p = Math.min(1,(Date.now()-start)/dur);
          el.textContent = Math.floor(target*(1-Math.pow(1-p,3)));
          if(p<1) requestAnimationFrame(tick);
          else el.textContent = target;
        })();
      }
    });
  }, 1200);
})();
</script>
```

---

## 6. PERFORMANCE

### `_headers` (Cloudflare)
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin

/*.html
  Cache-Control: public, max-age=600, stale-while-revalidate=3600

/*.css, /*.js, /*.svg, /*.woff2
  Cache-Control: public, max-age=31536000, immutable

/*.jpg, /*.jpeg, /*.png, /*.webp, /*.mp4
  Cache-Control: public, max-age=2592000
```

### Resource hints (in `<head>`)
```html
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://api.whatsapp.com">
<meta name="theme-color" content="#04060e">
```

### Lazy loading
- Toate `<img>` au `loading="lazy" decoding="async"`
- Toate `<script src>` externe au `defer`
- GA4 load pe `requestIdleCallback` la window.load

---

## 7. SEO / AEO

### Meta obligatorii
```html
<title>i-vory Creative - Agenție Social Media București | TikTok Instagram Facebook</title>
<meta name="description" content="...maxim 155 char, include prețuri + platforme">
<link rel="canonical" href="https://i-vory.ro/">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://i-vory.ro/og-image.jpg">
<meta property="og:type" content="website">
<meta name="geo.position" content="44.4268;26.1025">
<link rel="alternate" hreflang="ro-RO" href="https://i-vory.ro/">
```

### Schema.org (5 entități JSON-LD)
1. **LocalBusiness** — nume, adresă, geo, hours, phone, priceRange
2. **Organization** — founder, sameAs social profiles
3. **Service + OfferCatalog** — 5 oferte cu price, priceCurrency RON
4. **WebSite** — SearchAction potential
5. **FAQPage** — 6 Question/Answer din FAQ-ul paginii

### /llms.txt
Fișier text cu descriere brand + pachete + contact, pentru AI crawlers (ChatGPT, Claude, Perplexity).

### OG image generation (Chrome headless)
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="C:\Users\USER\Documents\i-vory\deploy\og-image.jpg" --window-size=1200,630 "file:///C:/Users/USER/Documents/i-vory/I-VORY%20sITE/og-image.svg"
```

---

## 8. DIACRITICS WORKFLOW (Python-based)

### De ce Python, nu PowerShell
PS parser corupe: `ă → Ä‚`, `ț → È›`, `—` → eșec sintactic. Python cu explicit UTF-8 encode/decode rezolvă 100%.

### Template fix mojibake
```python
import os
DEPLOY = r"C:\Users\USER\Documents\i-vory\deploy"

MOJI = [
    ("\u00c3\u00a2", "\u00e2"),   # Ã¢ → â
    ("\u00c3\u00ae", "\u00ee"),   # Ã® → î
    ("\u00c8\u203a", "\u021b"),   # È› → ț
    ("\u00c8\u2122", "\u0219"),   # È™ → ș
    ("\u00c4\u201a", "\u0102"),   # Ă
    ("\u00c4\u0192", "\u0103"),   # ă
    ("\u00e2\u20ac\u201d", "\u2014"),  # — em dash
    ("\u00ef\u00bf\u00bd", ""),   # stray replacement char
]

for root, _, files in os.walk(DEPLOY):
    if ".git" in root: continue
    for fn in files:
        if not fn.endswith((".html", ".md", ".xml")): continue
        p = os.path.join(root, fn)
        with open(p, "rb") as f:
            raw = f.read()
        try: s = raw.decode("utf-8")
        except: s = raw.decode("latin-1")
        orig = s
        for k,v in MOJI: s = s.replace(k,v)
        if s != orig:
            with open(p, "wb") as f: f.write(s.encode("utf-8"))
```

### Template word-level diacritics (fără → cu)
```python
import re
WORDS = {
    "pana":"până", "Bucuresti":"București", "continut":"conținut",
    "agentie":"agenție", "saptamana":"săptămână", "stim":"știm",
    "dureaza":"durează", "raspuns":"răspuns", "pacientii":"pacienții",
    "Romania":"România", "functioneaza":"funcționează",
    # ~50 common words — extend as needed
}
for k,v in WORDS.items():
    s = re.sub(r"\b" + re.escape(k) + r"\b", v, s)
```

---

## 9. IMAGE/VIDEO PIPELINE

### Compression commands (ffmpeg)
```powershell
$ff = "C:\Users\USER\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe"

# Images (carousel slides) — 1080px wide JPG quality 5
& $ff -i $src -vf "scale=1080:-2" -q:v 5 -y $dst

# Video vertical 9:16 TikTok — 540p H.264 CRF 28
& $ff -i $src -vf "scale=540:-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k -movflags +faststart -y $dst

# Video cinematic — 720p H.264
& $ff -i $src -vf "scale=720:-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 96k -movflags +faststart -y $dst
```

### Asset naming convention (case/xxx-assets/)
- `c1_N.jpg` — carusel 1, slide N
- `p1_N.jpg` — post 1, slide N
- `v1_NAME.mp4` — video 1 cu nume descriptiv

### Diacritice în nume fișiere
Windows folosește Unicode pentru nume, dar PS pierde diacriticile uneori. Use wildcards: `Get-ChildItem -Filter "*asmr*"`.

---

## 10. WORKER (BOOKING)

### Resend setup
1. Domeniu: `https://resend.com/domains/7bc2b873-3cdf-4a0d-9940-f04206513071`
2. Adaugă DNS records în Cloudflare (TXT + MX)
3. Verify → create API key `re_xxxxx`
4. Set secret în wrangler: `npx wrangler secret put RESEND_API_KEY`

### Deploy
```powershell
cd C:\Users\USER\Documents\i-vory\worker
npx wrangler login
npx wrangler deploy
# Output: https://ivory-booking.<subdomain>.workers.dev
```

### Endpoint behavior
- POST /book → creates .ics cu 2 VALARM (-PT24H, -PT30M), emails client + contact@i-vory.ro
- POST /lead → exit-intent form captures

### Update BOOKING_ENDPOINT
În `index.html` și exit-intent modal: `var BOOKING_ENDPOINT = "https://ivory-booking.YOUR-SUBDOMAIN.workers.dev";`

---

## 11. COMMON BUGS & FIXES

### "overflow-x:hidden breaks position:sticky"
→ Use `overflow-x:clip` pe html și body.

### "Mobile layout varza" 
→ Force `display:block !important` pe secțiuni flex la `@media(max-width:900px)`.

### "Three.js hero fills whole page, blocks clicks"
→ `position:fixed` + `pointer-events:none` pe canvas.

### "Counters stuck at 0 mobile"
→ IntersectionObserver nu declanșează → adaugă setTimeout fallback la 1200ms (vezi §5).

### "FAQ nu se deschide"
→ `content-visibility:auto` anulează `scrollHeight` → fix: `.sec:not(#faq)` + fixed `max-height:2000px`.

### "PowerShell rupe string cu diacritice"
→ **Nu folosi PS pentru RO strings**. Scrie Python script cu UTF-8 explicit.

### "Mojibake Â· / â†' / âœ"
→ Bytes din fișier sunt de fapt corecte (`\xc2\xb7` = ·). Cache browser. Hard refresh Ctrl+Shift+R.

### "Git push refuză — LF/CRLF warnings"
→ Warning benign, nu eroare. Push merge.

---

## 12. SAFE EDITING WORKFLOW

```
1. Backup mental: dacă modific >30 linii, verific cu Get-Item .Length înainte
2. Edit source: I-VORY sITE/ivory-v7.html (via Python)
3. Copy la deploy/index.html
4. Sau edit direct deploy/index.html și copy înapoi la source
5. git add + commit cu mesaj descriptiv
6. git push origin main
7. Wait 30-60s
8. Verify: curl.exe -s https://i-vory.ro/ | findstr "SOMETHING_UNIQUE_FROM_EDIT"
9. Dacă NU apare → check commit log, verifică că push-ul a trecut
10. Dacă apare în curl dar nu în browser → cache browser, Ctrl+Shift+R
```

---

## 13. PENDING TASKS (roadmap)

### Immediate
- [ ] Resend domain verification
- [ ] Deploy Cloudflare Worker (booking)
- [ ] Update BOOKING_ENDPOINT constants
- [ ] Google Search Console + sitemap submit
- [ ] Google Business Profile

### Content
- [ ] Extended portfolio (Ghibu, Iorga, Popa folders cu assets reale)
- [ ] Testimonial video clips reale (3 MP4s pentru tc-cards)
- [ ] Blog: 5 articole SEO RO (partial started in /blog/)
- [ ] Instagram feed live embed (Basic Display API token needed)

### Directory listings
Clutch, Sortlist, TechBehemoths, GoodFirms, DesignRush, Agency Spotter — Andy creează conturi, Claude pregătește copy.

### Enhancements
- Scroll-triggered planet flyby pe s2 (Three.js)
- Before/After slider pe case pages
- Schema.org Article pe blog posts
- Cloudflare Turnstile pe forms (anti-spam)

---

## 14. CONTACT INFO (site-wide)

- **Email:** contact@i-vory.ro
- **Telefon:** +40 775 579 706
- **WhatsApp:** `https://wa.me/40775579706`
- **Instagram:** `https://www.instagram.com/ivory.creative.social.media`
- **TikTok:** `https://www.tiktok.com/@ivory.ro69`
- **Legal entity:** I-RENT ENTERPRISES S.R.L. · CUI 51276958 · București, România

---

## 15. PREMIUM FEATURES INVENTORY (desktop)

- Three.js hero scene (3D elephant + video mockup)
- Custom cursor magnetism (elephant rotates ±15° Y, ±9° X following mouse)
- Scrollytelling prob section (2 slides cross-fade)
- Client marquee infinite scroll
- Price calculator live update
- Comparison table 4-way matrix
- Exit-intent modal
- WhatsApp chat widget bottom-right cu smart pre-populated messages
- Workflow timeline animated
- Testimonial carousel (3 video cards 9:16)
- Counter animation on scroll (IntersectionObserver)
- Portfolio grid hover lift + glow
- Lightbox cu keyboard nav (UrbanCat gallery)
- Premium footer 4 columns

**Mobile preserve:** toate animațiile fade-in, counter, prob scroll, transitions. Hide doar features care nu se traduc bine în 375px (calc, comparison, widgets flotante).

---

## 16. GIT HISTORY MILESTONES (reverse chron)

```
3dcc854  faq: force-bind handler with multiple timing fallbacks
be7978d  case pages: strip all fake Provocarea/Solutia/Rezultat content
eafb3b6  mobile: counter fallback + kill word hyphens + perf
046ee67  mobile perf: content-visibility + GPU + idle GA + _headers cache
ae9692c  hero prob: 200vh -> 150vh faster scroll for 2 slides
fbc0c62  hero: 5 slides to 2 (intro + combined closing)
55598a8  footer force inject + legal pages (terms/privacy/cookies/gdpr)
a8dcc2f  footer: premium 4-col with brand/services/company/contact
6d9a897  diacritics final: FAQ + calculator + mojibake bytes
fef0992  diacritics: force Romanian chars across all HTML
b34b858  python: fix all mojibake + clean mobile CSS rewrite
85cc6d4  rename case study to caz (RO)
671a966  urbancat case: full gallery with 9 items, tabs, lightbox, 38 assets
b583d15  portfolio dedicated pages /portfolio.html + /case/*.html
4a1a9a8  workflow timeline + testimonials + case study modals
cbb6b61  pricing comparison table + exit-intent modal
5a3a484  elephant magnetism cursor tracking
4571700  price calculator + marquee + whatsapp chat widget
```

---

**END OF SKILL FILE v2.0**

Pentru rebuild complet: citește §0 înainte de orice, apoi §1-§6 pentru infrastructure, §7-§10 pentru content, §11-§13 pentru troubleshooting + roadmap. Orice editare file: Python-first, verify post-deploy cu curl.
