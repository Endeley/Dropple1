import { openaiClient } from '../engines/openaiClient';

export const autoSpacing = async (canvasJSON) => {
    return openaiClient({ canvas: canvasJSON }, 'layout/spacing');
};
