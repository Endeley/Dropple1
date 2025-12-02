import { openaiClient } from '../engines/openaiClient';

export const generateMusic = async (prompt, duration = 30, mood = 'cinematic') => {
    return openaiClient({ prompt, duration, mood }, 'audio/music');
};
