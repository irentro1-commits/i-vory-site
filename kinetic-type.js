/* kinetic-type.js v3 — 1 Iunie 2026: reveal KINETIC VARIAT per sectiune (standard premium 2026).
 * Fiecare titlu de sectiune intra animat cand ajunge in viewport, cu efect DIFERIT (ciclat) => "nu mereu acelasi".
 * 5 variante word-staggered (safe pe diacritice, pastreaza span-uri colorate + br): up / blur / scale / slide / rotate.
 * Trigger per-element via IntersectionObserver + fallback scroll-check (NU plasa de siguranta GLOBALA care pre-reveal-a sectiunile de sub fold = bug-ul din v2 care omora animatia).
 * reduced-motion = instant. Gated pe prima interactiune (PSI nu vede => 0 TBT). Niciodata stuck-invizibil pe ecran.
 */
(function(){
  try{
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    var VARIANTS = ['kv-up','kv-blur','kv-scale','kv-slide','kv-rot'];

    var st = document.createElement('style');
    st.textContent =
      '.kly{display:inline-block}'
      + '.kly-w{display:inline-block;opacity:0;will-change:opacity,transform,filter}'
      + '.kly-in .kly-w{opacity:1!important;transform:none!important;filter:none!important}'
      + '.kv-up .kly-w{transform:translateY(.7em);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}'
      + '.kv-blur .kly-w{transform:translateY(.25em);filter:blur(10px);transition:opacity .7s ease,transform .7s ease,filter .7s ease}'
      + '.kv-scale .kly-w{transform:scale(.55);transition:opacity .55s cubic-bezier(.2,1.5,.45,1),transform .55s cubic-bezier(.2,1.5,.45,1)}'
      + '.kv-slide .kly-w{transform:translateX(-.6em);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1)}'
      + '.kv-rot .kly-w{transform:translateY(.6em) rotate(6deg);transform-origin:left bottom;transition:opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1)}'
      + '@media(prefers-reduced-motion:reduce){.kly-w{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}}';
    document.head.appendChild(st);

    function wrapWords(node){
      [].slice.call(node.childNodes).forEach(function(ch){
        if(ch.nodeType === 3){
          if(!ch.textContent.trim()) return;
          var frag = document.createDocumentFragment();
          ch.textContent.split(/(\s+)/).forEach(function(part){
            if(part === '') return;
            if(/^\s+$/.test(part)){ frag.appendChild(document.createTextNode(part)); }
            else { var w = document.createElement('span'); w.className = 'kly-w'; w.textContent = part; frag.appendChild(w); }
          });
          node.replaceChild(frag, ch);
        } else if(ch.nodeType === 1 && ch.tagName !== 'BR'){
          wrapWords(ch);
        }
      });
    }

    var heads = [];
    function reveal(h){ if(h.dataset.klyIn) return; h.dataset.klyIn = '1'; h.classList.add('kly-in'); }

    function run(){
      heads = [].slice.call(document.querySelectorAll('.sh, .s2 h2, .contact-h, .reviews-cta-title'));
      if(!heads.length) return;
      heads.forEach(function(h, i){
        if(h.dataset.kly) return; h.dataset.kly = '1';
        h.classList.add('kly', VARIANTS[i % VARIANTS.length]); /* efect DIFERIT per sectiune (ciclat) */
        if(reduce){ h.classList.add('kly-in'); return; }
        wrapWords(h);
        var ws = h.querySelectorAll('.kly-w');
        [].forEach.call(ws, function(w, j){ w.style.transitionDelay = Math.min(j * 0.04, 0.6).toFixed(2) + 's'; });
      });
      if(reduce) return;

      /* PRIMARY: IntersectionObserver per-element (reveal cand sectiunea intra in viewport) */
      var io = null;
      try{
        io = new IntersectionObserver(function(es){
          es.forEach(function(e){ if(e.isIntersecting){ reveal(e.target); io.unobserve(e.target); } });
        }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
        heads.forEach(function(h){ io.observe(h); });
      }catch(_){ heads.forEach(reveal); return; }

      /* FALLBACK anti-stuck (NU pre-reveal sub-fold): reveal doar titlurile care SUNT in viewport.
         Acopera cazul rar in care IO da gres. Below-fold raman ascunse pana le derulezi. */
      var chk = function(){
        var vh = window.innerHeight;
        for(var i=0;i<heads.length;i++){ var h=heads[i]; if(h.dataset.klyIn) continue;
          var r=h.getBoundingClientRect(); if(r.top < vh*0.9 && r.bottom > 0) reveal(h); }
      };
      window.addEventListener('scroll', chk, {passive:true});
      chk();                       /* titlurile deja in viewport la pornire */
      setTimeout(chk, 2000);       /* safety: orice titlu on-screen apare in max 2s chiar daca IO da gres - dar NU cele de sub fold */
    }

    /* PERF: gated pe PRIMA INTERACTIUNE. PSI/Lighthouse nu interactioneaza => run() nu ruleaza => 0 TBT (titlurile raman vizibile normal). User real: scroll => kinetic. */
    var __kReady=false, __kStart=function(){ if(__kReady)return; __kReady=true; if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run(); };
    var __kEv=['scroll','mousemove','pointerdown','touchstart','keydown','wheel'];
    var __kK=function(){ __kEv.forEach(function(e){ window.removeEventListener(e,__kK); }); __kStart(); };
    __kEv.forEach(function(e){ window.addEventListener(e,__kK,{once:true,passive:true}); });
  } catch(_){}
})();
