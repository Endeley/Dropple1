export const throttleRender = (canvas, fps = 30) => {
    if (!canvas) return () => {};

    let last = 0;
    const handle = () => {
        const now = performance.now();
        if (now - last < 1000 / fps) {
            return;
        }
        last = now;
    };

    canvas.on('after:render', handle);
    return () => canvas.off('after:render', handle);
};
