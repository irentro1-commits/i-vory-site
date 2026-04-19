# HYPERPREMIUM LANDING PAGE SKILL v1.1 — COMPLETE
**Ultima actualizare: 13 Aprilie 2026**
**Scop:** Template complet reusabil pentru landing pages hiper-premium cu animații 3D, optimizate mobile-first. Acoperă DOAR designul + animațiile + stack-ul tehnic + integrări + securitate + advanced patterns 2026. Conținutul (texte, tone of voice, info brand) se adaugă după discovery call cu clientul.

**Structură:**
- §0-§21: FUNDAMENT stabil (v1.0) — tested pe i-vory.ro
- §22-§47: ADVANCED 2026 (v1.1) — tech emerging, integrări, advanced UX

**Filosofie:** "Tools 2026, taste timeless."

---

---

## 0. CÂND FOLOSEȘTI ACEST SKILL

**DA, folosește-l pentru:**
- Clienți care vor un landing page de 5000-15000€ (premium tier)
- Profesii unde aspectul = credibilitate (avocați top, clinici medicale elite, consultanți business)
- Brand-uri personale care vând expertise (coach, creator cu audiență)
- SaaS/startup care se lansează și vor să pară "real" din ziua 1
- E-commerce de nișă premium (max 20 SKU-uri, nu fashion volume)

**NU folosi pentru:**
- Magazin online cu 500+ produse (alege Shopify/WooCommerce)
- Blog cu 50+ articole/lună (alege Ghost/WordPress)
- App cu signup/dashboard/flows (asta nu e landing page, e aplicație web)
- Clienți cu buget sub 3000€ (nu merită efortul)

---

## 1. STACK TEHNIC (NON-NEGOCIABIL)

### Core
- **HTML static pur** (un fișier index.html + pagini legale separate). Zero framework.
- **CSS vanilla** cu variabile în `:root` (design tokens)
- **JS vanilla** — zero dependințe npm
- **Three.js r128** (CDN) pentru 3D scene hero
- **Google Fonts** preconnect (2 fonturi max)

### Hosting
- **Cloudflare Pages** — gratuit, CDN global, deploy automat din GitHub push
- **GitHub repo privat** ca source of truth
- **Cloudflare DNS** pentru domeniu (permite rules + workers)

### Optional (backend)
- **Cloudflare Worker** pentru formulare (booking, lead capture, exit-intent)
- **Resend API** pentru trimitere email (10 cenți / email, 100/zi gratuit)

### Interzis
- WordPress (greu, lent, update-uri)
- Webflow (lock-in, cost lunar, performanță moderată)
- Next.js/Nuxt (overkill pentru landing static, SSR nu aduce nimic)
- Orice builder (GoDaddy, Wix) — calitate mediocră, SEO slab

---

## 2. DESIGN TOKENS (varianta i-vory, adaptabilă)

### Palette "dark premium cosmos" (default)
```css
:root{
  --ink: #04060e;        /* Background principal (nocturnal) */
  --ink2:#0a0617;        /* Gradient secondary */
  --plum:#1a0a2e;        /* Gradient highlight */
  --ti:  #fff5e6;        /* Text primary warm */
  --td:  #d8d4c8;        /* Text secondary */
  --a8:  #a8b5c0;        /* Text muted */
  --a5:  #5a6572;        /* Text hint */
  --ac:  #00e0c0;        /* Accent primary (teal) */
  --am:  #ff9a3d;        /* Accent warm (orange) */
  --pa:  #f5f1e8;        /* Paper warm */
  --pd:  #ffb86b;        /* Peach CTA */
  --bd:  rgba(255,255,255,.08);  /* Border subtle */
  --bd2: rgba(255,255,255,.12);  /* Border medium */
  --fb:  'DM Sans', sans-serif;
  --fd:  'Syne', sans-serif;
  --e:   cubic-bezier(.2,.9,.3,1.2);
  --e2:  cubic-bezier(.4,0,.2,1);
}
```

### Palette variants per nișă
- **Legal/Law**: swap `--ac` → `#c9a961` (gold), `--am` → `#8b0000` (oxblood), dark navy base `#0a1628`
- **Medical/Clinic**: `--ac` → `#4db8a9` (clinical teal), `--am` → `#f5a623` (warm), lighter base `#0e1419`
- **Luxury/Fashion**: `--ac` → `#d4af37` (champagne), base pure `#000`, paper `#fafafa`
- **SaaS/Tech**: `--ac` → `#5865f2` (indigo), `--am` → `#eb459e` (pink), base `#0d0e12`
- **Wellness**: `--ac` → `#7fb685` (sage), `--am` → `#f2a9a1` (rose), base `#1a1f1a`

### Typography pairs (verified)
**Default:** Syne (display 700/800) + DM Sans (body 400/600/700)
- Syne: aspect "architectural brutalist, modern"
- DM Sans: clean sans humanistă, readable

**Alternative pairs:**
- **Editorial premium:** Playfair Display + Inter
- **Tech/SaaS:** Space Grotesk + Inter
- **Legal authority:** Cormorant Garamond + Libre Franklin
- **Fashion:** Canela + Söhne (paid) sau substitut: Fraunces + Manrope
- **Minimal:** Instrument Serif + Geist

**Regula:** Un display + un body. NICIODATĂ 3+ familii. Weight-urile în cadrul aceleiași familii = variații, nu conturi separate.

### Scale
```
Display XXL: clamp(3.5rem, 8vw, 7rem)   /* Hero h1 */
Display XL:  clamp(2.5rem, 6vw, 4.5rem) /* Section h1 */
Display L:   clamp(2rem, 5vw, 3.5rem)   /* Subheadings */
Display M:   clamp(1.5rem, 3.5vw, 2.2rem)
Body L:      1.15rem / line-height 1.65
Body:        .95rem  / line-height 1.7
Body S:      .82rem  / line-height 1.6
Caption:     .72rem  / letter-spacing .15em uppercase
```

### Spacing scale
```
Section padding:  clamp(4rem, 8vw, 8rem) top/bottom
Card padding:     clamp(1.5rem, 3vw, 3rem)
Grid gap:         clamp(1rem, 2vw, 2rem)
Container max:    1200px
Max text width:   720px (optimal reading)
```

### Radius
```
Pills:    100px
Cards L:  24px
Cards M:  16px
Cards S:  12px
Icons:    50% (circle)
```

### Shadows
```css
--sh-card:   0 30px 60px rgba(0,0,0,.6), 0 0 40px rgba(0,224,192,.25);
--sh-hover:  0 40px 80px rgba(0,0,0,.7), 0 0 60px rgba(0,224,192,.4);
--sh-soft:   0 12px 30px rgba(0,0,0,.4);
--glow-teal: drop-shadow(0 0 14px rgba(0,224,192,.45));
```

---

## 3. LAYOUT ARCHITECTURE (section-by-section)

Ordinea recomandată (18 secțiuni max, alegi 8-12 din ele):

1. **Nav fixed** — logo + 3-5 linkuri + primary CTA (mereu)
2. **Hero 3D** — Three.js scene + h1 monster + sub + 2 CTAs (mereu)
3. **Problem/tension scroll** — storytelling 2-3 slides sticky (mereu)
4. **Social proof bar** — logo-uri clienți sau metrics row (dacă ai)
5. **Services/Features** — 3 card-uri mari cu icon + titlu + descriere
6. **How it works** — timeline 3-5 pași numerotați
7. **Pricing/Packages** — 3 tier-uri + toggle lunar/anual (dacă SaaS)
8. **Live calculator** — sliders interactivi → preț dinamic (dacă servicii custom)
9. **Comparison table** — tu vs alternative (4 coloane max)
10. **Portfolio/Case studies** — grid 2×2 sau carousel cu click → modal/pagină
11. **Testimonials** — video cards 9:16 sau quote-uri (zero fake)
12. **Results/Metrics** — counter animation pe scroll
13. **FAQ** — 6-10 întrebări native `<details>`
14. **CTA split section** — 2 coloane stack: "Mesaj direct" vs "Programează call"
15. **Contact form** — minimal: name, email, message (3 câmpuri max)
16. **Footer premium** — 4 coloane (brand + social, servicii, companie, contact)
17. **Legal pages** separate (/terms, /privacy, /cookies, /gdpr)
18. **Modals flotante**: exit-intent, chat widget, case study detail

---

## 4. HERO 3D (signature element)

### Setup Three.js r128
```html
<canvas id="hero3d" style="position:fixed;inset:0;z-index:0;pointer-events:none"></canvas>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, .1, 1000);
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('hero3d'),
  alpha: true,
  antialias: window.devicePixelRatio < 2
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 900 ? 1.25 : 2));

// Stars field (2000-5500 particles)
const starCount = window.innerWidth < 900 ? 2000 : 5500;
const starGeo = new THREE.BufferGeometry();
const positions = new Float32Array(starCount * 3);
for(let i = 0; i < starCount * 3; i += 3){
  positions[i]   = (Math.random() - .5) * 200;
  positions[i+1] = (Math.random() - .5) * 200;
  positions[i+2] = (Math.random() - .5) * 200;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starMat = new THREE.PointsMaterial({
  color: 0xffffff,
  size: .06,
  transparent: true,
  opacity: .8
});
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// Hero object (customize per brand: elephant, sphere, torus, custom GLTF)
const geo = new THREE.TorusKnotGeometry(1.2, .35, 120, 16);
const mat = new THREE.MeshStandardMaterial({
  color: 0x00e0c0,
  roughness: .15,
  metalness: .7,
  emissive: 0x001a14,
  emissiveIntensity: .5
});
const heroObj = new THREE.Mesh(geo, mat);
scene.add(heroObj);

// Lights
scene.add(new THREE.AmbientLight(0xfff5e6, .4));
const key = new THREE.DirectionalLight(0x00e0c0, 1.5);
key.position.set(5, 5, 5);
scene.add(key);
const fill = new THREE.DirectionalLight(0xff9a3d, .8);
fill.position.set(-5, 2, 3);
scene.add(fill);

// Cursor magnetism
window.__mx = 0; window.__my = 0;
document.addEventListener('mousemove', e => {
  window.__mx = (e.clientX / innerWidth) * 2 - 1;
  window.__my = (e.clientY / innerHeight) * 2 - 1;
}, {passive:true});

// Animate
function animate(){
  requestAnimationFrame(animate);
  heroObj.rotation.y += .003;
  heroObj.rotation.x = window.__my * .3;
  heroObj.rotation.z = window.__mx * .2;
  stars.rotation.y += .0002;
  renderer.render(scene, camera);
}
animate();

// Resize
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
</script>
```

### Hero objects library (swap per brand)
- **Tech/SaaS:** TorusKnotGeometry (wireframe + glow) sau custom logo GLTF
- **Legal:** Columna Doric procedural (CylinderGeometry + BoxGeometry cap) sau balanță animată
- **Medical:** Caduceus wireframe sau celulă (SphereGeometry cu nucleoli)
- **Fashion:** Torus metalic cu chromatic aberration shader
- **Real Estate:** Arhitectură generativă (cluster de cuburi)
- **Wellness:** Flower of Life procedural sau blob organic (IcosahedronGeometry + noise)

### Performance rules
- `pointer-events:none` pe canvas OBLIGATORIU
- Star count: 2000 mobile / 5500 desktop
- `antialias: false` când DPR >= 2 (Retina)
- DPR cap: 1.25 mobile / 2 desktop
- `requestAnimationFrame` pause când page hidden:
  ```js
  let running = true;
  document.addEventListener('visibilitychange', () => running = !document.hidden);
  function animate(){ if(running) { ... } requestAnimationFrame(animate); }
  ```

---

## 5. SCROLLYTELLING (prob section)

### Principiu
Secțiune `position:sticky` 1-3 ecrane înălțime, conținut rămâne fixat în viewport în timp ce user-ul scrollează, slide-urile se schimbă bazat pe progres.

### HTML
```html
<section class="prob" id="prob">
  <div class="prob-sticky">
    <div class="prob-overlay"></div>
    <div class="prob-line" data-i="0">
      <span class="acc">Hook emoțional.</span><br>
      Subiect subtitle.
    </div>
    <div class="prob-line" data-i="1">
      Al doilea slide cu <span class="acc">contrast.</span><br>
      <span class="warn">Miza pentru user.</span>
    </div>
    <div class="scroll-hint"><span>Scroll</span><svg>...</svg></div>
    <div class="prob-progress"><i id="probBar"></i></div>
  </div>
</section>
```

### CSS
```css
.prob{position:relative;height:150vh} /* 100vh + overflow per slide */
.prob-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.prob-overlay{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(0,0,0,.2) 0%,rgba(0,0,0,.7) 80%);z-index:1}
.prob-line{position:absolute;z-index:2;text-align:center;max-width:min(900px,90vw);padding:2rem 2.5rem;font-family:var(--fd);font-weight:800;font-size:clamp(1.6rem,4.8vw,3.6rem);line-height:1.08;letter-spacing:-.045em;opacity:0;transform:translateY(40px);transition:opacity .6s var(--e),transform .8s var(--e)}
.prob-line.active{opacity:1;transform:translateY(0)}
.prob-line .acc{color:var(--ac)}
.prob-line .warn{color:var(--am)}
.prob-progress{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);width:200px;height:3px;background:rgba(255,255,255,.1);border-radius:100px;overflow:hidden;z-index:3}
.prob-progress i{display:block;height:100%;background:var(--ac);width:0;transition:width .2s linear}
```

### JS
```js
const prob = document.getElementById('prob');
const lines = prob.querySelectorAll('.prob-line');
const pBar = document.getElementById('probBar');

function updateProb(){
  const rect = prob.getBoundingClientRect();
  const topDoc = rect.top + scrollY;
  const h = prob.offsetHeight;
  const scrolled = scrollY - topDoc;
  const total = h - innerHeight;
  const progress = Math.max(0, Math.min(1, scrolled / total));
  pBar.style.width = (progress * 100) + '%';
  const segment = 1 / lines.length;
  let activeIndex = Math.min(Math.floor(progress / segment), lines.length - 1);
  if(progress >= .999) activeIndex = lines.length - 1;
  lines.forEach((l, i) => l.classList.toggle('active', i === activeIndex));
}
addEventListener('scroll', updateProb, {passive:true});
updateProb();
```

**Tuning:** Un slide = 100vh scroll. Pentru 2 slides → height:150vh (jumătate pentru tranziție). Pentru 3 slides → height:250vh.

---

## 6. PRICE CALCULATOR (live)

### Când incluzi
- Servicii cu prețuri variabile (agency, freelance, consultancy)
- Ajută decizie + reduce prag psihologic
- NU include dacă ai doar 2-3 pachete fixe (folosește pricing table)

### Template generic
```html
<div class="calc-wrap">
  <h3>Calculator preț instant</h3>
  <p class="sub">Configurează ce ai nevoie. Prețuri reale.</p>
  
  <div class="calc-row">
    <label>Cantitate primară <span class="calc-val" id="c1">10</span></label>
    <input type="range" id="r1" min="1" max="50" value="10">
  </div>
  <div class="calc-row">
    <label>Cantitate secundară <span class="calc-val" id="c2">2</span></label>
    <input type="range" id="r2" min="0" max="20" value="2">
  </div>
  <div class="calc-row">
    <label>Multiplier complexitate <span class="calc-val" id="c3">3</span></label>
    <input type="range" id="r3" min="1" max="5" value="3">
  </div>
  <div class="calc-extras">
    <label><input type="checkbox" id="x1" checked> Feature standard (inclus)</label>
    <label><input type="checkbox" id="x2"> Upgrade premium (+20%)</label>
  </div>
  <div class="calc-out">
    <span class="calc-label">Total estimat</span>
    <div class="calc-total" id="total">2.040 RON<span class="per">/lună</span></div>
    <div class="calc-badge">✓ Economie până la 40% vs concurență</div>
  </div>
  <a href="..." class="bh">Vreau oferta personalizată →</a>
</div>
```

### JS formula (parametrize per brand)
```js
function calc(){
  const v1 = +r1.value, v2 = +r2.value, v3 = +r3.value;
  const rush = x2.checked;
  let base = v1 * RATE_1 + v2 * RATE_2;
  base *= (1 + (v3 - 1) * 0.08);
  if(rush) base *= 1.2;
  if(v1 >= THRESHOLD_1 || v2 >= THRESHOLD_2) base *= 0.78;
  const total = Math.max(MIN_FLOOR, Math.round(base / 10) * 10);
  c1.textContent = v1; c2.textContent = v2; c3.textContent = v3;
  document.getElementById('total').innerHTML = 
    total.toLocaleString('ro-RO') + ' RON<span class="per">/lună</span>';
}
[r1,r2,r3,x1,x2].forEach(el => el.addEventListener('input', calc));
calc();
```

### Psihologie preț
- **Min floor:** 400-500 RON (sub asta pare ne-serios)
- **Volume discount:** -22% la thresholds (poziționat ca "beneficiu unlock", nu reducere disperată)
- **Rush premium:** +20% (slab pentru a nu speria, real pentru a dezincentiva)
- **Badge comparativ:** "40% mai ieftin decât alternative" (dacă ai date să susții)

---

## 7. COMPARISON TABLE (4 coloane max)

### Format standard
```
                Freelancer    Agenție clasică    Tu/Brand-ul tău    Competitor direct
Livrare         Lent          7-14 zile          2-4 zile           5-10 zile
Calitate        Variabilă     Bună               Premium            Bună
Preț            Mic           Mare               Corect             Mediu
Strategie       Nu            Da (extra cost)    Inclus             Parțial
Scalabilitate   Nu            Limitată           Da                 Parțial
```

Marchează coloana ta cu `border: 2px solid var(--ac)` și `background: rgba(0,224,192,.05)`. Celule DA = ✓ verde. Celule NU = ✕ roșu. Celule "depinde" = ~ gri.

---

## 8. FOOTER PREMIUM (4 coloane)

Layout fix (desktop): 2fr 1fr 1fr 1.3fr (brand + 3 coloane link-uri).

```
[COL 1: Brand]                    [COL 2: Servicii]     [COL 3: Companie]    [COL 4: Contact]
Logo 48px + glow                  - Serviciu 1          - Portofoliu         - Email (mailto)
Tagline 2 propoziții (max 340px)  - Serviciu 2          - Blog               - Telefon (tel:)
4 social icons (40×40 circle)     - Serviciu 3          - FAQ                - Program orar
                                  - Serviciu 4          - Contact            - Locație
                                                                             - [WhatsApp CTA peach]
------------------------------------------------------------------------------
© 2026 Brand · CUI                                    Termeni · Privacy · Cookies · GDPR
```

CSS key:
```css
.ft-wrap{margin-top:6rem;background:linear-gradient(180deg,transparent 0%,rgba(6,8,18,.95) 20%,var(--ink) 100%);border-top:1px solid rgba(0,224,192,.15);padding:4rem 2rem 2rem}
.ft-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1.3fr;gap:3rem}
@media(max-width:900px){.ft-grid{grid-template-columns:1fr;gap:2.2rem}}
```

---

## 9. MOBILE-FIRST STRATEGY

### Decizii de rendering
**Hide pe mobil (`@media(max-width:900px){display:none}`):**
- Client marquee scroll
- WhatsApp chat widget flotant
- Calculator live (folosește CTA "cere ofertă" în loc)
- Comparison table (înlocuiește cu accordion)
- Workflow timeline orizontal (folosește vertical stack)
- Testimonial carousel video (folosește single card)
- Exit-intent modal (neenabled pe touch)
- Case study modal trigger

**Menține pe mobil (adaptate):**
- Three.js hero (cu star count redus + DPR cap)
- Prob scrollytelling (tranziții rapide)
- Toate animațiile fade-in / reveal pe scroll
- Counter animation on scroll
- FAQ accordion
- Portfolio grid (2 col)
- Footer (stack 1 col)

### CSS mobile global
```css
@media(max-width:900px){
  html,body{overflow-x:clip;max-width:100vw}
  nav{padding:.45rem .8rem;min-height:54px}
  nav .logo img{height:32px}
  .nav-links{display:none}
  .sec{padding:3rem 1rem}
  .card{padding:2rem 1.2rem;border-radius:18px}
  
  /* Perf: content-visibility skip off-screen paint */
  .sec:not(.needs-measure){
    content-visibility:auto;
    contain-intrinsic-size:auto 600px;
  }
  
  /* GPU layers */
  .animated,.card,.footer,.counter,.testimonial-card{
    will-change:transform;
    transform:translateZ(0);
    backface-visibility:hidden;
  }
  
  /* Reduce blur cost */
  nav{backdrop-filter:blur(8px)}
  .card{backdrop-filter:none}
  
  /* Kill word hyphens */
  *{word-break:normal;overflow-wrap:normal;hyphens:none;-webkit-hyphens:none}
}

@media(prefers-reduced-motion:reduce){
  *{animation-duration:.01ms !important;transition-duration:.01ms !important}
}
```

### Counter fallback (IntersectionObserver nu declanșează pe mobil în unele cazuri)
```js
(function(){
  if(window.innerWidth > 900) return;
  setTimeout(() => {
    document.querySelectorAll('[data-target]').forEach(el => {
      if(el.textContent.trim() === '0'){
        const target = +el.dataset.target, start = Date.now(), dur = 1500;
        (function tick(){
          const p = Math.min(1, (Date.now() - start) / dur);
          el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
          if(p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        })();
      }
    });
  }, 1200);
})();
```

---

## 10. PERFORMANCE BUDGET

### Targets 2026
- **LCP mobile:** <2.5s (target <2.0s)
- **FID/INP:** <200ms
- **CLS:** <0.1
- **Lighthouse mobile:** 85+ performance, 100 accessibility, 100 best practices, 100 SEO
- **Total page weight:** <1.5MB initial (inclusiv 3D + fonts + hero img)
- **JS execution:** <300ms main thread

### Tactici
1. **Critical CSS inline** în `<style>` din `<head>`. Zero external CSS files.
2. **Fonts:** `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` + `&display=swap`
3. **Images:** `loading="lazy" decoding="async"` pe toate non-hero. Hero image: `fetchpriority="high"`.
4. **Scripts:** toate cu `defer`. Three.js la finalul body. GA4 pe `requestIdleCallback`.
5. **Video:** poster image obligatoriu, `preload="metadata"`, autoplay doar pe hover.
6. **Cloudflare _headers:**
```
/*.html          Cache-Control: public, max-age=600, stale-while-revalidate=3600
/*.css,/*.js     Cache-Control: public, max-age=31536000, immutable
/*.woff2         Cache-Control: public, max-age=31536000, immutable
/*.jpg,/*.png    Cache-Control: public, max-age=2592000
```
7. **Image compression:** ffmpeg `-q:v 5 -vf scale=1080:-2` → ~100-200KB JPG
8. **Video compression:** `-crf 28 -preset fast -movflags +faststart` → 9:16 540p ~800KB / 30s
9. **content-visibility:auto** pe secțiuni off-screen (tested §9)
10. **GPU layers** pe elementele animate (translateZ(0))

---

## 11. INTERACȚIUNI PREMIUM

### Cursor magnetism (obiecte 3D follow mouse)
```js
window.__mx = 0; window.__my = 0;
addEventListener('mousemove', e => {
  window.__mx = (e.clientX / innerWidth) * 2 - 1;
  window.__my = (e.clientY / innerHeight) * 2 - 1;
}, {passive:true});
// În animate: heroObj.rotation.x = window.__my * .3;
```

### Button ripple on hover
```css
.bh{position:relative;overflow:hidden;isolation:isolate}
.bh::before{content:"";position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.15) 0%,transparent 40%);opacity:0;transition:opacity .3s;z-index:-1}
.bh:hover::before{opacity:1}
```
```js
document.querySelectorAll('.bh').forEach(b => {
  b.addEventListener('mousemove', e => {
    const r = b.getBoundingClientRect();
    b.style.setProperty('--mx', ((e.clientX-r.left)/r.width*100)+'%');
    b.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');
  });
});
```

### Reveal on scroll (zero deps)
```css
.rv{opacity:0;transform:translateY(30px);transition:opacity .8s var(--e),transform .8s var(--e)}
.rv.in{opacity:1;transform:translateY(0)}
.rd1{transition-delay:.1s} .rd2{transition-delay:.2s} .rd3{transition-delay:.3s} .rd4{transition-delay:.4s}
```
```js
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
}, {threshold:.15});
document.querySelectorAll('.rv').forEach(el => io.observe(el));
```

### Marquee infinite scroll
```html
<div class="mq"><div class="mt">
  <div class="mi">Item 1</div>
  <div class="mi">Item 2</div>
  <!-- duplicate items for seamless loop -->
  <div class="mi">Item 1</div>
  <div class="mi">Item 2</div>
</div></div>
```
```css
.mq{overflow:hidden;mask-image:linear-gradient(90deg,transparent 0%,#000 10%,#000 90%,transparent 100%)}
.mt{display:flex;gap:3rem;animation:mq 40s linear infinite;width:max-content}
@keyframes mq{to{transform:translateX(-50%)}}
```

### Exit-intent modal (desktop only)
```js
let shown = false;
document.addEventListener('mouseout', e => {
  if(!shown && e.clientY < 10 && !e.relatedTarget){
    shown = true;
    document.querySelector('.ei-ov').classList.add('open');
  }
});
```

### FAQ toggle (force-bind multiple triggers)
```js
(function(){
  function init(){
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-q');
      if(!btn || btn.dataset.bound) return;
      btn.dataset.bound = '1';
      btn.addEventListener('click', e => {
        e.preventDefault();
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(x => {
          x.classList.remove('open');
          const a = x.querySelector('.faq-a');
          if(a) a.style.maxHeight = '0';
        });
        if(!open){
          item.classList.add('open');
          const ans = item.querySelector('.faq-a');
          ans.style.maxHeight = (ans.scrollHeight || 1500) + 'px';
        }
      });
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  setTimeout(init, 500);
  setTimeout(init, 2000);
})();
```

---

## 12. SEO / AEO / GEO FUNDAMENT

### Meta obligatorii (exact order în `<head>`)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="theme-color" content="#04060e">

<title>Brand - Keyword primary | Keyword secondary</title>
<meta name="description" content="Max 155 char, include brand + preț+ platforme/nișă + CTA implicit">
<link rel="canonical" href="https://domeniu.ro/">

<!-- OG -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://domeniu.ro/og-image.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://domeniu.ro/">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://domeniu.ro/og-image.jpg">

<!-- Geo (dacă local business) -->
<meta name="geo.region" content="RO-B">
<meta name="geo.placename" content="București">
<meta name="geo.position" content="44.4268;26.1025">
<link rel="alternate" hreflang="ro-RO" href="https://domeniu.ro/">

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

### Schema.org JSON-LD (5 entități minimum)
Obligatoriu: LocalBusiness/Organization + Service/OfferCatalog + WebSite + FAQPage.
Pune-le toate într-un singur `<script type="application/ld+json">` cu `@graph` array.

### /llms.txt (pentru AI crawlers)
```
# Brand Name
Descriere brand 2 propoziții.

## Servicii
- Serviciu 1: preț, include X Y Z
- Serviciu 2: preț, include X Y Z

## Contact
Email: contact@domeniu.ro
Tel: +40 xxx
```

### OG image generation
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --screenshot="og-image.jpg" --window-size=1200,630 "file:///C:/path/to/og-template.html"
```

---

## 13. FORMULARE & BACKEND (Cloudflare Worker + Resend)

### Worker minimal
```js
export default {
  async fetch(request, env){
    if(request.method !== 'POST') return new Response('Method not allowed', {status:405});
    
    const data = await request.json();
    const { name, email, message, source } = data;
    
    if(!email || !name) return new Response('Missing fields', {status:400});
    
    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@domeniu.ro',
        to: ['contact@domeniu.ro'],
        reply_to: email,
        subject: `[${source}] Lead nou: ${name}`,
        html: `<p><strong>Nume:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message || ''}</p>`
      })
    });
    
    if(!res.ok) return new Response('Email failed', {status:500});
    return new Response(JSON.stringify({ok:true}), {
      headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}
    });
  }
}
```

### Deploy
```
cd worker
npx wrangler login
npx wrangler secret put RESEND_API_KEY   # paste key
npx wrangler deploy
# Output URL → inject in HTML as const BOOKING_ENDPOINT
```

---

## 14. LEGAL PAGES (obligatoriu UE/România)

### 4 pagini dedicate
- `/terms.html` — Termeni și Condiții
- `/privacy.html` — Politica de Confidențialitate (GDPR)
- `/cookies.html` — Politica Cookies
- `/gdpr.html` — Pagină GDPR dedicată + info ANSPDCP

### Conținut standard (template)
Menționează obligatoriu:
- Operator: nume firmă + CUI + sediu
- Datele colectate: categorii (contact, facturare, analytics)
- Temeiul legal GDPR (consimțământ / contract / obligație legală / interes legitim)
- Durata păstrării (3 ani contact, 10 ani facturare)
- 8 drepturi GDPR (informare, acces, rectificare, ștergere, restricționare, portabilitate, opoziție, plângere ANSPDCP)
- Cookie-uri folosite (GA4, Cloudflare, fonts) + cum se dezactivează
- Contact responsabil date

### Link-uri în footer
```html
<div class="ft-links">
  <a href="/terms.html">Termeni și Condiții</a>
  <a href="/privacy.html">Politica de Confidențialitate</a>
  <a href="/cookies.html">Cookies</a>
  <a href="/gdpr.html">GDPR</a>
</div>
```

---

## 15. PROCESUL DE LIVRARE CĂTRE CLIENT

### Discovery (1-2 zile)
Colectează OBLIGATORIU de la client:
1. **Brand identity:** logo (SVG), nume, tagline, paletă (dacă are)
2. **Tone of voice:** 3 exemple de texte "așa vorbim noi"
3. **Servicii/produse:** lista + prețuri + USP per item
4. **Social proof:** testimoniale reale (video sau text + nume), clienți (logo-uri), metrics (cu permisiune)
5. **Portofoliu:** imagini/videos proiecte precedente
6. **Contact real:** email, telefon, orar, locație
7. **Legal:** nume firmă, CUI, adresă sediu
8. **Competiție:** 3 competitori direcți (pentru comparison table)
9. **Goal principal:** ce acțiune vrei să facă user-ul? (call / email / buy / signup)

### Build (3-5 zile)
- Ziua 1: setup stack + palette custom + hero 3D + nav + footer (bootstrap)
- Ziua 2: secțiuni middle (services, how, packages, calculator dacă are)
- Ziua 3: secțiuni proof (portfolio, testimonials, FAQ, contact)
- Ziua 4: mobile optimization + perf + SEO + legal
- Ziua 5: deploy + QA + revizii finale client

### Livrabil
- Site live pe domain-ul clientului (DNS setup in Cloudflare)
- Access la GitHub repo (dacă contract permite)
- Documentație minimă: cum schimbi text, cum adaugi poză nouă
- Worker backend (dacă forms) cu credentials transferate
- Training 30 min video pentru client (screen recording)

### Preț recomandat (2026 RO market)
- **Starter:** 3000-5000€ (8 secțiuni, fără 3D complex, fără backend)
- **Premium:** 5000-10000€ (12+ secțiuni, 3D hero, calculator, worker backend, 4 legal pages)
- **Enterprise:** 10000-20000€ (custom 3D scene GLTF, multi-page, animații complexe, i18n)

---

## 16. ANTI-PATTERNS (ce NU faci)

1. **NU folosi Bootstrap/Tailwind framework** — bloat, generic look, greu de custom-uit la nivel premium
2. **NU folosi template-uri ThemeForest** — 99% arată "template", nu diferențiat
3. **NU include stats/testimoniale fake** — detectabil, legal risky, distruge trust
4. **NU pune 10+ CTA-uri pe aceeași pagină** — max 1 primary per viewport
5. **NU folosi stock images generice** (Shutterstock "businesswoman pointing at laptop") — instant credibility killer
6. **NU încarca 3D peste tot** — doar hero. Restul e CSS/SVG animated.
7. **NU animații peste 600ms** — user percepe lag
8. **NU popup-uri agresive < 10 sec** după load — exit-intent doar
9. **NU autoplay video cu sound** — penalizare Chrome + user annoyance
10. **NU fonturi paid fără license check** — monitools.com audit
11. **NU copy/paste legal pages** fără adaptare — GDPR = business-specific
12. **NU deploy direct la client** fără staging.domeniu.ro întâi
13. **NU uita robots.txt + sitemap.xml + favicon** — basic hygiene
14. **NU neglija mobile 375px** — 70%+ traffic vine de aici

---

## 17. TROUBLESHOOTING RAPID

| Simptom | Cauză | Fix |
|---------|-------|-----|
| Layout mobil stricat | overflow-x:hidden pe html/body | Schimbă cu `overflow-x:clip` |
| Sticky nu merge | Overflow hidden pe parent | `overflow-x:clip` sau scoate overflow |
| Three.js fills page | Canvas default block | `position:fixed;pointer-events:none` |
| Counter rămâne 0 mobil | IO threshold prea mare | setTimeout fallback 1200ms |
| FAQ nu se deschide | content-visibility rupe scrollHeight | Exclude FAQ + fixed max-height:2000px |
| Diacritice `Â·` / `â†'` | Cache browser sau mojibake | Hard refresh Ctrl+Shift+R sau Python fix |
| Git push "LF/CRLF" | Warning benign Windows | Ignoră, push merge |
| Lighthouse LCP mare | Hero img/video prea mare | Compresie + fetchpriority=high |
| GA4 nu trackează | Script blocat de adblock | Folosește gtag + first-party endpoint |
| Form 500 error | Resend key invalid | `npx wrangler secret list` |

---

## 18. CHECKLIST LIVRARE FINALĂ

### Funcționalitate
- [ ] Toate CTA-urile duc unde trebuie (nu #placeholder)
- [ ] Forms testate (submit real + verify email primit)
- [ ] Calculator live update corect
- [ ] FAQ deschide/închide pe toate browserele (Chrome/Safari/Firefox/Edge)
- [ ] Navigation linkuri anchor funcționează
- [ ] Mobile menu deschide/închide
- [ ] Toate imaginile au alt text
- [ ] WhatsApp link cu număr corect
- [ ] Email mailto: cu adresa reală

### Performance
- [ ] Lighthouse mobile: Perf 85+, A11y 95+, BP 95+, SEO 95+
- [ ] PageSpeed Insights: toate în verde
- [ ] GTmetrix grade A
- [ ] Hero image <200KB, video <5MB
- [ ] Total page weight <2MB inițial
- [ ] Toate imaginile lazy loading
- [ ] Scripts external deferred

### SEO
- [ ] Title + description unice per pagină
- [ ] OG image generată 1200×630
- [ ] Canonical URL setat
- [ ] Schema.org validat pe schema.org/validator
- [ ] Sitemap.xml livrat în /
- [ ] robots.txt permite crawling
- [ ] hreflang dacă multilingv
- [ ] 404.html custom

### Legal
- [ ] /terms.html cu info firmă reală
- [ ] /privacy.html GDPR compliant
- [ ] /cookies.html cu lista reală cookies
- [ ] /gdpr.html cu ANSPDCP info
- [ ] Cookie banner (dacă GA4)
- [ ] Form-urile menționează "prin trimitere acceptați Termenii"

### Brand
- [ ] Logo la rezoluție corectă (48px nav, 52px footer)
- [ ] Paleta culorilor consistentă
- [ ] Fonts încărcate toate (no FOUT/FOIT)
- [ ] Spell check RO complet (diacritice toate la locul lor)
- [ ] Tone of voice consistent cu brief-ul

### Technical
- [ ] HTTPS forțat (Cloudflare rule)
- [ ] www → non-www redirect (sau invers)
- [ ] `_headers` cu cache rules
- [ ] `_redirects` dacă ai migrat URL-uri vechi
- [ ] Analytics setat corect (GA4 + verify Real-Time)
- [ ] Google Search Console verified + sitemap submitted
- [ ] Backup inițial în GitHub
- [ ] Credentials transferate client (cont Cloudflare, GA4, domain registrar)

---

## 19. VARIANTE PE NIȘE (starter kit per client type)

### Avocat / Cabinet juridic
- Palette: dark navy + gold accent + oxblood warm
- 3D hero: columnă Doric procedurală sau balanță romană
- Signature sections: Services (specializări) / Cases (anonimizate) / How it works (proces juridic) / FAQ (întrebări frecvente clienți) / Contact (programare consultație)
- CTA primar: "Programează consultație"
- Trust signals: barou + experiență ani + număr cazuri

### Kinetoterapeut / Clinică recuperare
- Palette: sage + warm rose + off-white base
- 3D hero: blob organic fluid sau scheletul simplificat
- Signature sections: Services (tipuri terapie) / Body map interactiv / Testimonials pacienți / Plan personalizat / Booking calendar
- CTA primar: "Rezervă prima ședință"
- Trust signals: diploma + specializări + înainte/după

### Medic estetică / Chirurg
- Palette: clinical teal + champagne + pure black
- 3D hero: particles concentrate / DNA helix
- Signature sections: Services (proceduri) / Before-After slider / Pricing transparent / Video consultation FAQ / Booking
- CTA primar: "Consultație 30 min"
- Trust signals: acreditări + ani experiență + membru societăți

### Coach / Consultant business
- Palette: deep purple + gold + off-white
- 3D hero: mountain peak procedural / network nodes
- Signature sections: Bio authority / Methodology / Case studies cu rezultate măsurabile / Pricing tiers / Booking
- CTA primar: "Aplică pentru coaching"
- Trust signals: clienți notabili + rezultate quantifiable + media features

### SaaS B2B
- Palette: indigo + pink + dark graphite
- 3D hero: abstract dataviz / mesh gradient 3D
- Signature sections: Features (3 majore) / How it works (flow) / Pricing (3 tiers toggle) / Integrations / Testimonials enterprise / Docs
- CTA primar: "Start free trial" + "Book demo"
- Trust signals: logo clienți + case studies metrics + security badges (SOC2)

### E-commerce premium (puține SKU-uri)
- Palette: brand-specific (dar premium: negru + auriu / pure white + black)
- 3D hero: produsul 3D rotating (GLTF model real)
- Signature sections: Hero produs / Story brand / Features detailed / Reviews verificate / Shipping/Returns / FAQ
- CTA primar: "Comandă acum"
- Trust signals: reviews Google + return policy + warranty

---

## 20. FILE STRUCTURE FINAL (reference)

```
project/
├── index.html                  # Landing principal
├── 404.html                    # Error page custom
├── terms.html                  # Termeni
├── privacy.html                # Privacy
├── cookies.html                # Cookies
├── gdpr.html                   # GDPR
├── logo.svg                    # Logo nav (48px)
├── favicon.svg
├── og-image.jpg                # 1200×630
├── robots.txt
├── sitemap.xml
├── llms.txt                    # Pentru AI crawlers
├── .well-known/
│   └── security.txt
├── _headers                    # Cloudflare cache rules
├── _redirects                  # Dacă migrezi URL-uri
└── assets/                     # Imagini, videoclipuri
    ├── hero-poster.jpg
    ├── hero-video.mp4
    ├── logos/
    └── portfolio/
```

---

## 21. METADATE SKILL

**Autor inițial:** Andy @ i-vory Studio + Claude (Anthropic)
**Bazat pe:** i-vory.ro build real (Martie-Aprilie 2026)
**Versiune:** 1.0
**Licență:** Proprietar i-vory Studio. Reutilizare doar cu acord scris.
**Update workflow:** Când găsești pattern nou care merită salvat, adaugă la §11 sau §19 cu exemplu concret.

**Nu e inclus în acest skill (intenționat):**
- Tone of voice specific per brand (coleg skill: `brand-voice-skill.md`)
- Content strategy per nișă (coleg skill: `content-strategy-[nisa].md`)
- Conversion copywriting (coleg skill: `conversion-copy-skill.md`)
- Setup Cloudflare/GitHub de la 0 (coleg skill: `infra-setup-skill.md`)

Acest skill acoperă **DOAR design + animații + stack tehnic + UX patterns + livrare**. Pentru proiect complet, combină cu skill-urile de mai sus.

---

---

# PARTEA 2: ADVANCED 2026 (v1.1 additions)

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

**Autor:** Claude (Anthropic) + Andy @ i-vory Studio.
**Filosofie:** "Tools 2026, taste timeless."

---

**END ADDENDUM v1.1**
