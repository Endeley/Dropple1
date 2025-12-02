export const alignObjects = (objects, canvas, type) => {
    if (!canvas || !objects || objects.length < 2) return;

    const rects = objects.map((obj) => obj.getBoundingRect(true, true));

    switch (type) {
        case 'left': {
            const targetX = Math.min(...rects.map((r) => r.left));
            objects.forEach((obj, index) => {
                const r = rects[index];
                obj.set({ left: obj.left - (r.left - targetX) });
                obj.setCoords();
            });
            break;
        }

        case 'right': {
            const targetX = Math.max(...rects.map((r) => r.left + r.width));
            objects.forEach((obj, index) => {
                const r = rects[index];
                obj.set({ left: obj.left + (targetX - (r.left + r.width)) });
                obj.setCoords();
            });
            break;
        }

        case 'center-h': {
            const minLeft = Math.min(...rects.map((r) => r.left));
            const maxRight = Math.max(...rects.map((r) => r.left + r.width));
            const centerX = (minLeft + maxRight) / 2;

            objects.forEach((obj, index) => {
                const r = rects[index];
                const objCenter = r.left + r.width / 2;
                obj.set({ left: obj.left + (centerX - objCenter) });
                obj.setCoords();
            });
            break;
        }

        case 'top': {
            const targetY = Math.min(...rects.map((r) => r.top));
            objects.forEach((obj, index) => {
                const r = rects[index];
                obj.set({ top: obj.top - (r.top - targetY) });
                obj.setCoords();
            });
            break;
        }

        case 'bottom': {
            const targetY = Math.max(...rects.map((r) => r.top + r.height));
            objects.forEach((obj, index) => {
                const r = rects[index];
                obj.set({ top: obj.top + (targetY - (r.top + r.height)) });
                obj.setCoords();
            });
            break;
        }

        case 'center-v': {
            const minTop = Math.min(...rects.map((r) => r.top));
            const maxBottom = Math.max(...rects.map((r) => r.top + r.height));
            const centerY = (minTop + maxBottom) / 2;

            objects.forEach((obj, index) => {
                const r = rects[index];
                const objCenter = r.top + r.height / 2;
                obj.set({ top: obj.top + (centerY - objCenter) });
                obj.setCoords();
            });
            break;
        }

        default:
            break;
    }

    canvas.requestRenderAll();
};
