(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const canvas=document.getElementById('finesse-particles');
  if(canvas){
    const ctx=canvas.getContext('2d'), parent=canvas.parentElement; let raf, pts=[];
    const resize=()=>{canvas.width=parent.clientWidth*devicePixelRatio;canvas.height=parent.clientHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);const n=Math.min(90,Math.floor(parent.clientWidth/16));pts=Array.from({length:n},()=>({x:Math.random()*parent.clientWidth,y:Math.random()*parent.clientHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.8+.4}));};
    const draw=()=>{const w=parent.clientWidth,h=parent.clientHeight;ctx.clearRect(0,0,w,h);for(const p of pts){p.x=(p.x+p.vx+w)%w;p.y=(p.y+p.vy+h)%h;ctx.beginPath();ctx.fillStyle='rgba(179,252,230,.62)';ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();} if(!reduce) raf=requestAnimationFrame(draw);};
    resize();draw();addEventListener('resize',resize);if(reduce) canvas.style.opacity='.32';
  }
  const rays=document.querySelector('.side-rays-canvas');
  if(rays){
    const c=rays.getContext('2d'); let w=0,h=0,t=0,raf;
    const resize=()=>{w=rays.width=innerWidth*devicePixelRatio;h=rays.height=innerHeight*devicePixelRatio;c.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)};
    const draw=()=>{t+=.006; c.clearRect(0,0,innerWidth,innerHeight); const ox=innerWidth*1.04,oy=-innerHeight*.08; for(let i=0;i<8;i++){const a=-2.85+i*.12+Math.sin(t+i)*.018, len=innerWidth*1.2, spread=innerHeight*.52; const g=c.createLinearGradient(ox,oy,ox+Math.cos(a)*len,oy+Math.sin(a)*len); g.addColorStop(0,'rgba(179,252,230,.22)');g.addColorStop(.45,'rgba(243,174,228,.08)');g.addColorStop(1,'rgba(179,252,230,0)'); c.beginPath();c.moveTo(ox,oy);c.lineTo(ox+Math.cos(a-.035)*len,oy+Math.sin(a-.035)*len);c.lineTo(ox+Math.cos(a+.035)*len,oy+Math.sin(a+.035)*len);c.closePath();c.fillStyle=g;c.fill();} if(!reduce)raf=requestAnimationFrame(draw)};
    resize();draw();addEventListener('resize',resize);if(reduce)rays.style.opacity='.28';
  }
  if(!reduce&&fine){
    document.querySelectorAll('.work-item,.border-glow-card,.avatar-container').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        el.style.transform=`perspective(900px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*7).toFixed(2)}deg) translateY(-6px)`;
      });
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }
  document.querySelectorAll('.filter-button').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('.works-container')?.animate([{opacity:.45,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.2,.8,.2,1)'})));
})();
