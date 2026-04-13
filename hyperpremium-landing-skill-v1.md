# HYPERPREMIUM LANDING PAGE SKILL v1.0
**Universal design system pentru landing pages hiper-premium cu animații 3D, optimizate mobile-first.**
**Ultima actualizare: 13 Aprilie 2026**
**Scop:** Template reusabil pentru orice nișă (avocați, kinetoterapeuți, medici, e-commerce, SaaS, agenții). Acoperă DOAR designul + animațiile + stack-ul tehnic. Conținutul (texte, tone of voice, info brand) se adaugă după discovery call cu clientul.

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

**Autor inițial:** Andy @ i-vory Creative + Claude (Anthropic)
**Bazat pe:** i-vory.ro build real (Martie-Aprilie 2026)
**Versiune:** 1.0
**Licență:** Proprietar i-vory Creative. Reutilizare doar cu acord scris.
**Update workflow:** Când găsești pattern nou care merită salvat, adaugă la §11 sau §19 cu exemplu concret.

**Nu e inclus în acest skill (intenționat):**
- Tone of voice specific per brand (coleg skill: `brand-voice-skill.md`)
- Content strategy per nișă (coleg skill: `content-strategy-[nisa].md`)
- Conversion copywriting (coleg skill: `conversion-copy-skill.md`)
- Setup Cloudflare/GitHub de la 0 (coleg skill: `infra-setup-skill.md`)

Acest skill acoperă **DOAR design + animații + stack tehnic + UX patterns + livrare**. Pentru proiect complet, combină cu skill-urile de mai sus.

---

**END OF SKILL v1.0**

Pentru orice proiect nou: citește §0 (când folosești), §15 (discovery client), §19 (starter kit pe nișă). Apoi §1-§14 tehnic. §16-§18 înainte de livrare.
