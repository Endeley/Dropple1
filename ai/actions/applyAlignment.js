const getSelectionBounds = (objs) => {
    const rects = objs.map((obj) => obj.getBoundingRect(true));
    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    const right = Math.max(...rects.map((r) => r.left + r.width));
    const bottom = Math.max(...rects.map((r) => r.top + r.height));

    return {
        left,
        top,
        width: right - left,
        height: bottom - top,
    };
};

export const applyAlignment = (canvas, options = {}) => {
    const objects = canvas?.getActiveObjects?.() || [];
    if (!objects.length) {
        return { status: 'idle', message: 'Select at least one object to align.' };
    }

    const scopeIsSelection = options.scope === 'selection' && objects.length > 1;
    const bounds = scopeIsSelection
        ? getSelectionBounds(objects)
        : { left: 0, top: 0, width: canvas.getWidth(), height: canvas.getHeight() };

    const mode = options.mode || 'center';

    objects.forEach((obj) => {
        switch (mode) {
            case 'left':
                obj.set('left', bounds.left);
                break;
            case 'right':
                obj.set('left', bounds.left + bounds.width - obj.getScaledWidth());
                break;
            case 'top':
                obj.set('top', bounds.top);
                break;
            case 'bottom':
                obj.set('top', bounds.top + bounds.height - obj.getScaledHeight());
                break;
            default:
                obj.set('left', bounds.left + bounds.width / 2 - obj.getScaledWidth() / 2);
                obj.set('top', bounds.top + bounds.height / 2 - obj.getScaledHeight() / 2);
        }

        obj.setCoords();
    });

    canvas.requestRenderAll();
    return { status: 'ok', message: 'Alignment applied.' };
};
