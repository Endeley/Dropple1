const distanceBetween = (touches) => {
    const [a, b] = touches;
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
};

export const initPinchZoom = (canvas) => {
    if (!canvas || typeof window === 'undefined') return () => {};
    const fabric = window.fabric;
    const element = canvas.upperCanvasEl;
    if (!element || !fabric) return () => {};

    let lastDistance = null;

    const handleTouchMove = (event) => {
        if (event.touches.length !== 2) {
            lastDistance = null;
            return;
        }

        event.preventDefault();
        const dist = distanceBetween(event.touches);
        if (lastDistance) {
            const delta = dist - lastDistance;
            const zoom = Math.min(4, Math.max(0.1, canvas.getZoom() + delta * 0.002));
            const rect = element.getBoundingClientRect();
            const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2 - rect.left;
            const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2 - rect.top;
            const point = new fabric.Point(centerX, centerY);
            canvas.zoomToPoint(point, zoom);
        }
        lastDistance = dist;
    };

    const reset = () => {
        lastDistance = null;
    };

    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', reset);
    element.addEventListener('touchcancel', reset);

    return () => {
        element.removeEventListener('touchmove', handleTouchMove);
        element.removeEventListener('touchend', reset);
        element.removeEventListener('touchcancel', reset);
    };
};
