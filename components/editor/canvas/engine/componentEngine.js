import { useComponentsStore } from '@/stores/useComponentsStore';
import { extractComponentProps, diffProps } from '@/engines/components/componentUtils';
import { updateInstancesOfComponent } from '@/engines/components/updateInstancesOfComponent';

export const attachComponentEngine = (canvas) => {
    if (!canvas) return () => {};

    const handleModified = (evt) => {
        const target = evt?.target;
        if (!target) return;

        const store = useComponentsStore.getState();

        if (target.__componentMaster && target.__componentId) {
            const componentId = target.__componentId;
            const component = store.components[componentId];
            if (!component) return;

            const variantName = component.defaultVariant || 'default';
            const properties = extractComponentProps(target);
            const variants = {
                ...component.variants,
                [variantName]: {
                    ...(component.variants?.[variantName] ?? {}),
                    properties,
                },
            };

            store.updateComponent(componentId, { variants });
            updateInstancesOfComponent(canvas, componentId);
            return;
        }

        if (target.__instanceId) {
            const instanceId = target.__instanceId;
            const instance = store.instances[instanceId];
            if (!instance) return;

            const component = store.components[instance.componentId];
            if (!component) return;

            const variantName = instance.variant || component.defaultVariant || 'default';
            const baseProps =
                component.variants?.[variantName]?.properties ||
                component.variants?.[component.defaultVariant]?.properties ||
                {};
            const currentProps = extractComponentProps(target);
            const overrides = diffProps(currentProps, baseProps);
            store.updateInstance(instanceId, { overrides });
        }
    };

    canvas.on('object:modified', handleModified);

    return () => {
        canvas.off('object:modified', handleModified);
    };
};
