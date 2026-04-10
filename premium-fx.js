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
