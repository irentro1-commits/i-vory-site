# HYPERPREMIUM LANDING PAGE SKILL v1.1 — ADDENDUM
**Ultima actualizare: 13 Aprilie 2026**
**Atenție:** Acest fișier EXTINDE v1.0. Păstrează v1.0 intact ca referință "known-working". v1.1 adaugă secțiuni §22-§45 cu tech 2026, advanced interactions, micro-copy, integrări, security, și pattern-uri nu au fost testate încă în i-vory dar sunt industry-validated.

**Strategie folosire:**
- **Client buget standard (5-10k€)** → folosește v1.0 integral
- **Client premium++ (10-25k€)** → v1.0 + selectiv din v1.1
- **Client enterprise/flagship (25k€+)** → v1.0 + v1.1 complet

---

## 22. 2026 DESIGN TRENDS (research-backed)

### Trend-uri validate pe piața premium 2025-2026
1. **Brutalist-meets-editorial** — typografie masivă (clamp 8vw+), layout asimetric, culori neașteptate (oxblood, sage, peach)
2. **Spatial/3D depth** — parallax layers multiple, mouse-follow rotations, glassmorphism RAFINAT (nu abuzul de 2022)
3. **Bentolayouts** — grid-uri cu card-uri de dimensiuni variabile (Apple style), fiecare cu rol informativ distinct
4. **Kinetic typography** — text se mișcă bazat pe scroll/mouse/audio
5. **Cursor cinematic** — custom per secțiune (săgeată / pix / ochi / cruce)
6. **Grain + film texture** — overlay SVG noise 2-4% pentru "photographic feel"
7. **OKLCH colors** — culori calibrate perceptual, gradient-uri fără muddy middle
8. **Variable fonts** — 1 fișier font cu axe variabile (weight, width, optical size) → bandwidth redus
9. **Scroll-driven animations CSS native** — `animation-timeline: scroll()` (fără JS)
10. **View transitions** — tranziții fluide între pagini ca-n SPA, dar cu HTML static

### Trend-uri evitate (cliché 2026)
- Glassmorphism pur (abuzat 2021-2023, acum "hotel website")
- Neumorphism (didn't age well)
- Auroral gradients "holographic" (TikTok filter look)
- Memphis pattern / 90s revival (overused)
- Hand-drawn squiggles (Stripe-imitation)
- Blob shapes generice (free icon sets)

---

## 23. ADVANCED THREE.JS (beyond hero spin)

### GLTF models (produse reale 3D)
```js
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/loaders/GLTFLoader.js';
const loader = new GLTFLoader();
loader.load('/assets/product.glb', gltf => {
  const model = gltf.scene;
  model.scale.set(2, 2, 2);
  model.traverse(child => {
    if(child.isMesh){
      child.castShadow = true;
      child.material.envMapIntensity = 1.5;
    }
  });
  scene.add(model);
});
```
Tools pentru GLTF: Blender (free export), KhronosGroup/glTF-Sample-Viewer. Compress cu `gltfpack -c`.

### Post-processing (bloom, chromatic aberration)
```js
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.160/examples/jsm/postprocessing/UnrealBloomPass.js';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloom);
// în animate: composer.render() în loc de renderer.render()
```

### Custom shader materials (wow factor real)
```glsl
// Vertex shader uniform scroll-based distortion
uniform float uTime;
uniform float uScroll;
varying vec2 vUv;
void main(){
  vec3 pos = position;
  pos.z += sin(pos.x * 3.0 + uTime) * 0.1 * uScroll;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  vUv = uv;
}
```
Bibliotecă scurtă: glslCanvas, OGL (lightweight alternative to Three.js 30KB vs 600KB).

### Physics (Rapier.js pentru collision, gravity real)
```js
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat';
await RAPIER.init();
const world = new RAPIER.World({x:0, y:-9.81, z:0});
```
Use case: particule fizice care reacționează la cursor, produse care cad + se așază, logo-uri care se ciocnesc.

### Performance rules advanced
- **InstancedMesh** pentru >100 copii ale aceluiași obiect (particule, grid)
- **LOD (Level Of Detail)** — obiecte simpler când sunt departe de cameră
- **Frustum culling** — render doar ce e vizibil
- **Texture compression** — KTX2/Basis pentru GPU memory ⅕ din PNG
- **Draco compression** — geometrii GLTF 5-10× mai mici

---

## 24. CSS 2026 (features pe care le poți folosi ACUM)

### Container queries (component-level responsive)
```css
.card{container-type:inline-size;container-name:card}
@container card (min-width: 400px){
  .card-title{font-size:1.5rem}
  .card-content{flex-direction:row}
}
```
Folosește când ai componente reutilizabile în contexte diferite (sidebar vs main).

### `:has()` parent selector
```css
/* Card care conține video → border diferit */
.card:has(video){border-color:var(--am)}
/* Nav care are item activ → ascunde logo */
nav:has(.active){padding-left:1rem}
/* Form cu erori → background roșu subtle */
form:has(:invalid){background:rgba(255,0,0,.02)}
```

### View Transitions API (cross-page smooth)
```html
<meta name="view-transition" content="same-origin">
```
```css
::view-transition-old(root){animation:fade-out .3s}
::view-transition-new(root){animation:fade-in .3s}
@keyframes fade-out{to{opacity:0}}
@keyframes fade-in{from{opacity:0}}
```
Navigări între pagini HTML static = fluid ca SPA, zero JS.

### Scroll-driven animations (fără JS)
```css
@keyframes slideIn{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
.rv{animation:slideIn linear;animation-timeline:view();animation-range:entry 0% cover 30%}
```
Deja supportat în Chrome 115+. Progressive enhancement — browsers vechi văd element final.

### CSS anchor positioning (popovers, tooltips)
```css
.btn{anchor-name:--btn-anchor}
.tooltip{position:absolute;position-anchor:--btn-anchor;top:anchor(top);left:anchor(center)}
```

### `@property` (typed CSS custom props → animate orice)
```css
@property --gradient-angle{syntax:'<angle>';inherits:false;initial-value:0deg}
.card{background:linear-gradient(var(--gradient-angle),...);transition:--gradient-angle 1s}
.card:hover{--gradient-angle:360deg}
```

### OKLCH colors (perceptually uniform)
```css
:root{
  --brand: oklch(70% 0.15 180);     /* teal */
  --brand-dark: oklch(40% 0.15 180); /* același hue, mai închis */
}
```
Avantaj: gradient-uri fără "muddy middle", dark mode switch clean.

### Cascade layers (@layer)
```css
@layer reset, tokens, components, utilities, overrides;
@layer reset{*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}}
@layer components{.btn{...}}
@layer utilities{.text-center{text-align:center}}
```
Rezolvă 90% din specificity wars fără `!important`.

---

## 25. MICRO-INTERACTIONS CATALOG

### Button states (complete lifecycle)
```css
.btn{
  position:relative;overflow:hidden;
  transform:translateY(0);transition:transform .2s var(--e),box-shadow .2s var(--e);
}
.btn:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(0,224,192,.4)}
.btn:active{transform:translateY(0) scale(.98);transition-duration:.1s}
.btn:focus-visible{outline:2px solid var(--ac);outline-offset:3px}
.btn[aria-busy="true"]{pointer-events:none;opacity:.7}
.btn[aria-busy="true"]::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:shimmer 1.5s infinite}
```

### Form inline validation
```html
<input type="email" required pattern="[^@]+@[^@]+\..+" aria-describedby="email-err">
<span id="email-err" class="err" hidden>Email invalid.</span>
```
```css
input:user-invalid{border-color:var(--am)}
input:user-invalid ~ .err{display:block}
input:user-valid{border-color:var(--ac)}
input:user-valid ~ .err{display:none}
```

### Skeleton screens (loading states)
```css
.skeleton{background:linear-gradient(90deg,rgba(255,255,255,.05) 25%,rgba(255,255,255,.1) 50%,rgba(255,255,255,.05) 75%);background-size:200% 100%;animation:skel 1.5s infinite;border-radius:8px}
@keyframes skel{0%{background-position:200% 0}100%{background-position:-200% 0}}
```

### Success confirmation (after form submit)
Lottie mic (5-15KB) — checkmark desenat animat. Sau SVG stroke-dasharray animation:
```css
.check-path{stroke-dasharray:50;stroke-dashoffset:50;animation:draw .6s var(--e) forwards}
@keyframes draw{to{stroke-dashoffset:0}}
```

### Text reveal (word by word)
```js
document.querySelectorAll('.reveal-text').forEach(el => {
  el.innerHTML = el.textContent.split(' ').map((w,i) => 
    `<span style="--i:${i}">${w}</span>`
  ).join(' ');
});
```
```css
.reveal-text span{display:inline-block;opacity:0;transform:translateY(20px);animation:wordIn .6s var(--e) calc(var(--i) * .05s) forwards}
@keyframes wordIn{to{opacity:1;transform:translateY(0)}}
```

### Image reveal masks (clip-path animation)
```css
.img-reveal{clip-path:inset(0 100% 0 0);animation:reveal 1.2s var(--e) forwards;animation-delay:.3s}
@keyframes reveal{to{clip-path:inset(0 0 0 0)}}
```

### Cursor customization per section
```css
.section-intro{cursor:url('/cursors/eye.svg') 12 12, auto}
.section-portfolio{cursor:url('/cursors/arrow.svg') 0 0, auto}
.section-contact{cursor:url('/cursors/pen.svg') 8 24, auto}
```
SVG cursor max 32×32, cu fallback `auto`.

### Parallax multi-layer (depth illusion)
```js
const layers = document.querySelectorAll('[data-parallax]');
addEventListener('scroll', () => {
  layers.forEach(l => {
    const speed = +l.dataset.parallax || .3;
    l.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
  });
}, {passive:true});
```
```html
<div data-parallax="0.2">Background layer</div>
<div data-parallax="0.5">Midground</div>
<div data-parallax="0.8">Foreground</div>
```

---

## 26. ACCESSIBILITY WCAG 2.2 AAA (competitive advantage)

### Must-haves (peste basic alt text)
1. **Focus visible pe TOATE interactive** — `:focus-visible` cu outline 2px accent
2. **Skip nav link** — `<a href="#main" class="skip">Sari la conținut</a>` (visible doar pe focus)
3. **Heading hierarchy** — h1 unic, h2 per secțiune, niciodată h3 fără h2
4. **Contrast AAA** — 7:1 body text, 4.5:1 large text (verifică cu WebAIM)
5. **Landmark roles** — `<nav>`, `<main>`, `<aside>`, `<footer>` + ARIA dacă e nevoie
6. **Form labels** — niciodată placeholder-only, mereu `<label for="x">`
7. **Error messages asociate** — `aria-describedby` pointing la mesaj eroare
8. **Live regions** — `aria-live="polite"` pentru confirmări asincron
9. **Reduced motion respect** — `@media(prefers-reduced-motion)` opresc animații
10. **High contrast mode** — test cu Windows HC, asigură border pe card-uri

### Screen reader specific
```html
<!-- Icon-only button -->
<button aria-label="Închide modal">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Decorative images -->
<img src="pattern.svg" alt="" role="presentation">

<!-- Animated counter (SR reads only final value) -->
<div aria-live="polite">
  <span aria-hidden="true">142</span>   <!-- animation -->
  <span class="sr-only">142 clienți</span>
</div>

<!-- SR-only class -->
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
```

### Keyboard navigation
- Tab order logic (nu folosi `tabindex > 0`)
- Escape închide modale
- Arrow keys navighează carousel-uri
- Enter activează butoane custom (`role="button"`)
- Space toggle checkbox/accordion

### Testing tools
- **Chrome Lighthouse Accessibility** — quick check
- **axe DevTools** — detailed issues
- **NVDA** (Windows free) — real screen reader test
- **Keyboard only navigation** — scoate mouse-ul, merge tot site-ul?

---

## 27. DARK/LIGHT MODE SYSTEM

### Theme switcher pattern
```html
<button id="theme-toggle" aria-label="Schimbă temă">
  <svg class="sun">...</svg>
  <svg class="moon">...</svg>
</button>
```
```css
:root{color-scheme:dark}
:root[data-theme="light"]{
  --ink: #fafaf7;
  --ti:  #0a0a0a;
  --td:  #3a3a3a;
  /* ...rest override */
  color-scheme:light;
}
@media(prefers-color-scheme:light){
  :root:not([data-theme]){--ink:#fafaf7;...}
}
```
```js
const saved = localStorage.getItem('theme');
if(saved) document.documentElement.dataset.theme = saved;
themeToggle.addEventListener('click', () => {
  const cur = document.documentElement.dataset.theme;
  const next = cur === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
});
```

---

## 28. COOKIE BANNER (GDPR 3 tiers)

### Template compliant
```html
<div class="cookie-banner" id="cookieBanner" hidden>
  <p>Folosim cookies pentru experiență, analytics și marketing. <a href="/cookies.html">Detalii</a>.</p>
  <div class="cookie-actions">
    <button data-cookie="all">Acceptă toate</button>
    <button data-cookie="essential">Doar esențiale</button>
    <button data-cookie="custom" aria-expanded="false">Personalizează</button>
  </div>
  <div class="cookie-custom" hidden>
    <label><input type="checkbox" checked disabled> Esențiale (mereu active)</label>
    <label><input type="checkbox" name="analytics"> Analytics (GA4)</label>
    <label><input type="checkbox" name="marketing"> Marketing (retargeting)</label>
    <button>Salvează preferințele</button>
  </div>
</div>
```
```js
const consent = localStorage.getItem('cookieConsent');
if(!consent) cookieBanner.hidden = false;

// Load GA4 ONLY dacă consent analytics
if(consent && JSON.parse(consent).analytics){
  loadGA4();
}
```

**Rule 2026:** Nu încarci GA/Meta Pixel ÎNAINTE de consent. Penalty GDPR = până la 4% cifră de afaceri.

---

## 29. ANALYTICS ALTERNATIVES (privacy-first)

### Opțiuni ranked
| Tool | Preț | GDPR-ready | Cookie-less |
|------|------|-----------|-------------|
| **Plausible** | $9/mo 10K views | ✓ EU-hosted | ✓ |
| **Umami** | Free self-host | ✓ | ✓ |
| **Simple Analytics** | $19/mo | ✓ Dutch company | ✓ |
| **Fathom** | $15/mo | ✓ Canada + EU servers | ✓ |
| **Microsoft Clarity** | Free | ~ (US) | uses cookies |
| **GA4** | Free | ⚠️ complex DPA | yes |

Pentru clienți privacy-conscious (avocați, medici, finance) — recomand Plausible sau Umami. Pentru e-commerce cu conversion tracking — GA4 + Consent Mode V2 + server-side GTM.

---

## 30. FORM UX ADVANCED

### Honeypot anti-bot
```html
<input type="text" name="company_url" style="position:absolute;left:-9999px" tabindex="-1" autocomplete="off">
```
Bot-urile completează auto, humans nu văd. Server: dacă field e populat → ignore.

### Rate limiting (Cloudflare)
Pe Worker: 5 submissions / 10 min / IP. Response 429 cu mesaj prietenos.

### Honeypot + timestamp
```js
const formStart = Date.now();
form.addEventListener('submit', e => {
  const elapsed = Date.now() - formStart;
  if(elapsed < 3000){ // bot filled in <3s
    e.preventDefault();
    return;
  }
});
```

### Optimistic UI
Afișează "Mulțumim!" IMEDIAT după submit, retry în background dacă fail.
```js
form.addEventListener('submit', async e => {
  e.preventDefault();
  showSuccess();  // UI optimist
  try{
    await sendToWorker(formData);
  }catch(err){
    showRetry();  // doar dacă fail
  }
});
```

### Conditional fields
Arată/ascunde bazat pe selecție anterioară:
```html
<select name="type">
  <option value="">Alege...</option>
  <option value="ecom">E-commerce</option>
  <option value="service">Servicii</option>
</select>
<div data-show-when="type=ecom" hidden>
  <label>Număr produse</label>
  <input type="number">
</div>
```

### Multi-step forms
Progresiv: 3 pași max. Bara progres sus. Validare per pas. Save draft în localStorage (recovery după refresh accidental).

---

## 31. PAYMENT INTEGRATIONS (România)

### Stripe Elements (cel mai rapid setup)
- Suportă RON
- Checkout hosted sau Elements embedded
- Subscriptions native
- Cost: 1.4% + 0.25€ EU cards

### PayU România (local preferat)
- Integrare mai complexă (OPU API)
- Cost: 1-2% negociabil cu volum
- Procesare direct RON

### NetopiaGate (alternative RO)
- Similar PayU
- Suport bun

### Mollie (EU-wide)
- UX bună
- Support iDEAL, Sofort, SEPA
- Cost: 1.8% + 0.25€

**Recomandare default:** Stripe Checkout pentru global. PayU dacă client insistă pe RON-only.

---

## 32. BOOKING SYSTEMS (alternative la Calendly)

| Tool | Free tier | Branding | Teams |
|------|-----------|----------|-------|
| **Cal.com** | Free open-source | ✓ custom subdomain | ✓ |
| **Calendly** | Free 1 type | ~ paid removes | Paid |
| **SavvyCal** | $12/mo | ✓ | ✓ |
| **TidyCal** | $29 lifetime | ✓ | ✓ |
| **Zcal** | Free | ✓ | ✓ |

Integrare embed:
```html
<div id="cal-inline" style="min-height:600px"></div>
<script src="https://cal.com/embed.js"></script>
<script>Cal("inline",{elementOrSelector:"#cal-inline",calLink:"your-username/30min"})</script>
```

---

## 33. SOCIAL PROOF WIDGETS

### Opțiuni fără coding
- **Senja.io** — testimoniale (video + text) în cards stilate, embed JS
- **Testimonial.to** — video walls
- **Trustpilot widget** — stars live
- **Google Reviews widget** — Elfsight $6/mo sau custom cu Places API

### Custom (recomandat pentru brand coherence)
Salvează testimoniale în JSON local + display cu same styling ca site-ul. Zero dependencies.

---

## 34. SECURITY HEADERS (2026 complete)

### `_headers` Cloudflare (obligatoriu)
```
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.resend.com https://*.workers.dev;
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Embedder-Policy: credentialless
```

### SRI (Subresource Integrity) pentru CDN
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
        integrity="sha512-..." 
        crossorigin="anonymous"></script>
```
Generate cu: `curl URL | openssl dgst -sha512 -binary | openssl base64 -A`

### Bot protection
Cloudflare Turnstile (free, invisible reCAPTCHA alternative):
```html
<div class="cf-turnstile" data-sitekey="YOUR_KEY"></div>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js"></script>
```

---

## 35. PWA LITE (app-like without heavy)

### manifest.json
```json
{
  "name": "Brand Name",
  "short_name": "Brand",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#04060e",
  "theme_color": "#04060e",
  "icons": [
    {"src":"/icon-192.png","sizes":"192x192","type":"image/png"},
    {"src":"/icon-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}
  ]
}
```
```html
<link rel="manifest" href="/manifest.json">
```
Users pot "Add to home screen" → launcher icon, no browser chrome.

### Service Worker minimal (offline fallback)
```js
// sw.js
self.addEventListener('install', e => {
  e.waitUntil(caches.open('v1').then(c => c.addAll(['/','/offline.html'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match('/offline.html')));
});
```

---

## 36. IMAGE OPTIMIZATION ADVANCED

### Progressive loading cu BlurHash
```js
import { decode } from 'https://cdn.skypack.dev/blurhash';
// Server generează hash la upload: "LGF5?xYk^6#M@-5c,1J5@[or[Q6."
const pixels = decode(hash, 32, 32);
// Render pe canvas → blur → fade în image real când se încarcă
```

### Native LQIP (low-quality image placeholder)
```html
<img src="hero-lqip.jpg" data-src="hero-full.jpg" class="lazy-blur">
```
```css
.lazy-blur{filter:blur(10px);transition:filter .5s}
.lazy-blur.loaded{filter:blur(0)}
```

### AVIF/WebP fallback chain
```html
<picture>
  <source srcset="img.avif" type="image/avif">
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="...">
</picture>
```
AVIF: 30% mai mic decât WebP, decode cost mai mare (CPU mobil). Use pentru hero images.

### Responsive images `srcset`
```html
<img 
  srcset="hero-480.jpg 480w, hero-800.jpg 800w, hero-1200.jpg 1200w, hero-1920.jpg 1920w"
  sizes="(max-width:600px) 480px, (max-width:1024px) 800px, 1200px"
  src="hero-1200.jpg"
  alt="...">
```
Cloudflare Images auto-generates variants.

---

## 37. VIDEO OPTIMIZATION ADVANCED

### AV1 codec (cel mai eficient 2026)
```
ffmpeg -i input.mp4 -c:v libsvtav1 -crf 30 -preset 8 -c:a libopus -b:a 96k output.av1.webm
```
30-50% mai mic decât H.264, native browser support (Chrome 113+, Firefox 113+).

### HLS adaptive (streaming lung videoclip)
```
ffmpeg -i input.mp4 -codec: copy -start_number 0 -hls_time 6 -hls_list_size 0 -f hls output.m3u8
```
Client încarcă bazat pe bandwidth. Folosește hls.js pentru player.

### Autoplay muted pe mobil
```html
<video autoplay muted loop playsinline poster="hero.jpg">
  <source src="hero-540.av1.webm" type="video/webm; codecs=av01.0.05M.08">
  <source src="hero-540.mp4" type="video/mp4">
</video>
```
`playsinline` obligatoriu iOS.

---

## 38. FONT OPTIMIZATION

### Variable fonts (1 fișier, toate greutățile)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..900&display=swap" rel="stylesheet">
```
```css
body{font-family:Inter;font-variation-settings:"wght" 400}
h1{font-variation-settings:"wght" 800}
```

### Subset font (doar chars folosite)
Tool: glyphhanger (npm) sau Fonttools (Python).
```
pyftsubset font.ttf --unicodes="U+0020-007E,U+0102,U+0103,U+00C2,U+00E2,U+00CE,U+00EE,U+0218,U+0219,U+021A,U+021B" --flavor=woff2
```
Output: RO alphabet + ASCII = ~15KB vs 150KB full font.

### Self-host fonts (control + privacy)
Download de pe fonts.google.com → self-host în `/fonts/`. Beneficii: no third-party, faster (Cloudflare cache), GDPR-friendly.

---

## 39. i18n STRATEGY (RO/EN dual)

### Architecture
- Un fișier HTML per limbă: `/index.html` (RO default), `/en/index.html`
- SAU content switcher JS cu `<span data-i18n="key">fallback</span>` + JSON dicționar

### SEO corect
```html
<link rel="alternate" hreflang="ro-RO" href="https://brand.ro/">
<link rel="alternate" hreflang="en" href="https://brand.ro/en/">
<link rel="alternate" hreflang="x-default" href="https://brand.ro/">
```

### Language switcher UX
Dropdown simplu în nav. Salvează preferință în `localStorage`. Auto-detect `navigator.language` la prima vizită, dar lasă user override.

### Localization beyond text
- **Date format:** `Intl.DateTimeFormat('ro-RO').format(new Date())`
- **Number/currency:** `(2040).toLocaleString('ro-RO', {style:'currency', currency:'RON'})`
- **Telefon:** +40 în RO, + cod țară în EN
- **Adresă:** format RO "Strada X nr. Y" vs EN "123 X Street"

---

## 40. ERROR/EMPTY/SUCCESS STATES

### 404 page design
Nu "404 Page Not Found". Creativ:
- Glitch effect pe text
- Buton home + search
- Easter egg (click logo 5× revelă ceva)
- Respects brand voice

### Empty state (portofoliu gol etc)
```html
<div class="empty">
  <svg class="empty-illustration">...</svg>
  <h3>Încă nu ai proiecte aici.</h3>
  <p>Primele 3 proiecte apar când finalizezi un caz.</p>
  <button>Adaugă primul proiect</button>
</div>
```

### Error state (form fail)
```html
<div role="alert" class="err-state">
  <svg>⚠</svg>
  <div>
    <strong>A apărut o eroare.</strong>
    <p>Nu ne pudem trimite mesajul. Încearcă din nou sau scrie-ne pe WhatsApp.</p>
    <button>Reîncearcă</button>
  </div>
</div>
```

### Maintenance page (offline)
Separat `/maintenance.html` cu branded design. Cloudflare rule: redirect toate requests la asta în timpul update-urilor.

---

## 41. MONITORING & OBSERVABILITY

### Uptime
- **Better Stack** (ex Better Uptime) — free 10 monitors, 3min check, SMS alert
- **UptimeRobot** — free 50 monitors, 5min check
- **Cronitor** — pentru cron jobs (newsletter, backup)

### Error tracking
- **Sentry** — free 5K errors/mo, JS + backend
- Self-host cu Glitchtip (alternative open-source)

### Real User Monitoring (RUM)
- **Cloudflare Web Analytics** — free, privacy-first, CWV built-in
- **SpeedCurve** — paid, deeper waterfalls
- **Vercel Analytics** — dacă ești pe Vercel

### Alerting
- Slack webhook pentru form submits, errors critical
- Discord pentru team notifications
- Email backup pentru everything

---

## 42. A/B TESTING (Cloudflare Pages Functions)

### Simple variant split
```js
// functions/_middleware.js
export async function onRequest({ request, next }){
  const cookies = request.headers.get('Cookie') || '';
  let variant = cookies.match(/variant=(\w+)/)?.[1];
  if(!variant){
    variant = Math.random() > 0.5 ? 'A' : 'B';
  }
  const res = await next();
  res.headers.set('Set-Cookie', `variant=${variant}; Path=/; Max-Age=2592000`);
  res.headers.set('X-Variant', variant);
  return res;
}
```
În HTML: `<meta name="variant" content="">` populated de Worker, JS citește și inject content.

### Tracking conversions
Fiecare variant are `data-variant="A"` pe CTA. Pe click → trimite event cu variant name. Măsoară conversion rate per variant în analytics.

**Regula:** Rulează min 2 săptămâni SAU 1000 conversii per variant înainte de decizie. Altfel statistic nesignificant.

---

## 43. ADVANCED SCHEMA.ORG

### Dincolo de LocalBusiness + FAQ
- **BreadcrumbList** — navigation breadcrumbs în SERP
- **Article** — blog posts (headline, datePublished, author, image)
- **Review + AggregateRating** — afișează ★★★★★ în SERP
- **Product** — e-commerce (price, availability, brand)
- **Event** — webinare, workshopuri
- **HowTo** — tutoriale pas-cu-pas
- **VideoObject** — videoclipuri (thumbnailUrl, uploadDate, duration)
- **Person** — autori, fondatori (sameAs LinkedIn, Twitter)

### Tool de validat
- **Schema.org Validator** (oficial)
- **Google Rich Results Test**
- **Bing Webmaster Tools** structured data inspector

### Pattern @graph (toate într-un script)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {"@type":"Organization","@id":"#org",...},
    {"@type":"WebSite","@id":"#site","publisher":{"@id":"#org"},...},
    {"@type":"WebPage","@id":"#page","isPartOf":{"@id":"#site"},...},
    {"@type":"FAQPage",...}
  ]
}
```

---

## 44. SPECULATIONRULES API (instant page loads)

### Prerender pages on hover (Chrome 110+)
```html
<script type="speculationrules">
{
  "prerender": [{
    "where": {"href_matches": "/case/*"},
    "eagerness": "moderate"
  }]
}
</script>
```
Când user hover pe link → Chrome pre-randerează pagina în background. Click = instant navigation (sub 100ms perceived).

**Cost:** Bandwidth dacă user nu dă click. `eagerness: "conservative"` (doar intenție clară) vs `"moderate"` (hover) vs `"eager"` (toate vizibile).

---

## 45. CREATIVE EXTRAS (wow moments)

### Easter eggs subtle
- **Konami code** (↑↑↓↓←→←→BA) → animație specială sau discount code
- **Click logo 5×** → revelă credits / playlist / joke
- **Scroll la final** → "thanks for scrolling" message personalizat

### Spatial audio (ambient)
Loop MP3 mic (30-60s, ~200KB) cu volume toggle. Spacious drone / hum subtle. Crește brand memorability. **Default OFF**, button play în corner.

### Gyroscope parallax (mobile tilt)
```js
addEventListener('deviceorientation', e => {
  const beta = e.beta / 90;  // -1 to 1
  const gamma = e.gamma / 90;
  document.querySelectorAll('[data-tilt]').forEach(el => {
    el.style.transform = `translate(${gamma*10}px, ${beta*10}px)`;
  });
});
```
Cere permission pe iOS: `DeviceOrientationEvent.requestPermission()`.

### Live visitor counter (social proof real-time)
Cloudflare Worker tracks active sessions (IP + TS în KV). Site fetches la 10s:
```html
<span class="live-count">• <span id="liveN">—</span> alții online acum</span>
```
Persuasion Cialdini (consensus).

### Generative grain overlay
```js
const canvas = document.getElementById('grain');
const ctx = canvas.getContext('2d');
function grain(){
  const d = ctx.createImageData(canvas.width, canvas.height);
  for(let i = 0; i < d.data.length; i += 4){
    const v = Math.random() * 30;
    d.data[i] = d.data[i+1] = d.data[i+2] = v;
    d.data[i+3] = 15;
  }
  ctx.putImageData(d, 0, 0);
  requestAnimationFrame(grain);
}
grain();
```
Overlay pe tot site-ul, opacity 3-5%. "Film stock" feel.

### Custom 404 as art piece
Three.js scene unică doar pentru 404 page — trebuie să fie atât de bună încât user-ul vrea SĂ se piardă accidental.

---

## 46. BUSINESS MODEL ADD-ONS

### Tier-uri extinse propuse (peste v1.0)
- **Maintenance plan** — 200-500€/lună pentru update-uri continue
- **Hosting managed** — 50-150€/lună markup pe Cloudflare Pro
- **A/B testing setup** — 1500€ one-time + 500€/lună iteration
- **SEO quarterly audit** — 800€/quarter cu report + implementation plan
- **Content production** — pachete lunare de 500-3000€ (integrezi serviciile i-vory aici)

### Upsell natural
1. Landing → Blog module (+2500€)
2. Landing → Booking system custom (+3000€)
3. Landing → Multi-page (3 pagini extra = +1500€ per pagină)
4. Landing → E-commerce lite (Stripe + 10 produse, +4000€)
5. Landing → Dashboard private (client area, +5000€)

---

## 47. SKILL COMPLEMENTARITY (ce NU e aici)

Skill-uri separate de creat pentru ecosistem complet:
- `brand-voice-skill.md` — tone of voice per nișă, arhetipuri Jung
- `conversion-copywriting-skill.md` — headlines, hooks, CTAs, formule PAS/AIDA/BAB
- `content-strategy-skill.md` — editorial calendar, personas, funnel mapping
- `infra-setup-skill.md` — Cloudflare/GitHub/domain/DNS de la 0
- `client-onboarding-skill.md` — discovery call script, contract template, kickoff
- `analytics-interpretation-skill.md` — cum citesti GA4/Clarity, ce acționezi
- `growth-hacks-skill.md` — referral loops, virality mechanics

---

## METADATA v1.1

**Status:** ADDENDUM la v1.0. Conține tech emerging 2026 + advanced patterns.
**Risc:** Unele features sunt cutting-edge (View Transitions, speculation rules) — browser support <100%. Folosește progressive enhancement.
**Testare:** Fiecare feature testează în target browsers client BEFORE livrare.
**Update pace:** v1.2 urmărește Baseline Newly Available (web-platform-dx.github.io/web-features) trimestrial.

**Autor:** Claude (Anthropic) + Andy @ i-vory Creative.
**Filosofie:** "Tools 2026, taste timeless."

---

**END ADDENDUM v1.1**
