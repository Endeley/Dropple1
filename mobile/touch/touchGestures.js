export const initTouchGestures = (canvas) => {
    if (!canvas || typeof window === 'undefined' || !window.fabric) return () => {};
    const element = canvas.upperCanvasEl;
    if (!element) return () => {};

    let lastTouch = null;

    const handleTouchStart = (event) => {
        if (event.touches.length === 1) {
            lastTouch = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
    };

    const handleTouchMove = (event) => {
        if (event.touches.length !== 1 || !lastTouch) return;
        event.preventDefault();
        const current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        const delta = new window.fabric.Point(current.x - lastTouch.x, current.y - lastTouch.y);
        canvas.relativePan(delta);
        lastTouch = current;
    };

    const reset = () => {
        lastTouch = null;
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', reset);
    element.addEventListener('touchcancel', reset);

    return () => {
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', reset);
        element.removeEventListener('touchcancel', reset);
    };
};
