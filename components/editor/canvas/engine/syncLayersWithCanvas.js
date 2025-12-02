import { useLayersStore } from '@/stores/useLayersStore';

const toLayerMetadata = (canvas) => {
    if (!canvas) return [];

    return canvas.getObjects().map((obj, index) => {
        const metadata = {
            id: obj.__objectId ?? obj.id ?? obj.name ?? `layer-${index}`,
            name: obj.name || obj.type || `Layer ${index + 1}`,
            type: obj.type,
            visible: obj.visible !== false,
            locked: obj.selectable === false,
        };

        if (obj.type === 'group') {
            metadata.children = (obj._objects || []).map(
                (child, childIndex) =>
                    child.__objectId ?? child.id ?? child.name ?? `child-${childIndex}`
            );
        }

        return metadata;
    });
};

export const refreshLayersFromCanvas = (canvas) => {
    if (!canvas) return;
    const layers = toLayerMetadata(canvas);
    useLayersStore.getState().setLayers(layers);
};

export const syncLayersWithCanvas = (canvas) => {
    if (!canvas) return () => {};

    const update = () => {
        refreshLayersFromCanvas(canvas);
    };

    const events = [
        'object:added',
        'object:removed',
        'object:modified',
        'object:state:changed',
        'object:skewing',
        'object:scaling',
        'object:moving',
    ];

    events.forEach((evt) => canvas.on(evt, update));
    update();

    return () => {
        events.forEach((evt) => canvas.off(evt, update));
    };
};
