/* Portfolio V9.7 — C2F-style centered project artwork (desktop).
   The home index is intentionally unchanged. Project imagery is constrained to
   75vw, centered, and clipped to its own stage; full-width sticky header and
   title bands remain independent. Does not scale text or distort original media.
   Whoami keeps description visible on the first screen. */
(()=>{'use strict';
 const wrap=document.getElementById('project-wrap');
 const board=document.getElementById('project-artboard');
 if(!wrap||!board)return;
 const slug=document.body.dataset.project||'';
 const baseHeight=Number(wrap.dataset.height)||1024;
 const FIGMA_WIDTH=1440, HERO_REFERENCE_START=39, HERO_REFERENCE_HEIGHT=743;
 const TITLE_HEIGHT=37, DESCRIPTION_OFFSET=64, HEADER_HEIGHT=39, HERO_GAP=20;
 const title=board.querySelector('.work-title');
 const description=board.querySelector('.description');
 const gallery=board.querySelector('.irl-gallery');
 const media=[...board.querySelectorAll('.project-photo')].map(node=>({
   node, isHero:node.classList.contains('is-hero'),
   x:Number.parseFloat(node.style.left)||0,
   y:Number.parseFloat(node.style.top)||0,
   w:Number.parseFloat(node.style.width)||FIGMA_WIDTH,
   h:Number.parseFloat(node.style.height)||0
 }));
 const hero=media.find(a=>a.isHero);
 const docs=media.filter(a=>!a.isHero);
 const firstDocY=docs.length?Math.min(...docs.map(a=>a.y)):baseHeight;
 let heroStage=null, docsStage=null;
 if(hero){
   heroStage=document.createElement('div');heroStage.className='project-hero-stage';
   hero.node.before(heroStage);heroStage.append(hero.node);
 }
 if(docs.length){
   docsStage=document.createElement('div');docsStage.className='project-documents-stage';
   docs[0].node.before(docsStage);
   for(const doc of docs)docsStage.append(doc.node);
 }
 let scheduled=false;
 function layout(){
   scheduled=false;
   const width=document.documentElement.clientWidth||window.innerWidth||1440;
   const vh=window.innerHeight||1024;
   const stageWidth=width<=900?Math.max(1,width-24):width*0.75;
   const stageScale=stageWidth/FIGMA_WIDTH;
   wrap.style.setProperty('--media-scale',stageScale);
   if(!hero){
     // IRL Glitch keeps fixed 220 px photographs, as agreed in V9.5.
     let titleY=782;
     if(gallery)titleY=Math.max(titleY,gallery.offsetTop+gallery.offsetHeight+20);
     if(title)title.style.top=titleY+'px';
     if(description){description.style.top=(titleY+DESCRIPTION_OFFSET)+'px';}
     const bottom=Math.max(baseHeight,titleY+DESCRIPTION_OFFSET+(description?.offsetHeight||0)+30);
     board.style.height=bottom+'px';wrap.style.height=bottom+'px';
     return;
   }
   const heroTop=HEADER_HEIGHT+HERO_GAP;
   // Dedicated film page: description should already be visible on load.
   const isTextFirst=slug==='whoami';
   const titleY=isTextFirst
     ?Math.max(heroTop+300,Math.round(vh*0.69))
     :Math.max(heroTop+340,vh-TITLE_HEIGHT-8);
   const heroHeight=titleY-heroTop;
   heroStage.style.left='50%';heroStage.style.top=heroTop+'px';
   heroStage.style.width=stageWidth+'px';heroStage.style.height=heroHeight+'px';
   const verticalScale=heroHeight/HERO_REFERENCE_HEIGHT;
   // Map the exact Figma crop rectangles into the centered stage. Figma uses
   // oversized image boxes at some places; the stage clips their excess.
   hero.node.style.left=(hero.x*stageScale)+'px';
   hero.node.style.top=((hero.y-HERO_REFERENCE_START)*verticalScale)+'px';
   hero.node.style.width=(hero.w*stageScale)+'px';
   hero.node.style.height=Math.max(1,hero.h*verticalScale)+'px';
   if(title)title.style.top=titleY+'px';
   if(description){
     description.style.top=(titleY+DESCRIPTION_OFFSET)+'px';
     description.style.width='min(646px, calc(100% - 16px))';
   }
   let docEnd=0;
   if(docsStage){
     const desiredDocTop=titleY+(firstDocY-782); // Figma title-to-gallery gap
     const descriptionEnd=titleY+DESCRIPTION_OFFSET+(description?.offsetHeight||0);
     const docTop=Math.max(desiredDocTop,descriptionEnd+40);
     let internalBottom=0;
     for(const p of docs){
       const relativeY=(p.y-firstDocY)*stageScale;
       p.node.style.left=(p.x*stageScale)+'px';
       p.node.style.top=relativeY+'px';
       p.node.style.width=(p.w*stageScale)+'px';
       p.node.style.height=(p.h*stageScale)+'px';
       internalBottom=Math.max(internalBottom,relativeY+p.h*stageScale);
     }
     docsStage.style.left='50%';docsStage.style.top=docTop+'px';
     docsStage.style.width=stageWidth+'px';
     docsStage.style.height=Math.ceil(internalBottom)+'px';
     docEnd=docTop+internalBottom;
   }
   const bottom=Math.ceil(Math.max(docEnd,titleY+DESCRIPTION_OFFSET+(description?.offsetHeight||0)+65,titleY+TITLE_HEIGHT+30));
   board.style.height=bottom+'px';wrap.style.height=bottom+'px';
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(layout)}}
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('orientationchange',schedule,{passive:true});
 window.addEventListener('load',schedule,{once:true});
 document.fonts?.ready?.then(schedule).catch(()=>{});
 layout();
 for(const video of document.querySelectorAll('video')){
   video.addEventListener('click',()=>{video.muted=!video.muted;if(video.paused)video.play().catch(()=>{});});
   video.addEventListener('loadedmetadata',()=>{if(video.dataset.startTime){try{video.currentTime=Number(video.dataset.startTime)}catch(e){}}},{once:true});
 }
 for(const element of document.querySelectorAll('.irl-photo')){
   element.addEventListener('pointerenter',()=>element.classList.add('is-selected'));
   element.addEventListener('pointerleave',()=>element.classList.remove('is-selected'));
   element.addEventListener('focus',()=>element.classList.add('is-selected'));
   element.addEventListener('blur',()=>element.classList.remove('is-selected'));
   element.addEventListener('click',()=>element.classList.toggle('is-selected'));
 }
 window.addEventListener('keydown',e=>{
   if(e.key==='Escape'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
     if(document.activeElement?.matches?.('.irl-photo')){document.activeElement.blur();return;}
     location.assign('../index.html');
   }
 });
})();