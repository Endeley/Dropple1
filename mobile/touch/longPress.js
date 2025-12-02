export const initLongPress = (canvas, callback, delay = 600) => {
    if (!canvas || typeof window === 'undefined') return () => {};
    const element = canvas.upperCanvasEl;
    if (!element) return () => {};

    let timer = null;

    const start = (event) => {
        if (event.touches && event.touches.length > 1) return;
        timer = window.setTimeout(() => {
            callback?.(event);
        }, delay);
    };

    const cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };

    element.addEventListener('touchstart', start);
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchcancel', cancel);
    element.addEventListener('touchmove', cancel);

    return () => {
        element.removeEventListener('touchstart', start);
        element.removeEventListener('touchend', cancel);
        element.removeEventListener('touchcancel', cancel);
        element.removeEventListener('touchmove', cancel);
    };
};
