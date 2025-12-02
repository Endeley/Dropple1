export const getCanvasLayers = (canvas) => {
    if (!canvas) return [];
    return canvas.getObjects().map((obj) => ({
        id: obj.__objectId,
        type: obj.type,
        name: obj.name || obj.type,
        visible: obj.visible,
        locked: obj.lockMovementX && obj.lockMovementY,
        obj,
    }));
};

export const reorderLayer = (canvas, fromIndex, toIndex) => {
    if (!canvas) return;
    const objs = canvas.getObjects();
    const obj = objs[fromIndex];
    objs.splice(fromIndex, 1);
    objs.splice(toIndex, 0, obj);

    canvas.clear();
    objs.forEach((o) => canvas.add(o));
    canvas.requestRenderAll();
};

export const toggleLock = (obj) => {
    const lock = !(obj.lockMovementX && obj.lockMovementY);
    obj.lockMovementX = lock;
    obj.lockMovementY = lock;
    obj.hasControls = !lock;
};

export const toggleVisibility = (obj) => {
    obj.visible = !obj.visible;
};
