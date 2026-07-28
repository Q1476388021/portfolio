(()=>{
  const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const now=new Date(),year=now.getFullYear(),start=new Date(year,0,1),end=new Date(year+1,0,1);
  const progress=((now-start)/(end-start)*100).toFixed(1);
  const yearNode=document.querySelector('#dynamic-year');
  const animateYear=()=>{if(RM){yearNode.textContent=year;return}const from=1000,duration=1500,startTime=performance.now();const tick=t=>{const p=Math.min(1,(t-startTime)/duration),ease=1-Math.pow(1-p,3);yearNode.textContent=Math.floor(from+(year-from)*ease);if(p<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)};
  animateYear();
  document.querySelector('#footer-year').textContent=year;

  const canvas=document.querySelector('#home-field'),ctx=canvas.getContext('2d');let w,h,points=[];
  const resize=()=>{w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);points=Array.from({length:Math.min(70,Math.floor(innerWidth/20))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22}))};
  const draw=()=>{ctx.clearRect(0,0,innerWidth,innerHeight);points.forEach((p,i)=>{p.x=(p.x+p.vx+innerWidth)%innerWidth;p.y=(p.y+p.vy+innerHeight)%innerHeight;ctx.fillStyle='rgba(179,252,230,.5)';ctx.fillRect(p.x,p.y,1.1,1.1);for(let j=i+1;j<points.length;j++){const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<120){ctx.strokeStyle=`rgba(179,252,230,${(1-d/120)*.055})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}});if(!RM)requestAnimationFrame(draw)};
  resize();draw();addEventListener('resize',resize);
  if(!RM&&FINE){
    const portrait=document.querySelector('.portrait-stage');
    const aura=document.createElement('div');aura.className='cursor-aura';document.body.appendChild(aura);
    addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;portrait.style.transform=`translate3d(${x*26}px,${y*16}px,0) rotateY(${x*3}deg)`;aura.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`});
    document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-6px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
    document.querySelectorAll('.magnetic').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
  }

  document.querySelectorAll('.ripple-effect').forEach(el=>{
    el.addEventListener('click',e=>{
      const ripple=document.createElement('span');ripple.className='ripple';
      const rect=el.getBoundingClientRect(),size=Math.max(rect.width,rect.height);
      const x=e.clientX-rect.left-size/2,y=e.clientY-rect.top-size/2;
      ripple.style.width=ripple.style.height=size+'px';ripple.style.left=x+'px';ripple.style.top=y+'px';
      el.appendChild(ripple);
      setTimeout(()=>ripple.remove(),600);
    });
  });

  document.querySelectorAll('.border-glow-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const rect=card.getBoundingClientRect();
      const x=e.clientX-rect.left,y=e.clientY-rect.top,w=rect.width,h=rect.height;
      const glowLeft=Math.max(0,Math.min(1,(1-x/w)*1.5));
      const glowRight=Math.max(0,Math.min(1,(x/w)*1.5));
      const glowTop=Math.max(0,Math.min(1,(1-y/h)*1.5));
      const glowBottom=Math.max(0,Math.min(1,(y/h)*1.5));
      card.style.setProperty('--glow-left',glowLeft.toFixed(2));
      card.style.setProperty('--glow-right',glowRight.toFixed(2));
      card.style.setProperty('--glow-top',glowTop.toFixed(2));
      card.style.setProperty('--glow-bottom',glowBottom.toFixed(2));
    });
    card.addEventListener('mouseleave',()=>{
      card.style.setProperty('--glow-left','0');
      card.style.setProperty('--glow-right','0');
      card.style.setProperty('--glow-top','0');
      card.style.setProperty('--glow-bottom','0');
    });
  });
})();
