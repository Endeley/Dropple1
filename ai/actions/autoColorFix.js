const DEFAULT_PALETTE = ['#7C3AED', '#4F46E5', '#EC4899', '#0EA5E9', '#F97316'];

export const autoColorFix = (canvas) => {
    const objects = canvas?.getActiveObjects?.();
    const targets = objects && objects.length ? objects : canvas?.getObjects?.() || [];

    if (!targets.length) {
        return { status: 'idle', message: 'There are no objects to recolor.' };
    }

    targets.forEach((obj, index) => {
        if ('fill' in obj && obj.fill) {
            obj.set('fill', DEFAULT_PALETTE[index % DEFAULT_PALETTE.length]);
        }
        if ('stroke' in obj && obj.stroke) {
            obj.set('stroke', DEFAULT_PALETTE[(index + 2) % DEFAULT_PALETTE.length]);
        }
        obj.setCoords();
    });

    canvas.requestRenderAll();
    return { status: 'ok', message: 'Palette refreshed.' };
};
