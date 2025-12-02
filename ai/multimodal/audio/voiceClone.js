import { openaiClient } from '../engines/openaiClient';

export const voiceClone = async (audioData, label = 'custom voice') => {
    return openaiClient({ audio: audioData, label }, 'audio/clone');
};
