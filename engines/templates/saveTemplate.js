import { useTemplateStore } from '@/stores/useTemplateStore';
import { generatePreview } from './generatePreview';

export const saveTemplate = async (canvas, name, category, tags = []) => {
    if (!canvas) return null;

    const id = crypto.randomUUID();

    const json = canvas.toJSON([
        '__objectId',
        '__componentId',
        '__instanceId',
        'layoutProps',
    ]);

    const preview = await generatePreview(canvas, id);

    const template = {
        id,
        name,
        category,
        tags,
        preview,
        data: json,
        createdAt: Date.now(),
    };

    useTemplateStore.getState().addTemplate(template);

    return id;
};
