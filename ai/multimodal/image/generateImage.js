import { openaiClient } from '../engines/openaiClient';

export const generateImage = async (prompt, size = '1024x1024', model = 'default') => {
    return openaiClient({ prompt, size, model }, 'image/generate');
};
