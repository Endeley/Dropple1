import { useComponentsStore } from '@/stores/useComponentsStore';
import { applyComponentProperties } from './componentUtils';
import { applyOverrides } from './applyOverrides';

export const switchVariant = (canvas, instanceObj, variantName) => {
    if (!canvas || !instanceObj || !variantName) return;

    const store = useComponentsStore.getState();
    const instanceData = store.instances[instanceObj.__instanceId];
    if (!instanceData) return;
    const component = store.components[instanceData.componentId];
    if (!component) return;

    const variant =
        component.variants?.[variantName] ??
        component.variants?.[component.defaultVariant];
    if (!variant) return;

    if (variant.properties) {
        applyComponentProperties(instanceObj, variant.properties);
    }

    applyOverrides(instanceObj, instanceData.overrides);

    store.updateInstance(instanceObj.__instanceId, {
        variant: variantName,
    });

    canvas.requestRenderAll();
};
