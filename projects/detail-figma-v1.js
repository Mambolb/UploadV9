/* Shared project page scaling and Escape navigation. */
(() => {
  'use strict';
  const baseWidth = 1440;
  const wrap = document.querySelector('#project-wrap');
  const board = document.querySelector('#project-artboard');
  if (!wrap || !board) return;
  const originalHeight = Number(wrap.dataset.height || 1000);
  function resize() {
    const usableWidth = document.documentElement.clientWidth || window.innerWidth;
    const scale = usableWidth / baseWidth;
    wrap.style.setProperty('--page-scale', scale);
    board.style.transform = `scale(${scale})`;
    wrap.style.height = `${originalHeight * scale}px`;
    wrap.style.minHeight = `${originalHeight * scale}px`;
  }
  window.addEventListener('resize', resize, {passive:true});
  window.addEventListener('orientationchange', resize, {passive:true});
  resize();
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !event.altKey && !event.ctrlKey && !event.metaKey) {
      window.location.href = '../index.html';
    }
  });
})();
