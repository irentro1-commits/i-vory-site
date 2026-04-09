// Premium interactions — mobile-aware
const __MOB=window.__IS_MOBILE||("ontouchstart" in window)||matchMedia("(max-width:768px)").matches;
const __LOW=window.__LOW_PERF||__MOB;

(function(){
  // 1. MAGNETIC CTA BUTTONS (desktop only)
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

  // 2. PARALLAX TITLE SHIFT (desktop only)
  if(!__MOB){
    let mx=0,my=0,tmx=0,tmy=0;
    window.addEventListener('mousemove',e=>{
      tmx=(e.clientX/window.innerWidth-.5)*2;
      tmy=(e.clientY/window.innerHeight-.5)*2;
    },{passive:true});
    const titles=document.querySelectorAll('.sec h2,.s2 h2,.sh,.contact-h');
    function tick(){
      mx+=(tmx-mx)*.06;my+=(tmy-my)*.06;
      titles.forEach(t=>{t.style.transform=`translate(${-mx*8}px,${-my*6}px)`});
      requestAnimationFrame(tick);
    }
    tick();
  }


  // 3. SCROLL TEXT REVEAL (both)
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

  // 4. WARP SCROLL - stretch stars based on scroll velocity (both, cheap)
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
  },__LOW?80:40);
})();

// CONSTELLATION — desktop only (expensive hover math)
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

// GALAXY DUST — reduced count on mobile
(function(){
  const N=__LOW?50:200;
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
  if(!__MOB){addEventListener('mousemove',e=>{dmx=(e.clientX/innerWidth-.5)*2;dmy=(e.clientY/innerHeight-.5)*2},{passive:true})}
  let frame=0;
  function dustTick(){
    frame++;
    // On mobile, render every other frame
    if(__LOW&&frame%2){requestAnimationFrame(dustTick);return}
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

// LOGO BREATHING (both — cheap)
(function(){
  const navLogo=document.querySelector('nav .nl img,.nl img');
  if(navLogo){
    navLogo.style.transition='filter 2s ease-in-out';
    let phase=0;
    setInterval(()=>{
      phase+=.04;
      const intensity=.4+Math.sin(phase)*.35;
      navLogo.style.filter=`drop-shadow(0 0 ${8+intensity*12}px rgba(0,224,192,${intensity}))`;
    },__LOW?100:50);
  }
})();

// SECTION TRANSITION ORBS (both — cheap)
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

// AMBIENT AUDIO TOGGLE (both)
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
