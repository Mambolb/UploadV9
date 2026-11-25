/* Portfolio V9.5: native-size text + responsive project media (no artboard scaling). */
(()=>{'use strict';
 const wrap=document.querySelector('#project-wrap');
 const board=document.querySelector('#project-artboard');
 if(!wrap||!board)return;
 const baseHeight=Number(wrap.dataset.height)||1000;
 const photos=[...board.querySelectorAll('.project-photo')].map(el=>({
  el,left:parseFloat(el.style.left)||0,width:parseFloat(el.style.width)||1440
 }));
 const gallery=board.querySelector('.irl-gallery');
 const title=board.querySelector('.work-title');
 const description=board.querySelector('.description');
 function fit(){
  const width=document.documentElement.clientWidth||window.innerWidth;
  const horizontalRatio=width/1440;
  wrap.style.setProperty('--media-scale',String(horizontalRatio));
  for(const p of photos){
   p.el.style.left=(p.left*horizontalRatio)+'px';
   p.el.style.width=(p.width*horizontalRatio)+'px';
  }
  // At 1440px and above: exact 782px title baseline from Figma. On narrower
  // widths, make room for photo rows before the title.
  let y=782;
  if(gallery&&width<1204){
   y=Math.max(y,gallery.offsetTop+gallery.offsetHeight+20);
  }
  if(title)title.style.top=y+'px';
  if(description)description.style.top=(y+64)+'px';
  const bottom=Math.max(baseHeight,description?y+64+description.offsetHeight+30:0);
  board.style.height=bottom+'px';wrap.style.height=bottom+'px';
 }
 window.addEventListener('resize',fit,{passive:true});
 window.addEventListener('orientationchange',fit,{passive:true});
 window.addEventListener('load',fit,{once:true});
 document.fonts?.ready?.then(fit);
 fit();
 for(const v of document.querySelectorAll('video')){
  v.addEventListener('click',()=>{v.muted=!v.muted;if(v.paused)v.play().catch(()=>{});});
  v.addEventListener('loadedmetadata',()=>{if(v.dataset.startTime){try{v.currentTime=Number(v.dataset.startTime)}catch(e){}}},{once:true});
 }
 for(const c of document.querySelectorAll('.irl-photo')){
  c.addEventListener('pointerenter',()=>{c.classList.add('is-selected')});
  c.addEventListener('pointerleave',()=>{c.classList.remove('is-selected')});
  c.addEventListener('focus',()=>{c.classList.add('is-selected')});
  c.addEventListener('blur',()=>{c.classList.remove('is-selected')});
  c.addEventListener('click',()=>{c.classList.toggle('is-selected')});
 }
 window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
   const focused=document.activeElement;
   if(focused?.matches?.('.irl-photo')){focused.blur();return;}
   location.assign('../index.html');
  }
 });
})();
