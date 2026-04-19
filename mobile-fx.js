/* mobile-fx.js — Brand identity effects pentru mobile index.html
   Restaureaza Pamant + dragon + galaxia pe mobile (L-IVORY-01 sacred rule).
   Canvas 2D pur, zero Three.js, zero dependinte externe.
   Consuma window.__EARTH_TEX (base64 PNG) + window.__LOGO_SVG_B64 (base64 SVG).
   Self-executing IIFE. Gated din index.html mobile branch (U20).
*/
(function(){
  'use strict';
  if(window.__MOBILE_FX_LOADED)return;window.__MOBILE_FX_LOADED=true;

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
  style.textContent='@keyframes mfxAura{0%{opacity:.55;transform:translate(-50%,-50%) scale(1)}100%{opacity:.85;transform:translate(-50%,-50%) scale(1.15)}}@keyframes mfxEarthSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes mfxDragonFloat{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-12px) rotate(-4deg)}}';
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
  var COUNT=50;
  var stars=[];
  for(var i=0;i<COUNT;i++){
    stars.push({
      x:Math.random()*W,
      y:Math.random()*H,
      r:Math.random()*1.4+.3,
      tw:Math.random()*Math.PI*2,
      tws:.02+Math.random()*.03,
      hue:Math.random()<.3?260:(Math.random()<.5?320:200)
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

  // ===== DRAGON/LOGO (floating, top-right of hero) =====
  var logoB64=window.__LOGO_SVG_B64;
  if(logoB64){
    var logoImg=document.createElement('img');
    logoImg.src=logoB64;
    logoImg.alt='';
    logoImg.setAttribute('aria-hidden','true');
    logoImg.style.cssText=[
      'position:absolute',
      'right:8%','top:18%',
      'width:'+Math.min(W*.22,100)+'px',
      'height:auto',
      'opacity:.85',
      'filter:drop-shadow(0 0 20px rgba(123,44,255,.6))',
      'animation: mfxDragonFloat 6s ease-in-out infinite',
      'pointer-events:none'
    ].join(';');
    root.appendChild(logoImg);
  }

  // ===== STARFIELD ANIMATION =====
  var running=true;
  function tickStars(){
    if(!running)return;
    sctx.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){
      var s=stars[i];
      s.tw+=s.tws;
      var a=.4+Math.sin(s.tw)*.4;
      sctx.beginPath();
      sctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      sctx.fillStyle='hsla('+s.hue+',80%,75%,'+a+')';
      sctx.fill();
    }
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
