import { openaiClient } from '../engines/openaiClient';

export const cleanAudio = async (audioData) => {
    return openaiClient({ audio: audioData }, 'audio/clean');
};
