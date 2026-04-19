/* mobile-fx.js — Brand identity effects pentru mobile index.html
   Restaureaza Pamant + dragon + galaxia pe mobile (L-IVORY-01 sacred rule).
   Canvas 2D pur, zero Three.js, zero dependinte externe.
   Consuma window.__EARTH_TEX (base64 PNG) + window.__LOGO_SVG_B64 (base64 SVG).
   Self-executing IIFE. Gated din index.html mobile branch (U20).
*/
(function(){
  'use strict';
  if(window.__MOBILE_FX_LOADED)return;window.__MOBILE_FX_LOADED=true;

  // ===== DEBUG MARKER U21.1 (de sters cand confirmat vizibil) =====
  try{
    var dbg=document.createElement('div');
    dbg.id='mfx-debug';
    dbg.textContent='MFX22 E='+(window.__EARTH_TEX?'Y':'N')+' L='+(window.__LOGO_SVG_B64?'Y':'N');
    dbg.style.cssText='position:fixed;top:env(safe-area-inset-top,12px);right:12px;z-index:99999;background:#ff0066;color:#fff;padding:4px 8px;font-size:11px;font-family:monospace;border-radius:4px;pointer-events:none;box-shadow:0 0 12px rgba(255,0,102,.6)';
    document.body.appendChild(dbg);
  }catch(_){}

  var W=window.innerWidth,H=window.innerHeight;
  var REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR=Math.min(window.devicePixelRatio||1, 1.5);

  // ===== CONTAINER ROOT (z:0 peste bg, sub content z:3+) =====
  var root=document.createElement('div');
  root.id='mfx-root';
  root.setAttribute('aria-hidden','true');
  root.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
  document.body.appendChild(root);

  // ===== GALAXY AURA (radial gradient vizibil) =====
  var aura=document.createElement('div');
  aura.style.cssText=[
    'position:absolute',
    'left:50%','top:35%',
    'width:'+Math.min(W*1.4,640)+'px',
    'height:'+Math.min(W*1.4,640)+'px',
    'transform:translate(-50%,-50%)',
    'background:radial-gradient(circle, rgba(186,85,211,.7) 0%, rgba(123,44,255,.45) 30%, rgba(255,77,166,.22) 55%, rgba(4,6,16,0) 78%)',
    'filter:blur(50px)',
    'opacity:.75',
    'pointer-events:none',
    'animation: mfxAura 8s ease-in-out infinite alternate'
  ].join(';');
  root.appendChild(aura);

  // ===== STYLE KEYFRAMES =====
  var style=document.createElement('style');
  style.textContent=[
    '@keyframes mfxAura{0%{opacity:.55;transform:translate(-50%,-50%) scale(1)}100%{opacity:.85;transform:translate(-50%,-50%) scale(1.15)}}',
    '@keyframes mfxEarthSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}',
    '@keyframes mfxDragonFloat{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-12px) rotate(-4deg)}}',
    '@keyframes mfxOrbitCW{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}',
    '@keyframes mfxOrbitCCW{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(-360deg)}}',
    '@keyframes mfxSatPulse{0%,100%{opacity:.9;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.3)}}'
  ].join('');
  document.head.appendChild(style);

  // ===== STARFIELD CANVAS =====
  var starCvs=document.createElement('canvas');
  starCvs.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.9;';
  root.appendChild(starCvs);
  var sctx=starCvs.getContext('2d',{alpha:true});
  function sizeStars(){
    W=window.innerWidth;H=window.innerHeight;
    starCvs.width=Math.floor(W*DPR);starCvs.height=Math.floor(H*DPR);
    sctx.setTransform(DPR,0,0,DPR,0,0);
  }
  sizeStars();
  var COUNT=90;
  var stars=[];
  for(var i=0;i<COUNT;i++){
    stars.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*2.2+1.2,
      tw:Math.random()*Math.PI*2,
      tws:.015+Math.random()*.025,
      hue:Math.random()<.25?260:(Math.random()<.5?320:(Math.random()<.7?200:0))
    });
  }

  // ===== EARTH CANVAS (small rotating planet) =====
  var earthSize=Math.min(W*.48,180);
  var earthWrap=document.createElement('div');
  earthWrap.style.cssText=[
    'position:absolute',
    'left:50%','top:28%',
    'width:'+earthSize+'px','height:'+earthSize+'px',
    'transform:translate(-50%,-50%)',
    'pointer-events:none',
    'border-radius:50%',
    'box-shadow:0 0 60px rgba(123,44,255,.4), 0 0 120px rgba(186,85,211,.25), inset -8px -8px 30px rgba(0,0,0,.6)',
    'overflow:hidden',
    'animation: mfxEarthSpin 60s linear infinite'
  ].join(';');
  root.appendChild(earthWrap);

  var earthCvs=document.createElement('canvas');
  earthCvs.width=Math.floor(earthSize*DPR);
  earthCvs.height=Math.floor(earthSize*DPR);
  earthCvs.style.cssText='width:100%;height:100%;display:block;border-radius:50%;';
  earthWrap.appendChild(earthCvs);
  var ectx=earthCvs.getContext('2d',{alpha:true});

  function paintEarth(){
    var tex=window.__EARTH_TEX;
    if(!tex){
      // Fallback: gradient circle
      var grad=ectx.createRadialGradient(earthSize*.4*DPR,earthSize*.35*DPR,earthSize*.1*DPR,earthSize*.5*DPR,earthSize*.5*DPR,earthSize*.55*DPR);
      grad.addColorStop(0,'#4a90d9');
      grad.addColorStop(.5,'#2c5a8a');
      grad.addColorStop(1,'#0a1e3a');
      ectx.fillStyle=grad;
      ectx.beginPath();
      ectx.arc(earthSize*.5*DPR,earthSize*.5*DPR,earthSize*.5*DPR,0,Math.PI*2);
      ectx.fill();
      return;
    }
    var img=new Image();
    img.onload=function(){
      ectx.drawImage(img,0,0,earthCvs.width,earthCvs.height);
    };
    img.src=typeof tex==='string'?tex:tex.src||tex;
  }
  paintEarth();

  // ===== ORBITS + SATELLITES (U23: 4 sateliti pe 3 orbite in jurul Pamantului) =====
  // Strategie: ringuri invizibile centrate pe Pamant, cu puncte luminoase animate prin CSS rotate.
  // Sateliti = absolute positioned pe rim-ul ringului, glow cu box-shadow, pulse in paralel.
  function makeOrbit(ringSize, dur, dir, sats){
    var ring=document.createElement('div');
    ring.style.cssText=[
      'position:absolute',
      'left:50%','top:28%',
      'width:'+ringSize+'px','height:'+ringSize+'px',
      'transform:translate(-50%,-50%)',
      'pointer-events:none',
      'animation: '+(dir==='cw'?'mfxOrbitCW':'mfxOrbitCCW')+' '+dur+'s linear infinite'
    ].join(';');
    // Inel subtil vizibil (orbital trace, super discret)
    var trace=document.createElement('div');
    trace.style.cssText=[
      'position:absolute','inset:0',
      'border-radius:50%',
      'border:1px dashed rgba(186,85,211,.12)',
      'box-sizing:border-box'
    ].join(';');
    ring.appendChild(trace);
    // Sateliti pe rim la unghiuri diferite
    for(var s=0;s<sats.length;s++){
      var sat=sats[s];
      var deg=sat.angle*Math.PI/180;
      var cx=ringSize/2+Math.cos(deg)*ringSize/2;
      var cy=ringSize/2+Math.sin(deg)*ringSize/2;
      var dot=document.createElement('div');
      dot.style.cssText=[
        'position:absolute',
        'left:'+cx+'px','top:'+cy+'px',
        'width:'+sat.size+'px','height:'+sat.size+'px',
        'transform:translate(-50%,-50%)',
        'border-radius:50%',
        'background:'+sat.color,
        'box-shadow:0 0 '+(sat.size*2)+'px '+sat.glow+', 0 0 '+(sat.size*4)+'px '+sat.glow,
        'animation: mfxSatPulse '+(2+s*.7)+'s ease-in-out infinite'
      ].join(';');
      ring.appendChild(dot);
    }
    root.appendChild(ring);
  }
  var ringBase=earthSize*1.15;
  // Orbita 1 (interioara, rapida, 1 satelit cyan)
  makeOrbit(ringBase*0.95, 9, 'cw', [
    {angle:0, size:8, color:'#7ef5ff', glow:'rgba(126,245,255,.9)'}
  ]);
  // Orbita 2 (mijloc, contra-sens, 2 sateliti mov+roz)
  makeOrbit(ringBase*1.2, 16, 'ccw', [
    {angle:45, size:7, color:'#d98cff', glow:'rgba(186,85,211,.9)'},
    {angle:220, size:6, color:'#ff5fa8', glow:'rgba(255,95,168,.85)'}
  ]);
  // Orbita 3 (exterioara, lenta, 1 satelit alb mare = semnal, prin sus)
  makeOrbit(ringBase*1.5, 24, 'cw', [
    {angle:135, size:10, color:'#fff7d6', glow:'rgba(255,247,214,.95)'}
  ]);

  // ===== DRAGON/LOGO (floating, top-right of hero) =====
  // FIX U22: window.__LOGO_SVG_B64 contine doar base64, trebuie prefix data URL
  var logoB64=window.__LOGO_SVG_B64;
  var logoSrc=null;
  if(logoB64){
    // Daca deja are prefix data: lasa-l, altfel adauga prefixul SVG
    logoSrc=(logoB64.indexOf('data:')===0)?logoB64:('data:image/svg+xml;base64,'+logoB64);
  }else{
    // Fallback: incarca direct logo-nav.svg
    logoSrc='logo-nav.svg';
  }
  var logoImg=document.createElement('img');
  logoImg.src=logoSrc;
  logoImg.alt='';
  logoImg.setAttribute('aria-hidden','true');
  logoImg.style.cssText=[
    'position:absolute',
    'right:6%','top:14%',
    'width:'+Math.min(W*.26,120)+'px',
    'height:auto',
    'opacity:.92',
    'filter:drop-shadow(0 0 24px rgba(186,85,211,.7)) drop-shadow(0 0 12px rgba(123,44,255,.5))',
    'animation: mfxDragonFloat 6s ease-in-out infinite',
    'pointer-events:none'
  ].join(';');
  root.appendChild(logoImg);

  // ===== STARFIELD ANIMATION =====
  var running=true;
  function tickStars(){
    if(!running)return;
    sctx.clearRect(0,0,W,H);
    sctx.shadowBlur=6;
    for(var i=0;i<stars.length;i++){
      var s=stars[i];
      s.tw+=s.tws;
      var a=.65+Math.sin(s.tw)*.35;
      sctx.shadowColor='hsla('+s.hue+',90%,80%,'+(a*.8)+')';
      sctx.beginPath();
      sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      sctx.fillStyle='hsla('+s.hue+',85%,85%,'+a+')';
      sctx.fill();
    }
    sctx.shadowBlur=0;
    requestAnimationFrame(tickStars);
  }
  if(!REDUCED)requestAnimationFrame(tickStars);
  else{
    // Static frame
    sctx.clearRect(0,0,W,H);
    for(var j=0;j<stars.length;j++){
      var ss=stars[j];
      sctx.beginPath();
      sctx.arc(ss.x,ss.y,ss.r,0,Math.PI*2);
      sctx.fillStyle='hsla('+ss.hue+',80%,75%,.6)';
      sctx.fill();
    }
  }

  // ===== RESIZE =====
  var rt;
  window.addEventListener('resize',function(){
    clearTimeout(rt);
    rt=setTimeout(function(){
      sizeStars();
      for(var k=0;k<stars.length;k++){
        stars[k].x=Math.random()*W;
        stars[k].y=Math.random()*H;
      }
    },180);
  },{passive:true});

  // ===== VISIBILITY API (pauza tab inactiv) =====
  document.addEventListener('visibilitychange',function(){
    running=!document.hidden;
    if(running&&!REDUCED)requestAnimationFrame(tickStars);
  });
})();
