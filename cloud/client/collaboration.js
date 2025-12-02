import { sendOperation } from './realtime';

export const applyRemoteOperation = (canvas, op) => {
    if (!canvas || !op) return;
    const findById = (id) => canvas.getObjects().find((obj) => obj.__id === id);
    let target = op.target ? findById(op.target) : null;

    switch (op.type) {
        case 'add':
            if (op.objectJSON) {
                canvas.add(window.fabric.util.enlivenObject(op.objectJSON));
            }
            break;
        case 'delete':
            if (target) canvas.remove(target);
            break;
        case 'move':
            if (target) {
                target.set({ left: op.left, top: op.top });
                target.setCoords();
            }
            break;
        case 'transform':
            if (target) {
                target.set({
                    left: op.left,
                    top: op.top,
                    scaleX: op.scaleX,
                    scaleY: op.scaleY,
                    angle: op.angle,
                });
                target.setCoords();
            }
            break;
        case 'style':
            if (target) target.set({ ...op.style });
            break;
        default:
            break;
    }

    canvas.requestRenderAll();
};

export const broadcastOperation = (operation) => {
    sendOperation(operation);
};
