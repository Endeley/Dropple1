/**
 * Simple requestAnimationFrame loop to drive word animations.
 * manager: WordAnimationManager
 * renderCallback: function to redraw the scene after props update
 */
export function playAnimation(manager, renderCallback) {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const t = Math.min(elapsed, manager.duration);

    manager.update(t);
    renderCallback();

    if (t < manager.duration) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
