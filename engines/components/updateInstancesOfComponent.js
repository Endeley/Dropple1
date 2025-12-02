import { useComponentsStore } from '@/stores/useComponentsStore';
import { applyComponentProperties } from './componentUtils';
import { applyOverrides } from './applyOverrides';

export const updateInstancesOfComponent = (canvas, componentId) => {
    if (!canvas || !componentId) return;

    const store = useComponentsStore.getState();
    const component = store.components[componentId];
    if (!component) return;

    const entries = Object.entries(store.instances || {});
    entries.forEach(([instanceId, data]) => {
        if (!data || data.componentId !== componentId) return;

        const object = canvas
            .getObjects()
            .find((obj) => obj.__instanceId === instanceId);
        if (!object) return;

        const variantName = data.variant || component.defaultVariant;
        const variant =
            component.variants?.[variantName] ??
            component.variants?.[component.defaultVariant];

        if (variant?.properties) {
            applyComponentProperties(object, variant.properties);
        }

        applyOverrides(object, data.overrides);
        object.setCoords();
    });

    canvas.requestRenderAll();
};
