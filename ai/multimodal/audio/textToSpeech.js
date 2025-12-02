import { openaiClient } from '../engines/openaiClient';

export const textToSpeech = async (text, voice = 'default', format = 'mp3') => {
    return openaiClient({ text, voice, format }, 'audio/tts');
};
