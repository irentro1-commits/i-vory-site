/* section-transitions.js — BATCH 2A premium 2026 desktop section transitions
   Features: pin sections services+packages (Apple-style scrub) + section enter (fade+scale+blur) +
             color theme drift bg gradient + mask reveal alt + divider line draw + eyebrow accent slide.
   Gated DESKTOP only — exits silently on mobile/touch/in-app.
   Requires: window.gsap + window.ScrollTrigger (loaded via CDN before this script).
*/
(function(){
  'use strict';
  if(window.__SECTION_FX_LOADED)return;
  if(window.__IS_MOBILE||window.__IS_INAPP)return;
  if(!window.matchMedia||!window.matchMedia("(pointer:fine)").matches)return;
  window.__SECTION_FX_LOADED=true;

  function waitFor(predFn, cb, tries){
    tries=tries||40;
    if(predFn()){cb();return;}
    if(tries<=0){console.warn('[section-fx] timeout waiting for deps');return;}
    setTimeout(()=>waitFor(predFn,cb,tries-1),100);
  }

  waitFor(()=>window.gsap && window.ScrollTrigger, init);

  function init(){
    const gsap=window.gsap, ST=window.ScrollTrigger;
    gsap.registerPlugin(ST);

    // Sync ScrollTrigger cu Lenis (daca exista)
    if(window.__LENIS){
      window.__LENIS.on('scroll', ST.update);
      gsap.ticker.add(t=>window.__LENIS.raf(t*1000));
      gsap.ticker.lagSmoothing(0);
    }

    // === B2 + B4: SECTION ENTER (fade + scale + blur) ===
    // Mai bun decat .rv class existent — combine multiple. Folosit pe sections fara override.
    const allSections = document.querySelectorAll('main > section, .sec, .reviews-cta, .contact');
    allSections.forEach(sec=>{
      // Skip prob (hero scroll storytelling), s2 (hero static), proof (counters)
      if(sec.classList.contains('prob')||sec.classList.contains('s2'))return;
      gsap.set(sec, { opacity: 0, scale: 0.97, filter: 'blur(8px)', y: 40 });
      ST.create({
        trigger: sec,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(sec, {
            opacity: 1, scale: 1, filter: 'blur(0px)', y: 0,
            duration: 1.1,
            ease: 'power3.out'
          });
        }
      });
    });

    // === B1: PIN SERVICII REMOVED 2026-05-02 — duplicare cu image-reveals.js price-row anim. Andy: "crashuieste pe servicii".
    // image-reveals.js IR-4 face singur anim-ul price-table rows fara pin.

    // Pin packages — pachetele se reveal staggered
    const pachete = document.getElementById('pachete');
    if(pachete){
      const pkCards = pachete.querySelectorAll('.pk');
      gsap.set(pkCards, { opacity: 0, y: 80, scale: 0.92 });
      ST.create({
        trigger: pachete,
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          pkCards.forEach((card, i) => {
            const localP = Math.max(0, Math.min(1, (p * (pkCards.length + 1.5)) - i));
            const eased = 1 - Math.pow(1 - localP, 3);
            gsap.set(card, {
              opacity: eased,
              y: 80 * (1 - eased),
              scale: 0.92 + 0.08 * eased
            });
          });
        }
      });
    }

    // === B3: COLOR THEME DRIFT — bg shift la scroll ===
    const bgblobs = document.querySelector('.bgblobs');
    if(bgblobs){
      // Inject CSS var pe :root, animat by scroll progress
      document.documentElement.style.setProperty('--scroll-tint', '0%');
      ST.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress;
          // Tint shift: dark cosmic (0%) → mid-purple (50%) → cosmic dark (100%)
          const r = Math.round(10 + Math.sin(p * Math.PI) * 8);
          const g = Math.round(10 + Math.sin(p * Math.PI) * 4);
          const b = Math.round(18 + Math.sin(p * Math.PI) * 22);
          bgblobs.style.background = `radial-gradient(ellipse at 50% ${20 + p*60}%, rgb(${r},${g},${b}) 0%, #050505 70%)`;
        }
      });
    }

    // === B5: SECTION DIVIDER LINE DRAW ===
    // Inject 1px linii orizontale subtle intre sections + animate stroke draw
    allSections.forEach((sec, idx) => {
      if(idx === 0)return; // skip first (no divider above)
      if(sec.classList.contains('prob')||sec.classList.contains('s2'))return;
      const cs = window.getComputedStyle(sec);
      const divider = document.createElement('div');
      divider.className = 'sec-divider-line';
      divider.style.cssText = [
        'position:absolute',
        'top:0','left:50%',
        'transform:translateX(-50%)',
        'width:0',
        'height:1px',
        'background:linear-gradient(90deg, transparent 0%, rgba(0,224,192,.4) 50%, transparent 100%)',
        'pointer-events:none',
        'z-index:5',
        'transition:width 1.2s cubic-bezier(.16,1,.3,1)'
      ].join(';');
      if(cs.position === 'static') sec.style.position = 'relative';
      sec.appendChild(divider);
      ST.create({
        trigger: sec,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          divider.style.width = '60%';
        }
      });
    });

    // === B6: HEADER EYEBROW ACCENT BAR SLIDE-IN ===
    const eyebrows = document.querySelectorAll('.lb');
    eyebrows.forEach(eb => {
      // .lb deja are ::before bar 24px, dar e static. Animate la entry.
      const bar = document.createElement('span');
      bar.className = 'lb-accent-anim';
      bar.style.cssText = [
        'display:inline-block',
        'width:0',
        'height:1.5px',
        'background:var(--ac)',
        'margin-right:.6rem',
        'vertical-align:middle',
        'transition:width 0.8s cubic-bezier(.16,1,.3,1)'
      ].join(';');
      // Insert ca prim child
      eb.insertBefore(bar, eb.firstChild);
      ST.create({
        trigger: eb,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          bar.style.width = '32px';
        }
      });
    });

    // Refresh ScrollTrigger after init (fix layout shifts post-pin)
    setTimeout(() => ST.refresh(), 200);
  }
})();
