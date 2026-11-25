/* Portfolio V9.8 — proportional centered artwork; explicit Shahed crop only. */
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
 // Intrinsic source dimensions, verified from the supplied files (also before loading).
 const dimensions={
 'time-hero.png':[1920,1080],'whoami-film.png':[5760,3252],
 'shahed-005.jpg':[2400,3000],'shahed-000.jpg':[2852,2022],'shahed-0000.jpg':[2852,2022],
 'shahed-006.jpg':[3000,2400],'shahed-002.jpg':[3000,2400],'shahed-001.jpg':[2400,3000],
 'design-hero.mp4':[1920,1440],'design-1.png':[5760,3616],'design-2.png':[5760,4132],'design-3.png':[5760,4324],
 'enzyklopaedie-film.mp4':[1920,1080],'turbulent-film.mp4':[1920,1080],'garden-hero.mp4':[1920,1080]};
 function aspect(p){
   const m=p.node.querySelector('img,video'), d=dimensions[m.getAttribute('src').split('/').pop()];
   return (m.naturalWidth||m.videoWidth||d?.[0]||p.w)/(m.naturalHeight||m.videoHeight||d?.[1]||p.h);
 }
 function rect(node,x,y,w,h){Object.assign(node.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});}
 const hero=media.find(a=>a.isHero);
 const docs=media.filter(a=>!a.isHero);
 const firstDocY=docs.length?Math.min(...docs.map(a=>a.y)):baseHeight;
 let heroStage=null, docsStage=null;
 if(hero){
   heroStage=document.createElement('div');heroStage.className='project-hero-stage';
   hero.node.before(heroStage);heroStage.append(hero.node);
   if(slug==='shahed')heroStage.classList.add('has-authored-crop');
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
   const stageWidth=Math.max(1,Math.min(width-24,Math.max(width*.75,675)));
   const stageScale=stageWidth/FIGMA_WIDTH;
   const descriptionOffset=Math.max(DESCRIPTION_OFFSET,(title?.offsetHeight||37)+27);
   if(!hero){
     // IRL Glitch keeps fixed 220 px photographs, as agreed in V9.5.
     let titleY=782;
     if(gallery)titleY=Math.max(titleY,gallery.offsetTop+gallery.offsetHeight+20);
     if(title)title.style.top=titleY+'px';
     if(description){description.style.top=(titleY+descriptionOffset)+'px';}
     const bottom=Math.max(baseHeight,titleY+descriptionOffset+(description?.offsetHeight||0)+30);
     board.style.height=bottom+'px';wrap.style.height=bottom+'px';
     return;
   }
   const crop=slug==='shahed';
   const ratio=crop?FIGMA_WIDTH/HERO_REFERENCE_HEIGHT:aspect(hero);
   const preferredWidth=Math.min(stageWidth,hero.w*stageScale);
   const preferredHeight=preferredWidth/ratio;
   // The Figma reference title starts at 782 on a 1024px-high viewport.
   // Available space may change, but the image ratio never changes.
   let titleY=Math.max(HEADER_HEIGHT+2*HERO_GAP+100,
     Math.round(HEADER_HEIGHT+(vh-HEADER_HEIGHT)*743/(1024-HEADER_HEIGHT)));
   if(slug==='whoami')titleY=Math.min(titleY,Math.max(HEADER_HEIGHT+2*HERO_GAP+100,
     vh-descriptionOffset-Math.min(description?.offsetHeight||0,180)-12));
   if(width<=700)titleY=Math.min(titleY,Math.ceil(HEADER_HEIGHT+2*HERO_GAP+preferredHeight));
   const availableHeight=Math.max(1,titleY-HEADER_HEIGHT-2*HERO_GAP);
   const heroWidth=Math.min(preferredWidth,availableHeight*ratio);
   const heroHeight=heroWidth/ratio;
   const heroTop=HEADER_HEIGHT+(titleY-HEADER_HEIGHT-heroHeight)/2;
   rect(heroStage,(width-heroWidth)/2,heroTop,heroWidth,heroHeight);
   if(crop){
     // Explicit, calibrated crop from the supplied Shahed layout; uniform X/Y.
     const cropScale=heroWidth/FIGMA_WIDTH;
     wrap.style.setProperty('--media-scale',cropScale);
     rect(hero.node,0,0,hero.w*cropScale,hero.h*cropScale);
   }else rect(hero.node,0,0,heroWidth,heroHeight);
   if(title)title.style.top=titleY+'px';
   if(description)description.style.top=(titleY+descriptionOffset)+'px';
   let docEnd=0;
   if(docsStage){
     const desiredDocTop=titleY+(firstDocY-782); // Figma title-to-gallery gap
     const descriptionEnd=titleY+descriptionOffset+(description?.offsetHeight||0);
     const docTop=Math.max(desiredDocTop,descriptionEnd+40);
     let internalBottom=0,previous=null;
     for(const p of docs){
       // Retain sequence and nonnegative reference gaps, fit oversized frames.
       const gap=previous?Math.max(0,p.y-previous.y-previous.h)*stageScale:0;
       const w=Math.min(stageWidth,p.w*stageScale),h=w/aspect(p);
       const y=internalBottom+gap;
       rect(p.node,(stageWidth-w)/2,y,w,h);
       internalBottom=y+h;previous=p;
     }
     rect(docsStage,(width-stageWidth)/2,docTop,stageWidth,Math.ceil(internalBottom));
     docEnd=docTop+internalBottom;
   }
   const bottom=Math.ceil(Math.max(docEnd,titleY+descriptionOffset+(description?.offsetHeight||0)+65,titleY+(title?.offsetHeight||37)+30));
   board.style.height=bottom+'px';wrap.style.height=bottom+'px';
 }
 function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(layout)}}
 window.addEventListener('resize',schedule,{passive:true});
 window.addEventListener('orientationchange',schedule,{passive:true});
 for(const item of board.querySelectorAll('.project-photo img, .project-photo video'))item.addEventListener(item.tagName==='VIDEO'?'loadedmetadata':'load',schedule,{once:true});
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