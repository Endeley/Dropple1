import { openaiClient } from '../engines/openaiClient';

export const understandCanvas = async (canvasJSON) => {
    return openaiClient({ canvas: canvasJSON }, 'vision/understandCanvas');
};
