export const autoSpacingFix = (canvas, direction = 'vertical') => {
    const objects = canvas?.getActiveObjects?.() || [];
    if (objects.length < 2) {
        return { status: 'idle', message: 'Select at least two objects to normalize spacing.' };
    }

    const gap = 32;
    const sorted = direction === 'horizontal'
        ? [...objects].sort((a, b) => a.left - b.left)
        : [...objects].sort((a, b) => a.top - b.top);

    if (direction === 'horizontal') {
        let currentLeft = sorted[0].left;
        sorted.forEach((obj) => {
            obj.set('left', currentLeft);
            currentLeft += obj.getScaledWidth() + gap;
            obj.setCoords();
        });
    } else {
        let currentTop = sorted[0].top;
        sorted.forEach((obj) => {
            obj.set('top', currentTop);
            currentTop += obj.getScaledHeight() + gap;
            obj.setCoords();
        });
    }

    canvas.requestRenderAll();
    return { status: 'ok', message: 'Spacing normalized.' };
};
