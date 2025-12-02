export const computeBoundingBox = (object, canvas) => {
    const rect = object.getBoundingRect(true, true);

    const zoom = canvas.getZoom();
    const vpt = canvas.viewportTransform;

    const x = rect.left * zoom + vpt[4];
    const y = rect.top * zoom + vpt[5];

    const width = rect.width * zoom;
    const height = rect.height * zoom;

    const angle = object.angle || 0;

    return { x, y, width, height, angle };
};
