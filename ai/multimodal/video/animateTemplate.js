import { openaiClient } from '../engines/openaiClient';

export const animateTemplate = async (canvasJSON, style = 'dynamic') => {
    return openaiClient({ template: canvasJSON, style }, 'video/animateTemplate');
};
