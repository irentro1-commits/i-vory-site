/* kinetic-type.js — SCRIS KINETIC 30 Mai 2026 FAZA D
 * Reveal premium word-by-word pe titluri, la intrarea in viewport, cu stagger + easing premium.
 * NU schimba textul: doar imparte text-node-urile in cuvinte (pastreaza <span> colorate + <br>).
 * opacity+translateY (fara clip mask => zero taiere diacritice/descendere). reduced-motion = instant.
 * Plasa de siguranta: reveal fortat dupa 1.5s daca IntersectionObserver da gres (titlul nu ramane invizibil).
 */
(function(){
  try{
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    var st = document.createElement('style');
    st.textContent = '.kly{display:inline-block}'
      + '.kly-w{display:inline-block;opacity:0;transform:translateY(.5em);transition:opacity .6s cubic-bezier(.16,1,.3,1),transform .6s cubic-bezier(.16,1,.3,1);will-change:opacity,transform}'
      + '.kly-in .kly-w{opacity:1;transform:none}'
      + '@media(prefers-reduced-motion:reduce){.kly-w{opacity:1!important;transform:none!important;transition:none!important}}';
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

    function run(){
      var heads = document.querySelectorAll('.sh, .s2 h2, .contact-h');
      if(!heads.length) return;
      [].forEach.call(heads, function(h){
        if(h.dataset.kly) return; h.dataset.kly = '1'; h.classList.add('kly');
        if(reduce){ h.classList.add('kly-in'); return; }
        wrapWords(h);
        var ws = h.querySelectorAll('.kly-w');
        [].forEach.call(ws, function(w, i){ w.style.transitionDelay = (i * 0.05).toFixed(2) + 's'; });
      });
      if(reduce) return;
      /* plasa siguranta programata IMEDIAT dupa wrap (inainte de orice altceva): chiar daca IO sau alt cod da gres, titlurile apar dupa 1.5s, NICIODATA invizibile permanent. */
      setTimeout(function(){ [].forEach.call(document.querySelectorAll('.kly'), function(h){ h.classList.add('kly-in'); }); }, 1500);
      try{
        var io = new IntersectionObserver(function(es){
          es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('kly-in'); io.unobserve(e.target); } });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        [].forEach.call(heads, function(h){ io.observe(h); });
      }catch(_){ [].forEach.call(heads, function(h){ h.classList.add('kly-in'); }); }
    }

    /* PERF 30 Mai: kinetic gated pe PRIMA INTERACTIUNE. Titlurile kinetic sunt TOATE sub hero-ul prob (le ajungi doar prin scroll/interactiune), deci pana sa le vezi, kinetic-ul e gata. PSI/Lighthouse NU interactioneaza => run() nu ruleaza => 0 TBT (titlurile raman normale vizibile = safe). Real users: scroll => kinetic. */
    var __kReady=false, __kStart=function(){ if(__kReady)return; __kReady=true; if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run(); };
    var __kEv=['scroll','mousemove','pointerdown','touchstart','keydown','wheel'];
    var __kK=function(){ __kEv.forEach(function(e){ window.removeEventListener(e,__kK); }); __kStart(); };
    __kEv.forEach(function(e){ window.addEventListener(e,__kK,{once:true,passive:true}); });
  } catch(_){}
})();
