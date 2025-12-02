import { ensureLayoutProps, getObjectId } from '../layout/layoutDefaults';
import { applyAutoLayout } from '../layout/applyAutoLayout';

const findParentFrames = (canvas, targetId) => {
    if (!canvas || !targetId) return [];
    return canvas
        .getObjects()
        .filter(
            (obj) =>
                obj.layoutProps?.autoLayout &&
                obj.layoutProps.children?.includes(targetId)
        );
};

const reflowFrame = (frame, canvas) => {
    if (!frame || !frame.layoutProps?.autoLayout) return;
    applyAutoLayout(frame, canvas);
};

const reflowForTarget = (canvas, target) => {
    if (!canvas || !target) return;
    ensureLayoutProps(target);

    if (target.layoutProps?.autoLayout) {
        reflowFrame(target, canvas);
    }

    const targetId = getObjectId(target);
    findParentFrames(canvas, targetId).forEach((frame) =>
        reflowFrame(frame, canvas)
    );
};

const handleRemoval = (canvas, target) => {
    if (!canvas || !target) return;
    const targetId = getObjectId(target);
    canvas.getObjects().forEach((frame) => {
        if (!frame.layoutProps?.autoLayout) return;
        const children = frame.layoutProps.children || [];
        if (children.includes(targetId)) {
            frame.layoutProps.children = children.filter((id) => id !== targetId);
            reflowFrame(frame, canvas);
        }
    });
};

export const attachAutoLayoutEngine = (canvas) => {
    if (!canvas) return () => {};

    const events = [];

    const onModified = (evt) => {
        if (!evt?.target) return;
        reflowForTarget(canvas, evt.target);
    };

    const onAdded = (evt) => {
        if (!evt?.target) return;
        ensureLayoutProps(evt.target);
        reflowForTarget(canvas, evt.target);
    };

    const onRemoved = (evt) => {
        if (!evt?.target) return;
        handleRemoval(canvas, evt.target);
    };

    canvas.on('object:modified', onModified);
    canvas.on('object:added', onAdded);
    canvas.on('object:removed', onRemoved);

    events.push(['object:modified', onModified]);
    events.push(['object:added', onAdded]);
    events.push(['object:removed', onRemoved]);

    canvas.getObjects().forEach((obj) => {
        ensureLayoutProps(obj);
        if (obj.layoutProps?.autoLayout) {
            reflowFrame(obj, canvas);
        }
    });

    return () => {
        events.forEach(([event, handler]) => canvas.off(event, handler));
    };
};
