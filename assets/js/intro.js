(() => {
  'use strict';

  const root = document.documentElement;
  if (root.dataset.intro !== 'playing') return;

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const logo = document.querySelector('.intro img');
  let finished = false;
  let timer;

  const finish = (immediate = false) => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    document.removeEventListener('pointerdown', skip, true);
    document.removeEventListener('keydown', skip, true);
    motion.removeEventListener('change', onMotionChange);
    if (immediate) {
      delete root.dataset.intro;
    } else {
      root.dataset.intro = 'revealing';
      setTimeout(() => { delete root.dataset.intro; }, 650);
    }
  };

  function skip(event) {
    // A skip gesture must not also activate a link underneath the overlay.
    if (event.type !== 'keydown' || event.key !== 'Tab') event.preventDefault();
    finish(true);
  }

  function onMotionChange(event) {
    if (event.matches) finish(true);
  }

  try { sessionStorage.setItem('olympus-intro-seen', '1'); } catch (_) {}
  document.addEventListener('pointerdown', skip, true);
  document.addEventListener('keydown', skip, true);
  motion.addEventListener('change', onMotionChange);
  logo.addEventListener('error', () => finish(true), { once: true });
  timer = setTimeout(() => finish(), 1050);
  if (motion.matches || (logo.complete && !logo.naturalWidth)) finish(true);
})();
