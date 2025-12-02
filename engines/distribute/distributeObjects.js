export const distributeObjects = (objects, canvas, axis) => {
    if (!canvas || !objects || objects.length < 3) return;

    const rects = objects.map((obj) => ({
        obj,
        rect: obj.getBoundingRect(true, true),
    }));

    if (axis === 'horizontal') {
        rects.sort((a, b) => a.rect.left - b.rect.left);

        const left = rects[0].rect.left;
        const rightEdge =
            rects[rects.length - 1].rect.left + rects[rects.length - 1].rect.width;

        const totalWidth = rects.reduce((sum, item) => sum + item.rect.width, 0);
        const space = (rightEdge - left - totalWidth) / (rects.length - 1);

        let cursor = left;
        rects.forEach((item) => {
            item.obj.set({ left: cursor });
            item.obj.setCoords();
            cursor += item.rect.width + space;
        });
    }

    if (axis === 'vertical') {
        rects.sort((a, b) => a.rect.top - b.rect.top);

        const top = rects[0].rect.top;
        const bottomEdge =
            rects[rects.length - 1].rect.top + rects[rects.length - 1].rect.height;

        const totalHeight = rects.reduce((sum, item) => sum + item.rect.height, 0);
        const space = (bottomEdge - top - totalHeight) / (rects.length - 1);

        let cursor = top;
        rects.forEach((item) => {
            item.obj.set({ top: cursor });
            item.obj.setCoords();
            cursor += item.rect.height + space;
        });
    }

    canvas.requestRenderAll();
};
