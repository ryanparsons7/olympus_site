(() => {
  'use strict';

  const trigger = document.querySelector('.wardogs-surprise');
  const flyby = document.querySelector('.lemon-flyby');
  if (!trigger || !flyby) return;

  const image = flyby.querySelector('img');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cleanupTimer;

  function dismiss() {
    clearTimeout(cleanupTimer);
    flyby.hidden = true;
    document.removeEventListener('keydown', onKeydown);
  }

  function onKeydown(event) {
    if (event.key === 'Escape') dismiss();
  }

  trigger.addEventListener('click', () => {
    // Ignore repeat clicks and unavailable artwork; never stack flybys.
    if (!flyby.hidden || !image.complete || !image.naturalWidth) return;
    flyby.hidden = false;
    document.addEventListener('keydown', onKeydown);
    cleanupTimer = setTimeout(dismiss, motion.matches ? 1800 : 2800);
  });

  flyby.addEventListener('animationend', (event) => {
    if (event.animationName === 'lemon-flight') dismiss();
  });
  motion.addEventListener('change', dismiss);
  window.addEventListener('pagehide', dismiss);
})();
