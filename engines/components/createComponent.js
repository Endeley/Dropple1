import * as fabric from 'fabric';
import { useComponentsStore } from '@/stores/useComponentsStore';
import { recordCanvasHistory } from '@/components/editor/canvas/engine/historyEngine';
import { ensureObjectIds, extractComponentProps } from './componentUtils';

const DEFAULT_VARIANT = 'default';

export const createComponent = (canvas) => {
    if (!canvas) return null;
    const selection = canvas.getActiveObjects();
    if (!selection?.length) return null;

    let createdGroup = null;

    recordCanvasHistory(canvas, () => {
        const componentId = crypto.randomUUID();

        const group = new fabric.Group([], {
            name: 'Component',
            subTargetCheck: true,
            objectCaching: false,
        });

        selection.forEach((obj) => {
            canvas.remove(obj);
            ensureObjectIds(obj);
            group.addWithUpdate(obj);
        });

        ensureObjectIds(group);
        group.__componentId = componentId;
        group.__componentMaster = true;

        canvas.add(group);
        canvas.setActiveObject(group);

        const variantProps = extractComponentProps(group);

        useComponentsStore
            .getState()
            .createComponent(componentId, {
                id: componentId,
                root: group.__objectId,
                variants: {
                    [DEFAULT_VARIANT]: {
                        name: 'Default',
                        properties: variantProps,
                    },
                },
                defaultVariant: DEFAULT_VARIANT,
            });

        canvas.requestRenderAll();
        createdGroup = group;
    });

    return createdGroup;
};
