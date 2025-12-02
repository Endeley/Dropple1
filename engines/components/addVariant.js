import { useComponentsStore } from '@/stores/useComponentsStore';
import { extractComponentProps } from './componentUtils';

export const addVariant = (componentId, variantName, sourceObject) => {
    const store = useComponentsStore.getState();
    const component = store.components[componentId];
    if (!component) return;

    const properties = sourceObject
        ? extractComponentProps(sourceObject)
        : {};

    store.updateComponent(componentId, {
        variants: {
            ...component.variants,
            [variantName]: {
                name: variantName,
                properties,
            },
        },
    });
};
