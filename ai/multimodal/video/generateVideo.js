import { openaiClient } from '../engines/openaiClient';

export const generateVideo = async (prompt, duration = 5, aspect = '16:9') => {
    return openaiClient({ prompt, duration, aspect }, 'video/generate');
};
