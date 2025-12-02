export const replaceImage = (canvas, query) => {
    const fabric = typeof window !== 'undefined' ? window.fabric : null;
    if (!fabric) {
        return { status: 'error', message: 'Fabric is not ready yet.' };
    }

    const objects = canvas?.getActiveObjects?.() || [];
    if (!objects.length) {
        return { status: 'idle', message: 'Select an image to replace.' };
    }

    const target = objects.find((obj) => obj.type === 'image');
    if (!target) {
        return { status: 'idle', message: 'The selection does not contain an image.' };
    }

    const keywords = query?.replace(/replace image|change image/gi, '').trim() || 'design';
    const url = `https://source.unsplash.com/featured/?${encodeURIComponent(keywords)}`;

    fabric.Image.fromURL(url, (img) => {
        img.set({
            left: target.left,
            top: target.top,
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            angle: target.angle,
        });

        canvas.remove(target);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
    }, { crossOrigin: 'anonymous' });

    return { status: 'ok', message: 'Fetching a new image…' };
};
