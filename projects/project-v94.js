/* V9.9 — Figma coordinate system for intro; independent full-bleed documentation. */
(()=>{'use strict';
 const wrap=document.getElementById('project-wrap');
 const board=document.getElementById('project-artboard');
 if(!wrap||!board)return;
 const slug=document.body.dataset.project||'';
 const baseHeight=Number(wrap.dataset.height)||1024;
 const W=1440, HEADER=39, TITLE=782, TITLE_H=37, DESC=846;
 const title=board.querySelector('.work-title'), description=board.querySelector('.description'), gallery=board.querySelector('.irl-gallery');
 const media=[...board.querySelectorAll('.project-photo')].map(node=>({node,isHero:node.classList.contains('is-hero'),x:parseFloat(node.style.left)||0,y:parseFloat(node.style.top)||0,w:parseFloat(node.style.width)||W,h:parseFloat(node.style.height)||0}));
 const dimensions={'shahed-000.jpg':[2852,2022],'shahed-0000.jpg':[2852,2022],'shahed-006.jpg':[3000,2400],'shahed-002.jpg':[3000,2400],'shahed-001.jpg':[2400,3000],'design-1.png':[5760,3616],'design-2.png':[5760,4132],'design-3.png':[5760,4324]};
 function aspect(p){const m=p.node.querySelector('img,video'),d=dimensions[m.getAttribute('src').split('/').pop()];return (m.naturalWidth||m.videoWidth||d?.[0]||p.w)/(m.naturalHeight||m.videoHeight||d?.[1]||p.h);}
 function rect(node,x,y,w,h){Object.assign(node.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px'});}
 const hero=media.find(p=>p.isHero),docs=media.filter(p=>!p.isHero);
 let stage;
 if(hero){stage=document.createElement('div');stage.className='project-hero-stage';hero.node.before(stage);stage.append(hero.node);}
 let scheduled=false;
 function layout(){
  scheduled=false;
  const width=document.documentElement.clientWidth||window.innerWidth||W;
  const vh=window.innerHeight||1024;
  if(!hero){ // Keep the separately designed IRL gallery and fixed thumbnails.
    const y=Math.max(TITLE,(gallery?.offsetTop||0)+(gallery?.offsetHeight||0)+20);
    title.style.top=y+'px';description.style.top=(y+Math.max(64,title.offsetHeight+27))+'px';
    const bottom=Math.max(baseHeight,description.offsetTop+description.offsetHeight+30);
    board.style.height=wrap.style.height=bottom+'px';return;
  }
  // Figma Scale: identical horizontal and vertical coefficient. Only constrain
  // unusually wide/short viewports so the full title can still be seen at entry.
  // The 4px black gutter is deliberately fixed, matching the previous contract.
  const compact=width<700;
  const s=Math.max(0.01,Math.min(width/W,Math.max(1,vh-4)/(TITLE+TITLE_H-4)));
  const stageWidth=W*s, stageLeft=(width-stageWidth)/2;
  const y=v=>4+(v-4)*s;
  const headerHeight=compact?31:y(HEADER), titleY=headerHeight+(TITLE-HEADER)*s;
  wrap.style.setProperty('--figma-scale',s);
  wrap.style.setProperty('--media-scale',s);
  wrap.classList.toggle('is-compact',compact);
  // Clip only to the authored visible hero window, not a 75vw stage.
  rect(stage,stageLeft,headerHeight,stageWidth,titleY-headerHeight);
  rect(hero.node,hero.x*s,(hero.y-HEADER)*s,hero.w*s,hero.h*s);
  title.style.top=titleY+'px';
  const descY=Math.max(titleY+(DESC-TITLE)*s,titleY+title.offsetHeight+(compact?14:27*s));
  description.style.top=descY+'px';
  const descEnd=descY+description.offsetHeight;
  let end=descEnd;
  let prev=null;
  for(const d of docs){
    // All current documentation frames are full-width or overscan in Figma.
    // Use the full original photograph at viewport width, no crop/distortion.
    const gap=prev?Math.max(0,d.y-prev.y-prev.h)*s:0;
    const top=prev?end+gap:Math.max(titleY+(d.y-TITLE)*s,descEnd+40*s);
    const h=width/aspect(d);
    rect(d.node,0,top,width,h);
    end=top+h;prev=d;
  }
  const bottom=Math.ceil(Math.max(vh,end+(docs.length?0:32*s),titleY+title.offsetHeight));
  board.style.height=wrap.style.height=bottom+'px';
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