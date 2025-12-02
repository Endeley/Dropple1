export const ungroupSelection = (canvas) => {
    if (!canvas) return;

    const active = canvas.getActiveObject();
    if (!active || active.type !== 'group') return;

    const items = active._objects;
    if (!items || !items.length) return;

    canvas.remove(active);

    items.forEach((obj) => {
        active.removeWithUpdate(obj);
        canvas.add(obj);
    });

    canvas.discardActiveObject();
    canvas.requestRenderAll();
};
