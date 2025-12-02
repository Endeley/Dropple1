import * as fabric from 'fabric';
import { ensureLayoutProps } from '@/components/editor/canvas/layout/layoutDefaults';

const ensureId = (obj) => {
    if (!obj.__objectId) {
        obj.__objectId = crypto.randomUUID();
    }
    return obj.__objectId;
};

export const groupSelection = (canvas) => {
    if (!canvas) return null;

    const active = canvas.getActiveObjects();
    if (!active || active.length < 2) return null;

    active.forEach((obj) => ensureId(obj));

    const group = new fabric.Group(active, {
        subTargetCheck: true,
        selectable: true,
        objectCaching: false,
    });

    active.forEach((obj) => canvas.remove(obj));
    canvas.add(group);

    group.__objectId = crypto.randomUUID();
    group.name = 'Group';
    ensureLayoutProps(group);

    canvas.setActiveObject(group);
    canvas.requestRenderAll();

    return group;
};
