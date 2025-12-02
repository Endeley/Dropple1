import * as fabric from 'fabric';

export const loadSVGIcon = (canvas, src, position = {}) => {
    fabric.loadSVGFromURL(src, (objects, opts) => {
        const icon = fabric.util.groupSVGElements(objects, opts);
        icon.__objectId = crypto.randomUUID();

        icon.set({
            left: position.x || 200,
            top: position.y || 200,
            selectable: true,
        });

        canvas.add(icon);
        canvas.setActiveObject(icon);
        canvas.requestRenderAll();
    });
};
