/* Portfolio 9.6 — responsive project pages, Home/IRL retained.
   The 1440×1024 Figma geometry is exact at the reference viewport;
   other screen heights affect the HERO, never the text font sizes.
   Both dimensions of documentation images scale uniformly by width.
   No global transform scale() is applied to project text or UI. */
(()=>{'use strict';
 const wrap=document.querySelector('#project-wrap');
 const board=document.querySelector('#project-artboard');
 if(!wrap||!board)return;
 const slug=document.body.dataset.project;
 const baseHeight=Number(wrap.dataset.height)||1000;
 const WIDTH=1440, REF_TITLE_TOP=782, REF_HEADER=39, REF_DESCRIPTION_TOP=846;
 const hero=board.querySelector('.project-photo.is-hero');
 const title=board.querySelector('.work-title');
 const description=board.querySelector('.description');
 const gallery=board.querySelector('.irl-gallery');
 const photos=[...board.querySelectorAll('.project-photo')].map(node=>({
   node, hero:node.classList.contains('is-hero'),
   x:parseFloat(node.style.left)||0, y:parseFloat(node.style.top)||0,
   w:parseFloat(node.style.width)||WIDTH,
   h:parseFloat(node.style.height)||0
 }));
 const docs=photos.filter(p=>!p.hero);
 const galleryY=docs.length?Math.min(...docs.map(p=>p.y)):baseHeight;
 const titleOffsetToGallery=galleryY-REF_TITLE_TOP;
 const bodyOffsetToTitle=REF_DESCRIPTION_TOP-REF_TITLE_TOP;
 // Static Figma 1440×1024: first title begins at y=782; at any other
 // viewport, the first artwork fills the same fraction of visible height.
 // This avoids the tiny 743px covers in browsers with large CSS viewports.
 const titleFraction=REF_TITLE_TOP/1024;
 let frameScheduled=false;
 function layout(){
  frameScheduled=false;
  const width=document.documentElement.clientWidth||window.innerWidth||WIDTH;
  const viewportHeight=window.innerHeight||1024;
  const mediaScale=width/WIDTH;
  wrap.style.setProperty('--media-scale',String(mediaScale));
  if(!hero){
    // IRL photo gallery: previous V9.5 layout intentionally uses fixed 220px
    // images and 20px gaps, so do not scale or reposition the gallery.
    let y=REF_TITLE_TOP;
    if(gallery&&width<1204){y=Math.max(y,gallery.offsetTop+gallery.offsetHeight+20)}
    if(title)title.style.top=y+'px';
    if(description)description.style.top=(y+bodyOffsetToTitle)+'px';
    const bottom=Math.max(baseHeight,description?y+bodyOffsetToTitle+description.offsetHeight+30:0);
    board.style.height=bottom+'px';wrap.style.height=bottom+'px';
    return;
  }
  const titleY=Math.round(viewportHeight*titleFraction);
  // Native text and header dimensions; no canvas-level zoom.
  title.style.top=titleY+'px';
  title.style.width='100%';
  description.style.top=(titleY+bodyOffsetToTitle)+'px';
  description.style.width='min(646px, calc(100% - 16px))';
  const cover=photos.find(p=>p.hero);
  // This frame is cropped at the title bar, as in the Figma artboard.
  // Internal media uses object-fit:cover; therefore pixels remain unstretched.
  cover.node.style.left=(cover.x*mediaScale)+'px';
  cover.node.style.top=cover.y+'px';
  cover.node.style.width=(cover.w*mediaScale)+'px';
  cover.node.style.height=Math.max(1,titleY-cover.y)+'px';
  // Documents retain their original relative order, sizes and spacing.
  // Scale both X and Y by the SAME factor (V9.5 scaled X only).
  const introBottom=Math.max(
    titleY+titleOffsetToGallery,
    titleY+bodyOffsetToTitle+description.offsetHeight+44
  );
  const docStart=Math.round(introBottom);
  let docBottom=0;
  for(const p of docs){
    const top=docStart+(p.y-galleryY)*mediaScale;
    const w=p.w*mediaScale;
    const h=p.h*mediaScale;
    p.node.style.left=(p.x*mediaScale)+'px';
    p.node.style.top=top+'px';
    p.node.style.width=w+'px';
    p.node.style.height=h+'px';
    docBottom=Math.max(docBottom,top+h);
  }
  const minBottom=titleY+Math.max(REF_HEADER,baseHeight-REF_TITLE_TOP);
  const textBottom=titleY+bodyOffsetToTitle+description.offsetHeight+32;
  const bottom=Math.ceil(Math.max(docBottom,minBottom,textBottom));
  board.style.height=bottom+'px';
  wrap.style.height=bottom+'px';
 }
 function schedule(){if(!frameScheduled){frameScheduled=true;requestAnimationFrame(layout)}}
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('orientationchange',schedule,{passive:true});
 window.addEventListener('load',schedule,{once:true});
 document.fonts?.ready?.then(schedule).catch(()=>{});
 layout();
 for(const v of document.querySelectorAll('video')){
  v.addEventListener('click',()=>{v.muted=!v.muted;if(v.paused)v.play().catch(()=>{});});
  v.addEventListener('loadedmetadata',()=>{
   if(v.dataset.startTime){try{v.currentTime=Number(v.dataset.startTime)}catch(e){}}
  },{once:true});
 }
 for(const c of document.querySelectorAll('.irl-photo')){
  c.addEventListener('pointerenter',()=>c.classList.add('is-selected'));
  c.addEventListener('pointerleave',()=>c.classList.remove('is-selected'));
  c.addEventListener('focus',()=>c.classList.add('is-selected'));
  c.addEventListener('blur',()=>c.classList.remove('is-selected'));
  c.addEventListener('click',()=>c.classList.toggle('is-selected'));
 }
 window.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
   const focused=document.activeElement;
   if(focused?.matches?.('.irl-photo')){focused.blur();return;}
   location.assign('../index.html');
  }
 });
})();
