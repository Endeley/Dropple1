import { useTemplateStore } from '@/stores/useTemplateStore';
import { recordCanvasHistory } from '@/components/editor/canvas/engine/historyEngine';

export const replaceCanvasWithTemplate = (canvas, templateId) => {
    if (!canvas) return;
    const template = useTemplateStore.getState().templates[templateId];
    if (!template?.data) return;

    recordCanvasHistory(canvas, () => {
        canvas.clear();
        canvas.loadFromJSON(template.data, () => {
            canvas.renderAll();
        });
    });
};

export const mergeTemplateIntoCanvas = (canvas, templateId) => {
    if (!canvas) return;
    const template = useTemplateStore.getState().templates[templateId];
    if (!template?.data) return;

    recordCanvasHistory(canvas, () => {
        canvas.loadFromJSON(template.data, () => {
            canvas.renderAll();
        });
    });
};
