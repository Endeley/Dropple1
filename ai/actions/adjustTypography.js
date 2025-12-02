import { aiCanvasAPI } from '../aiCanvasAPI';

export const adjustTypography = (canvas, style) => {
    const objects = canvas?.getActiveObjects?.() || [];
    if (!objects.length) {
        return { status: 'idle', message: 'Select text layers to style.' };
    }

    objects.forEach((obj) => aiCanvasAPI.setTextStyle(obj, style));
    canvas.requestRenderAll();

    return { status: 'ok', message: 'Typography updated.' };
};
