/* This one-page replacement preserves every coordinate in the Figma 1440px design.
   A single scale factor controls the entire page, preventing image and text drift. */
(() => {
  'use strict';
  const WIDTH = 1440;
  const HEIGHT = 7184;
  const wrap = document.getElementById('project-wrap');
  const board = document.getElementById('project-artboard');
  if (!wrap || !board) return;
  function fit() {
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
    const scale = viewportWidth / WIDTH;
    board.style.transform = `scale(${scale})`;
    wrap.style.height = `${HEIGHT * scale}px`;
    wrap.style.minHeight = `${HEIGHT * scale}px`;
  }
  window.addEventListener('resize', fit, {passive: true});
  window.addEventListener('orientationchange', fit, {passive: true});
  fit();
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !event.altKey && !event.ctrlKey && !event.metaKey) {
      window.location.href = '../index.html';
    }
  });
})();
