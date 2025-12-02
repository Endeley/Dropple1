import { templateGenerator } from '../aiGenerators/templateGenerator';

export const createSmartTemplate = async (canvas, type = 'generic template') => {
    const fabric = typeof window !== 'undefined' ? window.fabric : null;
    if (!fabric) {
        return { status: 'error', message: 'Fabric is not available.' };
    }

    const template = await templateGenerator(type);
    const palette = template.palette;

    template.layout.items.forEach((item, index) => {
        const block = new fabric.Rect({
            left: item.x,
            top: item.y,
            width: item.w,
            height: item.h,
            fill: palette[index % palette.length],
            rx: 12,
            ry: 12,
        });
        canvas.add(block);
    });

    if (template.copy?.headline) {
        const text = new fabric.Textbox(template.copy.headline, {
            left: template.layout.heading?.x || 120,
            top: template.layout.heading?.y || 120,
            fontSize: 48,
            fontWeight: 'bold',
            width: template.layout.heading?.w || 480,
            fill: '#ffffff',
        });
        canvas.add(text);
    }

    if (template.copy?.body) {
        const body = new fabric.Textbox(template.copy.body, {
            left: template.layout.body?.x || 120,
            top: template.layout.body?.y || 320,
            fontSize: 20,
            width: template.layout.body?.w || 420,
            fill: '#f3f4f6',
        });
        canvas.add(body);
    }

    canvas.requestRenderAll();
    return { status: 'ok', message: 'Template inserted.' };
};
