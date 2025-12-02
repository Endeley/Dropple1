export const smartSelect = (canvas, type) => {
    const objs = canvas.getObjects();

    const selected = objs.filter((o) => {
        if (type === 'text') return o.type === 'textbox';
        if (type === 'images') return o.type === 'image';
        if (type === 'shapes') return ['rect', 'circle', 'triangle'].includes(o.type);
        return false;
    });

    canvas.discardActiveObject();
    const sel = new window.fabric.ActiveSelection(selected, { canvas });
    canvas.setActiveObject(sel);

    canvas.requestRenderAll();
};
