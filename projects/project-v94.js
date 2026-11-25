/* Portfolio V9.4: only scale the Figma artboard, never stretch photo dimensions. */
(()=>{'use strict';const wrap=document.querySelector('#project-wrap'),board=document.querySelector('#project-artboard');if(!wrap||!board)return;
const height=Number(wrap.dataset.height)||1000;
function fit(){const width=document.documentElement.clientWidth||window.innerWidth;const s=width/1440;
wrap.style.setProperty('--page-scale',s);for(const n of [4,8,24,31,35,39,48,62,508,524])wrap.style.setProperty('--s'+n,`${n*s}px`);wrap.style.setProperty('--sn17',`${-17*s}px`);board.style.transform=`scale(${s})`;
wrap.style.height=`${height*s}px`;wrap.style.minHeight=`${height*s}px`;}
window.addEventListener('resize',fit,{passive:true});window.addEventListener('orientationchange',fit,{passive:true});fit();
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
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){const focused=document.activeElement;if(focused?.matches?.('.irl-photo')){focused.blur();return;}location.assign('../index.html')}});
})();