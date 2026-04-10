// Premium interactions — mobile-aware, FULL premium on mobile
const __MOB=window.__IS_MOBILE||("ontouchstart" in window)||matchMedia("(max-width:768px)").matches;
const __LOW=false; // force full premium

(function(){
  // 1. MAGNETIC CTA BUTTONS (desktop only - requires hover)
  if(!__MOB){
    const ctas=document.querySelectorAll('a.cta,a.btn,.hero-cta a,.contact-cta a,button.cta,.b,.b2');
    ctas.forEach(btn=>{
      btn.style.transition='transform .25s cubic-bezier(.2,.9,.3,1.4)';
      btn.addEventListener('mousemove',e=>{
        const r=btn.getBoundingClientRect();
        const x=e.clientX-r.left-r.width/2;
        const y=e.clientY-r.top-r.height/2;
        btn.style.transform=`translate(${x*.25}px,${y*.35}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0) scale(1)'});
    });
  }

  // 2. PARALLAX TITLE SHIFT (desktop mouse + mobile scroll-based)
  const titles=document.querySelectorAll('.sec h2,.s2 h2,.sh,.contact-h');
  if(!__MOB){
    let mx=0,my=0,tmx=0,tmy=0;
    window.addEventListener('mousemove',e=>{
      tmx=(e.clientX/window.innerWidth-.5)*2;
      tmy=(e.clientY/window.innerHeight-.5)*2;
    },{passive:true});
    function tick(){
      mx+=(tmx-mx)*.06;my+=(tmy-my)*.06;
      titles.forEach(t=>{t.style.transform=`translate(${-mx*8}px,${-my*6}px)`});
      requestAnimationFrame(tick);
    }
    tick();
  }


  // 3. SCROLL TEXT REVEAL (all devices)
  const revealObs=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        en.target.classList.add('txt-revealed');
        revealObs.unobserve(en.target);
      }
    });
  },{threshold:.2});
  document.querySelectorAll('.sec h2,.s2 h2,.sh').forEach(h=>{
    h.classList.add('txt-reveal');
    revealObs.observe(h);
  });

  // 4. WARP SCROLL (all devices)
  let lastScroll=window.scrollY,scrollVel=0;
  window.addEventListener('scroll',()=>{
    const cur=window.scrollY;
    scrollVel=Math.min(Math.abs(cur-lastScroll)*.5,30);
    lastScroll=cur;
  },{passive:true});
  setInterval(()=>{
    scrollVel*=.85;
    if(window.__starMat&&window.__starMat.uniforms.warp){
      window.__starMat.uniforms.warp.value=scrollVel*.03;
    }
  },40);
})();

// CONSTELLATION — desktop only (requires hover)
if(!__MOB){(function(){
  const cvs=document.createElement('canvas');
  cvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;mix-blend-mode:screen';
  document.body.appendChild(cvs);
  const ctx=cvs.getContext('2d');
  function resize(){cvs.width=innerWidth;cvs.height=innerHeight}
  resize();addEventListener('resize',resize);
  const stars=[];
  for(let i=0;i<80;i++){stars.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.5})}
  let mx=-1000,my=-1000;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
  function draw(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    const near=stars.filter(s=>{const dx=s.x-mx,dy=s.y-my;return dx*dx+dy*dy<40000});
    if(near.length>1){
      ctx.strokeStyle='rgba(0,224,192,.35)';ctx.lineWidth=.6;
      for(let i=0;i<near.length;i++)for(let j=i+1;j<near.length;j++){
        const dx=near[i].x-near[j].x,dy=near[i].y-near[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ctx.globalAlpha=1-d/110;ctx.beginPath();ctx.moveTo(near[i].x,near[i].y);ctx.lineTo(near[j].x,near[j].y);ctx.stroke()}
      }
      ctx.globalAlpha=1;ctx.fillStyle='rgba(180,255,240,.9)';
      near.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.r+1,0,Math.PI*2);ctx.fill()});
    }
    requestAnimationFrame(draw);
  }
  draw();
})()}


// GALAXY DUST — full 200 on all devices
(function(){
  const N=200;
  const dcvs=document.createElement('canvas');
  dcvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:2;mix-blend-mode:screen';
  document.body.appendChild(dcvs);
  const dctx=dcvs.getContext('2d');
  function dresize(){dcvs.width=innerWidth;dcvs.height=innerHeight}
  dresize();addEventListener('resize',dresize);
  const dust=[];
  for(let i=0;i<N;i++){
    dust.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,z:Math.random()*3+.3,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.1,r:Math.random()*1.2+.3,a:Math.random()*.6+.2,hue:Math.random()<.6?[180,255,240]:(Math.random()<.5?[200,160,255]:[255,200,160])});
  }
  let dmx=0,dmy=0;
  addEventListener('mousemove',e=>{dmx=(e.clientX/innerWidth-.5)*2;dmy=(e.clientY/innerHeight-.5)*2},{passive:true});
  // Touch drift on mobile
  addEventListener('touchmove',e=>{if(e.touches[0]){dmx=(e.touches[0].clientX/innerWidth-.5)*2;dmy=(e.touches[0].clientY/innerHeight-.5)*2}},{passive:true});
  function dustTick(){
    dctx.clearRect(0,0,dcvs.width,dcvs.height);
    for(const p of dust){
      p.x+=p.vx+dmx*p.z*.3;p.y+=p.vy+dmy*p.z*.3;
      if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;
      if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;
      dctx.beginPath();
      dctx.fillStyle=`rgba(${p.hue[0]},${p.hue[1]},${p.hue[2]},${p.a})`;
      dctx.arc(p.x,p.y,p.r*p.z,0,Math.PI*2);dctx.fill();
    }
    requestAnimationFrame(dustTick);
  }
  dustTick();
})();

// LOGO BREATHING (all devices)
(function(){
  const navLogo=document.querySelector('nav .nl img,.nl img');
  if(navLogo){
    navLogo.style.transition='filter 2s ease-in-out';
    let phase=0;
    setInterval(()=>{
      phase+=.04;
      const intensity=.4+Math.sin(phase)*.35;
      navLogo.style.filter=`drop-shadow(0 0 ${8+intensity*12}px rgba(0,224,192,${intensity}))`;
    },50);
  }
})();


// SECTION TRANSITION ORBS (all)
(function(){
  const orbContainer=document.createElement('div');
  orbContainer.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden';
  document.body.appendChild(orbContainer);
  const sections=document.querySelectorAll('section.sec');
  sections.forEach((sec,i)=>{
    if(i===0)return;
    const orb=document.createElement('div');
    const colors=['rgba(0,224,192,.6)','rgba(232,115,74,.5)','rgba(120,180,255,.5)','rgba(200,120,255,.5)'];
    const col=colors[i%colors.length];
    orb.style.cssText=`position:absolute;width:${6+Math.random()*6}px;height:${6+Math.random()*6}px;border-radius:50%;background:radial-gradient(circle,${col},transparent 70%);box-shadow:0 0 20px ${col};left:${10+Math.random()*80}%;top:0;opacity:0;transition:opacity .8s,transform 3s cubic-bezier(.16,1,.3,1)`;
    orbContainer.appendChild(orb);
    const obs=new IntersectionObserver((ent)=>{
      ent.forEach(e=>{
        if(e.isIntersecting){
          const r=sec.getBoundingClientRect();
          orb.style.top=(r.top+scrollY-20)+'px';
          orb.style.opacity='1';
          orb.style.transform=`translateY(${r.height+40}px)`;
          setTimeout(()=>orb.style.opacity='0',2800);
        }
      });
    },{threshold:.1});
    obs.observe(sec);
  });
})();

// AMBIENT AUDIO TOGGLE (all)
(function(){
  const audioBtn=document.createElement('button');
  audioBtn.setAttribute('aria-label','Sunet ambient');
  const svgMute='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
  const svgOn='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>';
  audioBtn.innerHTML=svgMute;
  audioBtn.style.cssText='position:fixed;bottom:1.5rem;left:1.5rem;width:44px;height:44px;border-radius:50%;background:rgba(6,8,18,.85);border:1px solid rgba(0,224,192,.25);color:#00e0c0;cursor:pointer;z-index:100;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.5),0 0 30px rgba(0,224,192,.15);transition:all .3s;-webkit-tap-highlight-color:transparent';
  document.body.appendChild(audioBtn);
  let audioCtx=null,gainNode=null,playing=false;
  audioBtn.onclick=()=>{
    if(!audioCtx){
      audioCtx=new(window.AudioContext||window.webkitAudioContext)();
      gainNode=audioCtx.createGain();gainNode.gain.value=0;gainNode.connect(audioCtx.destination);
      const osc1=audioCtx.createOscillator();osc1.frequency.value=55;osc1.type='sine';
      const osc2=audioCtx.createOscillator();osc2.frequency.value=82.5;osc2.type='sine';
      const osc3=audioCtx.createOscillator();osc3.frequency.value=110;osc3.type='triangle';
      const lfo=audioCtx.createOscillator();lfo.frequency.value=.15;
      const lfoGain=audioCtx.createGain();lfoGain.gain.value=8;
      lfo.connect(lfoGain).connect(osc1.frequency);
      const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=400;filter.Q.value=1.5;
      osc1.connect(filter);osc2.connect(filter);osc3.connect(filter);filter.connect(gainNode);
      osc1.start();osc2.start();osc3.start();lfo.start();
    }
    playing=!playing;
    gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(playing?.06:0,audioCtx.currentTime+1.2);
    audioBtn.innerHTML=playing?svgOn:svgMute;
  };
})();

// CURSOR TRAIL (desktop only)
if(!__MOB){(function(){
  const trailCvs=document.createElement('canvas');
  trailCvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:99;mix-blend-mode:screen';
  document.body.appendChild(trailCvs);
  const trailCtx=trailCvs.getContext('2d');
  function trResize(){trailCvs.width=innerWidth;trailCvs.height=innerHeight}
  trResize();addEventListener('resize',trResize);
  const trail=[];
  addEventListener('mousemove',e=>{trail.push({x:e.clientX,y:e.clientY,life:1});if(trail.length>40)trail.shift()},{passive:true});
  function trailTick(){
    trailCtx.clearRect(0,0,trailCvs.width,trailCvs.height);
    for(let i=0;i<trail.length;i++){
      const p=trail[i];p.life-=.025;if(p.life<=0)continue;
      const r=p.life*6;
      const g=trailCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,r);
      g.addColorStop(0,`rgba(0,224,192,${p.life*.6})`);g.addColorStop(1,'rgba(0,224,192,0)');
      trailCtx.fillStyle=g;trailCtx.beginPath();trailCtx.arc(p.x,p.y,r,0,Math.PI*2);trailCtx.fill();
    }
    while(trail.length&&trail[0].life<=0)trail.shift();
    requestAnimationFrame(trailTick);
  }
  trailTick();
})()}

// ========== PREMIUM FX ROUND 4 — 2026 ==========

// 7. ANIMATED NUMBER COUNTERS with cinematic easing
(function(){
  const nums=document.querySelectorAll('.proof-num,[data-count]');
  if(!nums.length)return;
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting||en.target.dataset.counted)return;
      en.target.dataset.counted='1';
      const el=en.target;
      const txt=el.textContent.trim();
      const match=txt.match(/^([^\d]*)(\d+(?:[.,]\d+)?)(.*)$/);
      if(!match)return;
      const prefix=match[1],end=parseFloat(match[2].replace(',','.')),suffix=match[3];
      const dur=1800,start=performance.now();
      function tick(t){
        const p=Math.min((t-start)/dur,1);
        const eased=1-Math.pow(1-p,3.5);
        const val=end*eased;
        el.textContent=prefix+(end%1===0?Math.round(val):val.toFixed(1))+suffix;
        if(p<1)requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  },{threshold:.4});
  nums.forEach(n=>obs.observe(n));
})();

// 8. TEXT SCRAMBLE EFFECT on headings
(function(){
  const chars='!<>-_\\/[]{}—=+*^?#________';
  class Scramble{
    constructor(el){this.el=el;this.original=el.textContent;this.queue=[];this.frame=0;this.frameReq=0}
    set(newText){
      const old=this.el.textContent,len=Math.max(old.length,newText.length);
      this.queue=[];
      for(let i=0;i<len;i++){
        const from=old[i]||'',to=newText[i]||'';
        const start=Math.floor(Math.random()*20),end=start+Math.floor(Math.random()*20);
        this.queue.push({from,to,start,end,char:''});
      }
      cancelAnimationFrame(this.frameReq);
      this.frame=0;this.update();
    }
    update(){
      let output='',complete=0;
      for(let i=0;i<this.queue.length;i++){
        const q=this.queue[i];
        if(this.frame>=q.end){complete++;output+=q.to}
        else if(this.frame>=q.start){
          if(!q.char||Math.random()<.28)q.char=chars[Math.floor(Math.random()*chars.length)];
          output+=`<span style="color:#00e0c0;opacity:.7">${q.char}</span>`;
        }else output+=q.from;
      }
      this.el.innerHTML=output;
      if(complete<this.queue.length){this.frameReq=requestAnimationFrame(()=>this.update());this.frame++}
    }
  }
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting||en.target.dataset.scrambled)return;
      en.target.dataset.scrambled='1';
      const s=new Scramble(en.target);
      const orig=en.target.textContent;
      en.target.textContent='';
      setTimeout(()=>s.set(orig),120);
      obs.unobserve(en.target);
    });
  },{threshold:.5});
  // Only main section headings - avoid nested spans
  document.querySelectorAll('.sh,.s2 h2:not(:has(span))').forEach(h=>{
    if(h.children.length===0)obs.observe(h);
  });
})();

// 9. 3D CARD TILT on hover (desktop only)
if(!__MOB){(function(){
  const cards=document.querySelectorAll('.pk,.type-card,.dce-item,.how-item,.proof-card,.faq-item');
  cards.forEach(card=>{
    card.style.transformStyle='preserve-3d';
    card.style.transition='transform .4s cubic-bezier(.2,.9,.3,1.2)';
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1000px) rotateX(${-y*8}deg) rotateY(${x*10}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'});
  });
})()}

// 10. SCROLL PROGRESS RADIAL (all devices)
(function(){
  const wrap=document.createElement('div');
  wrap.style.cssText='position:fixed;bottom:1.5rem;right:5.5rem;width:44px;height:44px;z-index:99;pointer-events:none';
  wrap.innerHTML='<svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" fill="none" stroke="rgba(0,224,192,.15)" stroke-width="2"/><circle id="sp-ring" cx="22" cy="22" r="18" fill="none" stroke="#00e0c0" stroke-width="2.2" stroke-dasharray="113.1" stroke-dashoffset="113.1" stroke-linecap="round" transform="rotate(-90 22 22)" style="filter:drop-shadow(0 0 6px rgba(0,224,192,.6));transition:stroke-dashoffset .15s linear"/></svg>';
  document.body.appendChild(wrap);
  const ring=wrap.querySelector('#sp-ring'),C=113.1;
  function upd(){
    const h=document.documentElement.scrollHeight-innerHeight;
    const p=h>0?Math.min(1,scrollY/h):0;
    ring.style.strokeDashoffset=C*(1-p);
  }
  addEventListener('scroll',upd,{passive:true});upd();
})();

// 11. SOUND DESIGN — soft click on interactive elements (opt-in via existing audio button)
(function(){
  let sfxCtx=null;
  function initSfx(){if(!sfxCtx)sfxCtx=new(window.AudioContext||window.webkitAudioContext)()}
  function playClick(){
    initSfx();
    const t=sfxCtx.currentTime;
    const osc=sfxCtx.createOscillator(),g=sfxCtx.createGain();
    osc.frequency.setValueAtTime(800,t);osc.frequency.exponentialRampToValueAtTime(200,t+.08);
    g.gain.setValueAtTime(.04,t);g.gain.exponentialRampToValueAtTime(.001,t+.08);
    osc.connect(g).connect(sfxCtx.destination);
    osc.start(t);osc.stop(t+.1);
  }
  function playSwoosh(){
    initSfx();
    const t=sfxCtx.currentTime;
    const noise=sfxCtx.createBufferSource();
    const buf=sfxCtx.createBuffer(1,sfxCtx.sampleRate*.3,sfxCtx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
    noise.buffer=buf;
    const f=sfxCtx.createBiquadFilter();f.type='bandpass';f.frequency.setValueAtTime(2000,t);f.frequency.exponentialRampToValueAtTime(500,t+.3);f.Q.value=2;
    const g=sfxCtx.createGain();g.gain.setValueAtTime(.05,t);g.gain.exponentialRampToValueAtTime(.001,t+.3);
    noise.connect(f).connect(g).connect(sfxCtx.destination);
    noise.start(t);
  }
  document.querySelectorAll('a.bh,button.bh,.pk,.type-card,.faq-q').forEach(el=>{
    el.addEventListener('click',()=>{try{playClick()}catch(e){}});
  });
  // Swoosh on section transitions
  const secObs=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting&&en.target.dataset.swooshed!=='1'){
        en.target.dataset.swooshed='1';
        try{playSwoosh()}catch(e){}
      }
    });
  },{threshold:.3});
  document.querySelectorAll('section.sec').forEach(s=>secObs.observe(s));
})();

// ========== PREMIUM FX ROUND 5 — 2026 ==========

// 12. LIVE TICKER under nav
(function(){
  const ticker=document.createElement('div');
  ticker.style.cssText='position:fixed;top:60px;left:0;right:0;background:linear-gradient(90deg,rgba(6,8,18,.95),rgba(10,20,35,.95),rgba(6,8,18,.95));backdrop-filter:blur(8px);border-bottom:1px solid rgba(0,224,192,.15);padding:.4rem 1.2rem;font-family:var(--fd,Syne),sans-serif;font-size:.72rem;color:#b8c5d0;z-index:99;display:flex;align-items:center;gap:.7rem;overflow:hidden;letter-spacing:.08em;text-transform:uppercase';
  const dot='<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#ff3344;box-shadow:0 0 8px rgba(255,51,68,.8);animation:livePulse 1.6s ease-in-out infinite"></span>';
  const items=[
    'Filmăm pentru client dental · azi',
    'Postare programată: TikTok · acum 12 min',
    'Ședință foto UGC · mâine 10:00',
    'Carousel live pe Instagram · @client acum 2h',
    'Editare reel pentru campanie Q4 · in lucru',
    'Strategie nouă livrată · azi dimineață'
  ];
  const track=document.createElement('div');
  track.style.cssText='display:flex;gap:3rem;animation:tickerScroll 45s linear infinite;white-space:nowrap';
  const content=items.map(i=>`${dot}<span>LIVE: ${i}</span>`).join('<span style="opacity:.3;margin:0 1rem">·</span>');
  track.innerHTML=content+'<span style="opacity:.3;margin:0 1rem">·</span>'+content;
  ticker.appendChild(track);
  document.body.appendChild(ticker);
  const kf=document.createElement('style');
  kf.textContent='@keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes livePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}';
  document.head.appendChild(kf);
  // Push nav content down
  document.body.style.paddingTop='28px';
})();

// 13. EXIT-INTENT MODAL
(function(){
  if(sessionStorage.getItem('exitShown'))return;
  let shown=false;
  const modal=document.createElement('div');
  modal.style.cssText='position:fixed;inset:0;background:rgba(2,4,10,.85);backdrop-filter:blur(12px);z-index:9998;display:none;align-items:center;justify-content:center;padding:1.5rem;opacity:0;transition:opacity .4s';
  modal.innerHTML='<div style="background:linear-gradient(180deg,rgba(12,16,28,.98),rgba(6,10,22,.98));border:1px solid rgba(0,224,192,.25);border-radius:24px;padding:3rem 2.5rem;max-width:480px;width:100%;text-align:center;box-shadow:0 50px 120px rgba(0,0,0,.8),0 0 80px rgba(0,224,192,.15);position:relative;transform:scale(.92);transition:transform .5s cubic-bezier(.2,.9,.3,1.4)"><button id="emClose" style="position:absolute;top:.8rem;right:.8rem;background:none;border:none;color:#888;font-size:1.6rem;cursor:pointer;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center" aria-label="Închide">×</button><div style="font-family:var(--fd,Syne),sans-serif;font-size:.7rem;color:#00e0c0;letter-spacing:.3em;text-transform:uppercase;margin-bottom:1rem">Stai puțin</div><h3 style="font-family:var(--fd,Syne),sans-serif;font-size:1.8rem;color:#fff5e6;margin:0 0 .8rem;line-height:1.15;font-weight:800">Audit gratuit<br>15 minute</h3><p style="color:#b8c5d0;font-size:.95rem;line-height:1.5;margin:0 0 1.6rem">Îți analizăm gratuit conturile de social media și îți spunem exact ce să schimbi ca să crești.</p><a href="https://calendly.com/ivorymarketing2/30min" target="_blank" style="display:inline-flex;align-items:center;gap:.5rem;background:linear-gradient(135deg,#ff9a3d,#ffb86b);color:#1a0a00;padding:1rem 2rem;border-radius:100px;font-family:var(--fd,Syne),sans-serif;font-weight:700;text-decoration:none;font-size:.92rem;box-shadow:0 10px 30px rgba(255,154,61,.35)">Rezervă acum →</a></div>';
  document.body.appendChild(modal);
  function show(){
    if(shown)return;shown=true;
    sessionStorage.setItem('exitShown','1');
    modal.style.display='flex';
    requestAnimationFrame(()=>{modal.style.opacity='1';modal.firstChild.style.transform='scale(1)'});
  }
  function hide(){modal.style.opacity='0';setTimeout(()=>modal.style.display='none',400)}
  document.getElementById('emClose')?.addEventListener('click',hide);
  modal.addEventListener('click',e=>{if(e.target===modal)hide()});
  // Desktop: mouse leave top
  if(!__MOB){
    document.addEventListener('mouseleave',e=>{if(e.clientY<10)show()});
  }else{
    // Mobile: trigger after 35sec on page if scrolled past hero
    setTimeout(()=>{if(scrollY>window.innerHeight*1.5)show()},35000);
  }
})();

// 14. FAQ SEARCH BAR
(function(){
  const faqSec=document.querySelector('#faq');
  if(!faqSec)return;
  const items=faqSec.querySelectorAll('.faq-item');
  if(!items.length)return;
  const search=document.createElement('div');
  search.style.cssText='margin:0 auto 2rem;max-width:600px;position:relative';
  search.innerHTML='<input type="text" id="faqSearch" placeholder="Caută în întrebări..." style="width:100%;padding:1rem 1.2rem 1rem 2.8rem;background:rgba(10,14,24,.7);border:1px solid rgba(0,224,192,.2);border-radius:100px;color:#fff5e6;font-family:var(--fb,DM Sans),sans-serif;font-size:.95rem;outline:none;transition:border-color .3s"><svg style="position:absolute;left:1rem;top:50%;transform:translateY(-50%);opacity:.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e0c0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  const grid=faqSec.querySelector('.faq-grid')||items[0].parentElement;
  grid.parentElement.insertBefore(search,grid);
  const inp=document.getElementById('faqSearch');
  inp.addEventListener('focus',()=>inp.style.borderColor='rgba(0,224,192,.5)');
  inp.addEventListener('blur',()=>inp.style.borderColor='rgba(0,224,192,.2)');
  inp.addEventListener('input',e=>{
    const q=e.target.value.toLowerCase().trim();
    items.forEach(item=>{
      const txt=item.textContent.toLowerCase();
      const match=!q||txt.includes(q);
      item.style.display=match?'':'none';
      item.style.opacity=match?'1':'0';
    });
  });
})();

// 15. REDUCED MOTION SUPPORT
(function(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){
    const s=document.createElement('style');
    s.textContent='*,*::before,*::after{animation-duration:.01ms !important;animation-iteration-count:1 !important;transition-duration:.01ms !important;scroll-behavior:auto !important}.hero3d{opacity:.3 !important}';
    document.head.appendChild(s);
  }
})();

// 16. FOCUS RINGS (keyboard polish)
(function(){
  const s=document.createElement('style');
  s.textContent='a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,[tabindex]:focus-visible{outline:2px solid #00e0c0 !important;outline-offset:3px !important;border-radius:4px;box-shadow:0 0 0 4px rgba(0,224,192,.2)}';
  document.head.appendChild(s);
})();

// 17. LAZY LOAD IMAGES below fold
(function(){
  document.querySelectorAll('img').forEach(img=>{
    if(!img.loading)img.loading='lazy';
    if(!img.decoding)img.decoding='async';
  });
  document.querySelectorAll('video').forEach(v=>{
    if(!v.preload)v.preload='metadata';
  });
})();

// ========== PREMIUM FX ROUND 6 ==========

// 18. PARTICLE BURST on CTA click
(function(){
  const burstCvs=document.createElement('canvas');
  burstCvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9997;mix-blend-mode:screen';
  document.body.appendChild(burstCvs);
  const bctx=burstCvs.getContext('2d');
  function brResize(){burstCvs.width=innerWidth;burstCvs.height=innerHeight}
  brResize();addEventListener('resize',brResize);
  const particles=[];
  function burst(x,y,palette){
    for(let i=0;i<32;i++){
      const angle=Math.random()*Math.PI*2;
      const speed=2+Math.random()*5;
      particles.push({
        x,y,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed-2,
        life:1,
        size:2+Math.random()*3,
        col:palette[Math.floor(Math.random()*palette.length)]
      });
    }
  }
  function tick(){
    bctx.clearRect(0,0,burstCvs.width,burstCvs.height);
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];
      p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.vx*=.98;p.life-=.018;
      if(p.life<=0){particles.splice(i,1);continue}
      bctx.beginPath();
      bctx.fillStyle=`rgba(${p.col},${p.life})`;
      bctx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);
      bctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
  document.addEventListener('click',e=>{
    const t=e.target.closest('a.bh,button.bh,a.cta,.b-peach');
    if(!t)return;
    const r=t.getBoundingClientRect();
    const isPeach=t.classList.contains('b-peach');
    const palette=isPeach?['255,154,61','255,184,107','255,228,181']:['0,224,192','125,255,230','180,255,240'];
    burst(r.left+r.width/2,r.top+r.height/2,palette);
  });
})();

// 19. KINETIC TYPOGRAPHY hero - word stagger reveal on slide activation
(function(){
  const lines=document.querySelectorAll('.prob-line');
  lines.forEach(line=>{
    // Wrap each word in a span (preserving inner spans like .pac/.pdm)
    function wrapWords(node){
      const out=document.createDocumentFragment();
      node.childNodes.forEach(child=>{
        if(child.nodeType===3){
          const words=child.textContent.split(/(\s+)/);
          words.forEach(w=>{
            if(/^\s+$/.test(w)){out.appendChild(document.createTextNode(w))}
            else if(w){
              const sp=document.createElement('span');
              sp.className='kw';
              sp.textContent=w;
              sp.style.cssText='display:inline-block;opacity:0;transform:translateY(20px);transition:opacity .5s,transform .5s';
              out.appendChild(sp);
            }
          });
        }else if(child.nodeType===1){
          const clone=child.cloneNode(false);
          clone.appendChild(wrapWords(child));
          out.appendChild(clone);
        }
      });
      return out;
    }
    const wrapped=wrapWords(line);
    line.innerHTML='';
    line.appendChild(wrapped);
  });
  // Watch for .act class and stagger reveal
  const obs=new MutationObserver(muts=>{
    muts.forEach(m=>{
      if(m.attributeName==='class'&&m.target.classList.contains('act')){
        const words=m.target.querySelectorAll('.kw');
        words.forEach((w,i)=>{
          setTimeout(()=>{w.style.opacity='1';w.style.transform='translateY(0)'},i*60);
        });
      }else if(m.attributeName==='class'&&!m.target.classList.contains('act')){
        const words=m.target.querySelectorAll('.kw');
        words.forEach(w=>{w.style.opacity='0';w.style.transform='translateY(20px)'});
      }
    });
  });
  lines.forEach(l=>obs.observe(l,{attributes:true}));
})();

// 20. MOUSE SPOTLIGHT (desktop only)
if(!__MOB){(function(){
  const sl=document.createElement('div');
  sl.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:4;background:radial-gradient(circle 320px at 50% 50%,rgba(0,224,192,.06),rgba(255,154,61,.03) 40%,transparent 70%);transition:background .15s linear;mix-blend-mode:screen';
  document.body.appendChild(sl);
  addEventListener('mousemove',e=>{
    sl.style.background=`radial-gradient(circle 320px at ${e.clientX}px ${e.clientY}px,rgba(0,224,192,.08),rgba(255,154,61,.04) 40%,transparent 70%)`;
  },{passive:true});
})()}

// 21. HOVER SOUND on cards (subtle micro-tone)
(function(){
  let hCtx=null;
  function init(){if(!hCtx)try{hCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}
  function tone(freq){
    init();if(!hCtx)return;
    const t=hCtx.currentTime;
    const o=hCtx.createOscillator(),g=hCtx.createGain();
    o.frequency.value=freq;o.type='sine';
    g.gain.setValueAtTime(.015,t);g.gain.exponentialRampToValueAtTime(.001,t+.15);
    o.connect(g).connect(hCtx.destination);
    o.start(t);o.stop(t+.15);
  }
  if(__MOB)return;
  const map=[
    {sel:'.pk',freq:440},
    {sel:'.type-card',freq:523},
    {sel:'.dce-item',freq:587},
    {sel:'.faq-item',freq:392}
  ];
  map.forEach(m=>{
    document.querySelectorAll(m.sel).forEach(el=>{
      el.addEventListener('mouseenter',()=>tone(m.freq));
    });
  });
})();

// 22. GLASSMORPHISM NAV on scroll
(function(){
  const s=document.createElement('style');
  s.textContent='nav.sc{backdrop-filter:blur(20px) saturate(1.8) !important;-webkit-backdrop-filter:blur(20px) saturate(1.8) !important;background:rgba(6,8,18,.72) !important;border-bottom:1px solid rgba(0,224,192,.18) !important;box-shadow:0 8px 40px rgba(0,0,0,.5),0 0 60px rgba(0,224,192,.05) !important}';
  document.head.appendChild(s);
})();

// 23. SOCIAL PROOF BADGES on packages
(function(){
  const pks=document.querySelectorAll('.pk');
  if(!pks.length)return;
  const counts=[12,24,8];
  pks.forEach((pk,i)=>{
    if(i>=counts.length)return;
    const badge=document.createElement('div');
    badge.style.cssText='position:absolute;top:.7rem;right:.7rem;background:rgba(0,224,192,.12);border:1px solid rgba(0,224,192,.3);color:#7dffe6;padding:.35rem .7rem;border-radius:100px;font-family:var(--fb,DM Sans),sans-serif;font-size:.65rem;letter-spacing:.05em;backdrop-filter:blur(8px);opacity:0;transform:translateY(-6px);transition:opacity .4s,transform .4s;pointer-events:none;z-index:5;display:flex;align-items:center;gap:.35rem';
    badge.innerHTML=`<svg width="10" height="10" viewBox="0 0 24 24" fill="#00e0c0"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ales de ${counts[i]} antreprenori`;
    if(getComputedStyle(pk).position==='static')pk.style.position='relative';
    pk.appendChild(badge);
    pk.addEventListener('mouseenter',()=>{badge.style.opacity='1';badge.style.transform='translateY(0)'});
    pk.addEventListener('mouseleave',()=>{badge.style.opacity='0';badge.style.transform='translateY(-6px)'});
  });
})();

// ========== PREMIUM FX ROUND 7 ==========

// 24. LIQUID BLOB CURSOR (desktop only)
if(!__MOB){(function(){
  const cvs=document.createElement('canvas');
  cvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9996;mix-blend-mode:screen';
  document.body.appendChild(cvs);
  const ctx=cvs.getContext('2d');
  function rs(){cvs.width=innerWidth;cvs.height=innerHeight}rs();addEventListener('resize',rs);
  let mx=0,my=0,bx=0,by=0,vx=0,vy=0,lastX=0,lastY=0;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
  function tick(){
    bx+=(mx-bx)*.18;by+=(my-by)*.18;
    vx=bx-lastX;vy=by-lastY;lastX=bx;lastY=by;
    const speed=Math.min(Math.sqrt(vx*vx+vy*vy),40);
    const stretch=1+speed*.04;
    const angle=Math.atan2(vy,vx);
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.save();
    ctx.translate(bx,by);
    ctx.rotate(angle);
    const grad=ctx.createRadialGradient(0,0,0,0,0,18);
    grad.addColorStop(0,'rgba(0,224,192,.55)');
    grad.addColorStop(.5,'rgba(0,224,192,.2)');
    grad.addColorStop(1,'rgba(0,224,192,0)');
    ctx.fillStyle=grad;
    ctx.beginPath();
    ctx.ellipse(0,0,18*stretch,18/Math.max(stretch,1),0,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
    requestAnimationFrame(tick);
  }
  tick();
})()}

// 25. CONFETTI on form submit success
(function(){
  const form=document.getElementById('contactForm');
  if(!form)return;
  const cvs=document.createElement('canvas');
  cvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:10000';
  document.body.appendChild(cvs);
  const ctx=cvs.getContext('2d');
  function rs(){cvs.width=innerWidth;cvs.height=innerHeight}rs();addEventListener('resize',rs);
  const conf=[];
  const colors=['#00e0c0','#ff9a3d','#ffe4b5','#fff5e6','#7dffe6'];
  function explode(){
    const cx=innerWidth/2,cy=innerHeight/2;
    for(let i=0;i<160;i++){
      const a=Math.random()*Math.PI*2;
      const v=8+Math.random()*14;
      conf.push({
        x:cx,y:cy,
        vx:Math.cos(a)*v,vy:Math.sin(a)*v-3,
        rot:Math.random()*Math.PI*2,vrot:(Math.random()-.5)*.3,
        w:6+Math.random()*8,h:3+Math.random()*5,
        col:colors[Math.floor(Math.random()*colors.length)],
        life:1
      });
    }
  }
  function draw(){
    ctx.clearRect(0,0,cvs.width,cvs.height);
    for(let i=conf.length-1;i>=0;i--){
      const p=conf[i];
      p.x+=p.vx;p.y+=p.vy;p.vy+=.32;p.vx*=.99;p.rot+=p.vrot;p.life-=.008;
      if(p.life<=0||p.y>cvs.height+50){conf.splice(i,1);continue}
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.fillStyle=p.col;ctx.globalAlpha=p.life;
      ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  draw();
  form.addEventListener('submit',()=>setTimeout(explode,200));
})();

// 26. ANIMATED TIMELINE WORKFLOW (inject before #pachete)
(function(){
  const target=document.querySelector('#pachete')||document.querySelector('#servicii');
  if(!target||document.getElementById('workflow'))return;
  const wfStyle=document.createElement('style');
  wfStyle.textContent='#workflow{padding:6rem 1.5rem !important}#workflow .si{background:linear-gradient(180deg,rgba(8,10,20,.94),rgba(4,6,14,.97));border:1px solid rgba(0,224,192,.12);border-radius:24px;padding:5rem 3rem !important;box-shadow:0 50px 120px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.05),0 0 0 1px rgba(0,224,192,.05);max-width:1200px;margin:0 auto;position:relative}#workflow .wf-grid{position:relative;display:grid;grid-template-columns:repeat(5,1fr);gap:1.5rem;max-width:1000px;margin:3.5rem auto 0;padding:0}#workflow .wf-line{position:absolute;top:36px;left:10%;right:10%;height:2px;background:rgba(0,224,192,.12);z-index:0;border-radius:2px;overflow:hidden}#workflow .wf-line::after{content:"";display:block;height:100%;width:var(--wfp,0%);background:linear-gradient(90deg,#00e0c0,#7dffe6);box-shadow:0 0 14px rgba(0,224,192,.55);border-radius:2px;transition:width 1.4s cubic-bezier(.2,.9,.3,1)}#workflow .wf-step{position:relative;z-index:1;text-align:center;display:flex;flex-direction:column;align-items:center;padding:0 .3rem}#workflow .wf-num{width:72px;height:72px;border-radius:50%;background:rgba(8,12,22,.98);border:1.5px solid rgba(125,255,230,.3);margin:0 auto 1.4rem;display:flex;align-items:center;justify-content:center;font-family:var(--fd,Syne),sans-serif;font-weight:700;color:#7dffe6;font-size:1.1rem;letter-spacing:.04em;transition:all .5s cubic-bezier(.2,.9,.3,1.2);box-shadow:0 0 0 6px rgba(0,224,192,.04);line-height:1}#workflow .wf-step h4{font-family:var(--fd,Syne),sans-serif;font-weight:700;color:#fff5e6;font-size:1.05rem;margin:0 0 .5rem;letter-spacing:-.01em}#workflow .wf-step p{color:#a8b5c0;font-size:.82rem;line-height:1.5;margin:0;max-width:170px}#workflow .wf-eyebrow{display:inline-block;font-family:var(--fd,Syne),sans-serif;font-size:.72rem;color:#00e0c0;letter-spacing:.32em;text-transform:uppercase;margin-bottom:1rem;padding:.45rem 1rem;border:1px solid rgba(0,224,192,.25);border-radius:100px;background:rgba(0,224,192,.05)}#workflow .wf-title{font-family:var(--fd,Syne),sans-serif;font-size:clamp(2rem,4.5vw,3.4rem);color:#fff5e6;margin:0;font-weight:800;letter-spacing:-.025em;line-height:1.1;text-align:center}@media(max-width:768px){#workflow{padding:3rem 1rem !important}#workflow .si{padding:2.8rem 1.4rem !important}#workflow .wf-grid{grid-template-columns:1fr 1fr !important;gap:2rem 1rem !important;margin-top:2.5rem !important}#workflow .wf-line{display:none}#workflow .wf-num{width:60px;height:60px;font-size:1rem;margin-bottom:1rem}#workflow .wf-step h4{font-size:.95rem}#workflow .wf-step p{font-size:.76rem;max-width:140px}}';
  document.head.appendChild(wfStyle);
  const sec=document.createElement('section');
  sec.id='workflow';sec.className='sec';
  const steps=[['Brief','Ne spui ce vrei. ÃŽnÈ›elegem business-ul tÄƒu.'],['Research','AnalizÄƒm niÈ™a, audienÈ›a È™i competiÈ›ia.'],['ProducÈ›ie','FilmÄƒm, editÄƒm, creÄƒm conÈ›inutul.'],['Publicare','ProgramÄƒm È™i postÄƒm pe toate platformele.'],['Analytics','RaportÄƒm rezultatele È™i optimizÄƒm.']];
  sec.innerHTML='<div class="si"><div style="text-align:center"><span class="wf-eyebrow">Workflow</span><h2 class="wf-title">Cum lucrÄƒm cu tine</h2></div><div class="wf-grid"><div class="wf-line" id="wfLine"></div>'+steps.map((s,i)=>'<div class="wf-step"><div class="wf-num" data-i="'+i+'">0'+(i+1)+'</div><h4>'+s[0]+'</h4><p>'+s[1]+'</p></div>').join('')+'</div></div>';
  target.parentNode.insertBefore(sec,target);
  const line=sec.querySelector('#wfLine');
  const nums=sec.querySelectorAll('.wf-num');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        line.style.setProperty('--wfp','100%');
        nums.forEach((n,i)=>{
          setTimeout(()=>{
            n.style.borderColor='#00e0c0';
            n.style.color='#fff5e6';
            n.style.background='rgba(0,224,192,.12)';
            n.style.boxShadow='0 0 0 6px rgba(0,224,192,.08),0 0 24px rgba(0,224,192,.35)';
            n.style.transform='scale(1.05)';
          },i*200);
        });
        obs.unobserve(en.target);
      }
    });
  },{threshold:.35});
  obs.observe(sec);
})();
// 27. GRADIENT MESH animated background
(function(){
  const s=document.createElement('style');
  s.textContent='@keyframes meshShift{0%,100%{background-position:0% 50%,100% 50%,50% 0%}33%{background-position:50% 100%,0% 0%,100% 50%}66%{background-position:100% 0%,50% 100%,0% 50%}}body::before{content:"";position:fixed;inset:0;background:radial-gradient(ellipse 60% 50% at 0% 0%,rgba(0,224,192,.04),transparent 70%),radial-gradient(ellipse 50% 60% at 100% 100%,rgba(255,154,61,.035),transparent 70%),radial-gradient(ellipse 70% 40% at 50% 50%,rgba(125,255,230,.025),transparent 70%);background-size:200% 200%,200% 200%,200% 200%;animation:meshShift 28s ease-in-out infinite;pointer-events:none;z-index:1;mix-blend-mode:screen}';
  document.head.appendChild(s);
})();

// 28. PORTFOLIO HOVER PREVIEW (autoplay video on hover)
(function(){
  const cards=document.querySelectorAll('.pf-img,.portfolio-item,.pf-card');
  cards.forEach(card=>{
    const img=card.querySelector('img');
    if(!img)return;
    // Try to find associated video
    const vidSrc=card.dataset.video||'upscaled-video__8_.mp4';
    let vid=null;
    card.addEventListener('mouseenter',()=>{
      if(__MOB)return;
      if(!vid){
        vid=document.createElement('video');
        vid.src=vidSrc;vid.muted=true;vid.loop=true;vid.playsInline=true;
        vid.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s;border-radius:inherit;pointer-events:none';
        if(getComputedStyle(card).position==='static')card.style.position='relative';
        card.appendChild(vid);
      }
      vid.play().catch(()=>{});
      requestAnimationFrame(()=>vid.style.opacity='1');
    });
    card.addEventListener('mouseleave',()=>{
      if(vid){vid.style.opacity='0';setTimeout(()=>vid.pause(),500)}
    });
  });
})();

// 29. SMART CTA FLOAT — WhatsApp expand after 10sec
(function(){
  setTimeout(()=>{
    const wa=document.querySelector('a[href*="whatsapp"][class*="float"],a[href*="api.whatsapp"][style*="fixed"],.whatsapp-float,a[aria-label*="WhatsApp"]')||document.querySelectorAll('a[href*="whatsapp.com"]')[document.querySelectorAll('a[href*="whatsapp.com"]').length-1];
    if(!wa)return;
    const tip=document.createElement('div');
    tip.style.cssText='position:fixed;bottom:1.7rem;right:5rem;background:rgba(6,8,18,.95);backdrop-filter:blur(12px);color:#fff5e6;padding:.7rem 1.1rem;border-radius:100px;font-family:var(--fb,DM Sans),sans-serif;font-size:.82rem;border:1px solid rgba(0,224,192,.25);box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 40px rgba(37,211,102,.15);z-index:98;opacity:0;transform:translateX(20px);transition:opacity .5s,transform .5s;pointer-events:none;white-space:nowrap';
    tip.innerHTML='<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#25d366;box-shadow:0 0 8px rgba(37,211,102,.8);margin-right:.5rem;animation:livePulse 1.6s ease-in-out infinite"></span>Răspundem în 2 min';
    document.body.appendChild(tip);
    requestAnimationFrame(()=>{tip.style.opacity='1';tip.style.transform='translateX(0)'});
    setTimeout(()=>{tip.style.opacity='0';tip.style.transform='translateX(20px)';setTimeout(()=>tip.remove(),600)},6000);
  },10000);
})();
