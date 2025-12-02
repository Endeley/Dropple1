const getBounds = (objects) => {
    const rects = objects.map((obj) => obj.getBoundingRect(true));
    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    const right = Math.max(...rects.map((r) => r.left + r.width));
    const bottom = Math.max(...rects.map((r) => r.top + r.height));

    return { left, top, width: right - left, height: bottom - top };
};

export const applyAutoLayout = (canvas, opts = {}) => {
    const objects = canvas?.getActiveObjects?.() || [];
    if (objects.length < 2) {
        return { status: 'idle', message: 'Select at least two objects for auto layout.' };
    }

    const pattern = opts.pattern || 'columns';
    const gap = typeof opts.gap === 'number' ? opts.gap : 32;
    const bounds = getBounds(objects);

    if (pattern === 'rows') {
        const sorted = [...objects].sort((a, b) => a.top - b.top);
        let currentTop = bounds.top;

        sorted.forEach((obj) => {
            obj.set('left', bounds.left);
            obj.set('top', currentTop);
            obj.setCoords();
            currentTop += obj.getScaledHeight() + gap;
        });
    } else if (pattern === 'grid') {
        const columns = opts.columns || Math.ceil(Math.sqrt(objects.length));
        const maxWidth = Math.max(...objects.map((o) => o.getScaledWidth()));
        const maxHeight = Math.max(...objects.map((o) => o.getScaledHeight()));

        objects.forEach((obj, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);

            obj.set({
                left: bounds.left + col * (maxWidth + gap),
                top: bounds.top + row * (maxHeight + gap),
            });
            obj.setCoords();
        });
    } else {
        const sorted = [...objects].sort((a, b) => a.left - b.left);
        let currentLeft = bounds.left;

        sorted.forEach((obj) => {
            obj.set('left', currentLeft);
            obj.set('top', bounds.top);
            obj.setCoords();
            currentLeft += obj.getScaledWidth() + gap;
        });
    }

    canvas.requestRenderAll();
    return { status: 'ok', message: 'Auto layout applied.' };
};
