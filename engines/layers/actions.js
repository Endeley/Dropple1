import { useLayersStore } from '@/stores/useLayersStore';
import { refreshLayersFromCanvas } from '@/components/editor/canvas/engine/syncLayersWithCanvas';

const findObjectById = (canvas, id) => {
    if (!canvas) return null;
    return canvas.getObjects().find((obj) => {
        const objId = obj.__objectId ?? obj.id ?? obj.name;
        return objId === id;
    });
};

export const toggleVisibility = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    obj.visible = !obj.visible;
    obj.setCoords?.();
    canvas.requestRenderAll();

    useLayersStore.getState().updateLayer(id, { visible: obj.visible });
};

export const toggleLock = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    const currentlyLocked = obj.selectable === false;
    const nextLocked = !currentlyLocked;

    obj.selectable = !nextLocked;
    obj.evented = !nextLocked;

    canvas.requestRenderAll();

    useLayersStore.getState().updateLayer(id, { locked: nextLocked });
};

export const selectLayer = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
};

export const bringToFront = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    obj.bringToFront();
    canvas.requestRenderAll();
    refreshLayersFromCanvas(canvas);
};

export const sendToBack = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    obj.sendToBack();
    canvas.requestRenderAll();
    refreshLayersFromCanvas(canvas);
};

export const moveUp = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    obj.bringForward();
    canvas.requestRenderAll();
    refreshLayersFromCanvas(canvas);
};

export const moveDown = (canvas, id) => {
    const obj = findObjectById(canvas, id);
    if (!obj) return;

    obj.sendBackwards();
    canvas.requestRenderAll();
    refreshLayersFromCanvas(canvas);
};
