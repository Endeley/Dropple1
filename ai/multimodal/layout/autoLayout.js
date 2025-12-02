import { openaiClient } from '../engines/openaiClient';

export const autoLayout = async (canvasJSON) => {
    return openaiClient({ canvas: canvasJSON }, 'layout/autolayout');
};
