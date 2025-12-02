export const computeSmartGuides = (active, others, canvas, threshold = 6) => {
    const guides = [];

    const a = active.getBoundingRect(false, false);
    const axCenter = a.left + a.width / 2;
    const ayCenter = a.top + a.height / 2;

    const canvasWidth = canvas.getWidth ? canvas.getWidth() : canvas.width || 0;
    const canvasHeight = canvas.getHeight ? canvas.getHeight() : canvas.height || 0;

    others.forEach((obj) => {
        const b = obj.getBoundingRect(false, false);

        const bxCenter = b.left + b.width / 2;
        const byCenter = b.top + b.height / 2;

        if (Math.abs(axCenter - bxCenter) < threshold) {
            guides.push({
                type: 'v-center',
                x1: bxCenter,
                y1: 0,
                x2: bxCenter,
                y2: canvasHeight,
            });
        }

        if (Math.abs(ayCenter - byCenter) < threshold) {
            guides.push({
                type: 'h-center',
                x1: 0,
                y1: byCenter,
                x2: canvasWidth,
                y2: byCenter,
            });
        }

        if (Math.abs(a.left - b.left) < threshold) {
            guides.push({
                type: 'v-left',
                x1: b.left,
                y1: 0,
                x2: b.left,
                y2: canvasHeight,
            });
        }

        if (Math.abs(a.left + a.width - (b.left + b.width)) < threshold) {
            const edge = b.left + b.width;
            guides.push({
                type: 'v-right',
                x1: edge,
                y1: 0,
                x2: edge,
                y2: canvasHeight,
            });
        }

        if (Math.abs(a.top - b.top) < threshold) {
            guides.push({
                type: 'h-top',
                x1: 0,
                y1: b.top,
                x2: canvasWidth,
                y2: b.top,
            });
        }

        if (Math.abs(a.top + a.height - (b.top + b.height)) < threshold) {
            const edge = b.top + b.height;
            guides.push({
                type: 'h-bottom',
                x1: 0,
                y1: edge,
                x2: canvasWidth,
                y2: edge,
            });
        }
    });

    return guides;
};
