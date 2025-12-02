export const computeGroupBoundingBox = (objects, canvas) => {
    const zoom = canvas.getZoom();
    const vt = canvas.viewportTransform;

    const rects = objects.map((obj) => obj.getBoundingRect(true, true));

    const left = Math.min(...rects.map((r) => r.left));
    const top = Math.min(...rects.map((r) => r.top));
    const right = Math.max(...rects.map((r) => r.left + r.width));
    const bottom = Math.max(...rects.map((r) => r.top + r.height));

    const width = right - left;
    const height = bottom - top;

    return {
        x: left * zoom + vt[4],
        y: top * zoom + vt[5],
        width: width * zoom,
        height: height * zoom,
        angle: 0,
        groupLeft: left,
        groupTop: top,
        groupWidth: width,
        groupHeight: height,
    };
};
