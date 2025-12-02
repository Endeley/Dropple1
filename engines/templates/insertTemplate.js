import * as fabric from 'fabric';
import { useTemplateStore } from '@/stores/useTemplateStore';

export const insertTemplate = (canvas, templateId, mode = 'merge') => {
    const templates = useTemplateStore.getState().templates;
    const template = templates[templateId];

    if (!template) {
        console.warn('Template not found:', templateId);
        return;
    }

    if (mode === 'replace') {
        canvas.clear();
    }

    fabric.util.enlivenObjects(
        template.data.objects,
        (objects) => {
            objects.forEach((obj) => {
                obj.__objectId = crypto.randomUUID();
                canvas.add(obj);
            });

            canvas.requestRenderAll();
        },
        null
    );
};
