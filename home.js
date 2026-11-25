/* Portfolio V9 — C2F-inspired name-track scroll + Bauhaus Typography-style cursor preview.
   This is an original approximation, not a copy of C2F's private JS.
   Category/medium/context/year columns remain stationary in a sticky stage.
   Name values shift with native scroll and spring inertia. No scroll hijack.
   Key parameters: SCROLL_DISTANCE (CSS-px), NAME_TRAVEL (Figma-px),
   SPRING_STIFFNESS, SPRING_DAMPING. */
(() => {
'use strict';
const projects=window.SITE_PROJECTS.slice();
const archive=document.querySelector('#archive');
const canvas=document.querySelector('#home-canvas');
const viewport=document.querySelector('#home-viewport');
const stage=document.querySelector('#home-sticky');
const preview=document.querySelector('#cursor-preview');
const previewImg=document.querySelector('#cursor-preview-image');
const fields=['name','category','medium','context','year'];
const labels={name:'INDEX',category:'CATEGORY',medium:'MEDIUM',context:'CONTEXT',year:'YEAR'};
const css=getComputedStyle(canvas);
const ROW=parseFloat(css.getPropertyValue('--row-height'))||28;
const HEADER=parseFloat(css.getPropertyValue('--header-height'))||28;
const BASE_HEIGHT=1024;
const PREVIEW_LERP=0.33; // Change to 1 for instant pointer tracking
const PREVIEW_GAP_X=22;
const PREVIEW_GAP_Y=16;
const SCROLL_DISTANCE=640;       // How much native scrolling is available after first viewport
const NAME_TRAVEL=224;           // Max downward movement of project-name track (in Figma pixels)
const SPRING_STIFFNESS=0.052;    // Higher = responds more quickly
const SPRING_DAMPING=0.76;       // Lower = settles sooner
const REDUCED=matchMedia('(prefers-reduced-motion: reduce)');
let ordered=projects.slice();
let sortKey='year',ascending=false,activeId=null,activeRow=-1;
let track=null,trackPos=0,trackVelocity=0,targetPos=0,raf=0;
let previewId=null,previewActive=false,previewX=0,previewY=0;
let pointerX=0,pointerY=0,targetX=0,targetY=0,previewRAF=0;
function previewPosition(){
 const margin=12;
 const width=preview.offsetWidth||320;
 const height=preview.offsetHeight||195;
 let x=pointerX+PREVIEW_GAP_X;
 let y=pointerY+PREVIEW_GAP_Y;
 if(x+width+margin>innerWidth) x=pointerX-width-PREVIEW_GAP_X;
 if(y+height+margin>innerHeight) y=pointerY-height-PREVIEW_GAP_Y;
 targetX=Math.max(margin,Math.min(innerWidth-width-margin,x));
 targetY=Math.max(margin,Math.min(innerHeight-height-margin,y));
 if(!previewActive) return;
 if(REDUCED.matches){
  previewX=targetX;previewY=targetY;
  preview.style.transform=`translate3d(${previewX}px, ${previewY}px, 0)`;
 }else if(!previewRAF) previewRAF=requestAnimationFrame(animatePreview);
}
function animatePreview(){
 previewRAF=0;
 if(!previewActive)return;
 previewX+=(targetX-previewX)*PREVIEW_LERP;
 previewY+=(targetY-previewY)*PREVIEW_LERP;
 if(Math.abs(targetX-previewX)<0.25)previewX=targetX;
 if(Math.abs(targetY-previewY)<0.25)previewY=targetY;
 preview.style.transform=`translate3d(${previewX.toFixed(2)}px, ${previewY.toFixed(2)}px, 0)`;
 if(previewX!==targetX||previewY!==targetY)previewRAF=requestAnimationFrame(animatePreview);
}
function moveCursorPreview(e){
 if(e.pointerType==='touch')return;
 pointerX=e.clientX;pointerY=e.clientY;
 previewPosition();
}
function showCursorPreview(p){
 if(!p?.preview){hideCursorPreview();return;}
 if(previewId!==p.id){
  previewId=p.id;
  preview.classList.remove('is-visible');
  previewImg.src=p.preview;
  previewImg.alt=''; // Decorative image; text of the project is already visible
 }
 if(!previewActive){
  previewActive=true;
  // Position without tweening on first appearance; avoids flying from corner.
  previewPosition();previewX=targetX;previewY=targetY;
  preview.style.transform=`translate3d(${previewX}px, ${previewY}px, 0)`;
 }
 if(previewImg.complete&&previewImg.naturalWidth>0){preview.classList.add('is-visible');previewPosition();}
}
function hideCursorPreview(){
 previewActive=false;preview.classList.remove('is-visible');
 if(previewRAF){cancelAnimationFrame(previewRAF);previewRAF=0;}
}
previewImg.addEventListener('load',()=>{
 if(previewActive){preview.classList.add('is-visible');previewPosition();}
});
previewImg.addEventListener('error',()=>{preview.classList.remove('is-visible');});

const collator=new Intl.Collator('en',{numeric:true,sensitivity:'base'});
function yearValue(v){const nums=String(v||'').match(/\d{4}/g);return nums?Number(nums[nums.length-1]):0;}
function sortProjects(key,asc){return projects.map((p,i)=>({p,i})).sort((a,b)=>{
 let cmp;
 if(key==='year')cmp=yearValue(a.p.year)-yearValue(b.p.year);
 else cmp=collator.compare(String(a.p[key]??''),String(b.p[key]??''));
 return cmp?(asc?cmp:-cmp):a.i-b.i;
}).map(x=>x.p);}
ordered=sortProjects(sortKey,ascending);
function make(tag,cls,text){const n=document.createElement(tag);n.className=cls;if(text!==undefined)n.textContent=text;return n;}
function groupRuns(field){const runs=[];
 for(let i=0;i<ordered.length;i++){
  const value=String(ordered[i][field]??'');const last=runs[runs.length-1];
  if(last&&last.value===value&&last.end===i-1)last.end=i;
  else runs.push({value,start:i,end:i});
 }return runs;}
function positionCell(node,from,to){node.style.top=(HEADER+from*ROW)+'px';
 node.style.height=((to-from+1)*ROW)+'px';node.dataset.start=from;node.dataset.end=to;}
function render(){
 const columns=fields.map(field=>{
  const col=make('div','column');col.dataset.field=field;
  const title=make('button','cell is-header');title.type='button';title.style.top='0px';title.style.height=HEADER+'px';
  title.append(document.createTextNode(labels[field]));
  // The current Figma design only shows an arrow after YEAR.
  if(field==='year'){
   const arrow=make('span','sort-arrow',sortKey==='year'&&ascending?'↑':'↓');
   arrow.setAttribute('aria-hidden','true');title.append(arrow);
  }
  title.setAttribute('aria-label','Sort by '+field);title.setAttribute('aria-pressed',String(field===sortKey));
  title.addEventListener('click',()=>sortBy(field));col.append(title);
  if(field==='name'){
    const holder=make('div','name-track');
    for(const [i,p] of ordered.entries()){
      const node=make('a','cell row-name',p.name);positionCell(node,i,i);
      node.href=p.href||'#';node.dataset.projectId=p.id;node.dataset.index=String(i);
      node.setAttribute('aria-label',p.name+' — open project');holder.append(node);
    }
    track=holder;col.append(holder);
  }else{
   for(const g of groupRuns(field)){
    const node=make('div','cell merged',g.value);positionCell(node,g.start,g.end);col.append(node);
   }
  }return col;
 });
 archive.replaceChildren(...columns);
 archive.style.minHeight=Math.max(985,HEADER+ROW*ordered.length)+'px';
 canvas.style.minHeight=Math.max(BASE_HEIGHT,39+HEADER+ROW*ordered.length)+'px';
 setTrack(trackPos);resize();paint();
}
function paint(){
 for(const n of archive.querySelectorAll('.selected'))n.classList.remove('selected');
 const pos=ordered.findIndex(x=>x.id===activeId);
 if(pos<0){hideCursorPreview();return;}
 const p=ordered[pos];
 showCursorPreview(p);
 // Preserve V8.3 white filled blocks with green active type.
 for(const field of fields){
  const col=archive.querySelector('.column[data-field="'+field+'"]');
  for(const cell of col.querySelectorAll('.cell:not(.is-header)')){
   if(Number(cell.dataset.start)<=pos&&pos<=Number(cell.dataset.end)){
    cell.classList.add('selected');break;
   }
  }
 }
}
function selectByIndex(i){
 if(i<0||i>=ordered.length){clear();return;}
 const id=ordered[i].id;if(activeId===id&&activeRow===i)return;
 activeRow=i;activeId=id;paint();
}
function clear(){if(activeId===null){hideCursorPreview();return;}activeId=null;activeRow=-1;paint();}
function sortBy(key){
 clear();if(key==='name'){sortKey='name';ascending=true;ordered=projects.slice();}
 else{ascending=key===sortKey?!ascending:(key==='year'?false:true);sortKey=key;
 ordered=sortProjects(key,ascending);}
 render();
}
function indexFromPointer(e){
 // Name cells are animated. Use their physical DOM box, not the unshifted row index.
 const anchor=e.target.closest('.row-name');
 if(anchor)return Number(anchor.dataset.index);
 const rect=archive.getBoundingClientRect();
 const y=e.clientY-rect.top;
 if(y<HEADER)return -1;
 return Math.floor((y-HEADER)/ROW);
}
archive.addEventListener('pointermove',e=>{
 if(e.pointerType==='touch'){clear();return;}
 moveCursorPreview(e);
 if(e.target.closest('.is-header')){clear();return;}
 selectByIndex(indexFromPointer(e));
});
archive.addEventListener('pointerleave',clear);
archive.addEventListener('click',e=>{
 const anchor=e.target.closest('.row-name');if(anchor)return;
 if(e.target.closest('.is-header'))return;
 const p=ordered[indexFromPointer(e)];if(p?.href)location.assign(p.href);
});
archive.addEventListener('keydown',e=>{
 if(e.target.closest('.is-header'))return;
 if(e.key==='ArrowDown'||e.key==='ArrowUp'){
  e.preventDefault();selectByIndex(Math.max(0,Math.min(ordered.length-1,activeRow+(e.key==='ArrowDown'?1:-1))));
 }else if(e.key==='Enter'&&activeRow>=0){const p=ordered[activeRow];if(p?.href)location.assign(p.href);}
 else if(e.key==='Escape'){clear();if(document.activeElement===archive)archive.blur();}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){clear();if(document.activeElement===archive)archive.blur();}});
window.addEventListener('blur',clear);
document.addEventListener('visibilitychange',()=>{if(document.hidden)clear();});
function setTrack(v){if(track)track.style.transform='translate3d(0,'+v.toFixed(3)+'px,0)';}
function animate(){
 raf=0;
 const accel=(targetPos-trackPos)*SPRING_STIFFNESS;
 trackVelocity=(trackVelocity+accel)*SPRING_DAMPING;
 trackPos+=trackVelocity;
 if(Math.abs(targetPos-trackPos)<.02&&Math.abs(trackVelocity)<.02){trackPos=targetPos;trackVelocity=0;setTrack(trackPos);return;}
 setTrack(trackPos);raf=requestAnimationFrame(animate);
}
function updateScroll(){
 // Current stage starts at document top. Clamp its total progress to its scroll travel.
 const top=viewport.getBoundingClientRect().top+window.scrollY;
 const progress=Math.min(1,Math.max(0,(window.scrollY-top)/SCROLL_DISTANCE));
 targetPos=NAME_TRAVEL*progress;
 if(REDUCED.matches){trackPos=targetPos;trackVelocity=0;setTrack(trackPos);return;}
 if(!raf)raf=requestAnimationFrame(animate);
}
function resize(){
 const contentHeight=Math.max(BASE_HEIGHT,39+HEADER+ROW*ordered.length,window.innerHeight);
 canvas.style.minHeight=contentHeight+'px';
 stage.style.height=contentHeight+'px';
 viewport.style.height=(contentHeight+SCROLL_DISTANCE)+'px';
 updateScroll();
}
addEventListener('scroll',()=>{clear();updateScroll();},{passive:true});
addEventListener('resize',()=>{resize();if(previewActive)previewPosition();},{passive:true});
REDUCED.addEventListener?.('change',updateScroll);
// Preload lightweight artwork thumbnails to eliminate first-hover flicker.
const warmPreview=()=>{
 for(const p of projects){if(!p.preview)continue;const image=new Image();image.decoding='async';image.src=p.preview;}
};
if('requestIdleCallback' in window)requestIdleCallback(warmPreview,{timeout:2500});
else addEventListener('load',warmPreview,{once:true});
render();
})();
