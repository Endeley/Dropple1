import { useComponentsStore } from '@/stores/useComponentsStore';
import { recordCanvasHistory } from '@/components/editor/canvas/engine/historyEngine';
import { ensureObjectIds, applyComponentProperties } from './componentUtils';
import { applyOverrides } from './applyOverrides';

const cloneObject = (obj) =>
    new Promise((resolve) => {
        if (!obj) resolve(null);
        obj.clone((cloned) => resolve(cloned), ['layoutProps']);
    });

export const createInstance = async (componentId, canvas) => {
    if (!canvas || !componentId) return null;

    const store = useComponentsStore.getState();
    const component = store.components[componentId];
    if (!component) return null;

    const masterObj = canvas
        .getObjects()
        .find((obj) => obj.__objectId === component.root);
    if (!masterObj) return null;

    const clone = await cloneObject(masterObj);
    if (!clone) return null;

    ensureObjectIds(clone);
    clone.__instanceId = crypto.randomUUID();
    clone.__componentId = componentId;
    clone.__componentMaster = false;

    const defaultVariant = component.defaultVariant || 'default';
    const variantData =
        component.variants?.[defaultVariant] ?? component.variants?.default;
    if (variantData?.properties) {
        applyComponentProperties(clone, variantData.properties);
    }

    recordCanvasHistory(canvas, () => {
        canvas.add(clone);
        canvas.setActiveObject(clone);

        useComponentsStore.getState().registerInstance(clone.__instanceId, {
            id: clone.__instanceId,
            componentId,
            variant: defaultVariant,
            overrides: {},
        });

        applyOverrides(clone, {});
        canvas.requestRenderAll();
    });

    return clone;
};
