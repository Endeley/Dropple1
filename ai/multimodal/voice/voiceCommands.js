import { openaiClient } from '../engines/openaiClient';

export const processVoiceCommand = async (audioBlob) => {
    const transcription = await openaiClient({ audio: audioBlob }, 'voice/stt');
    const intent = await openaiClient({ text: transcription?.text || transcription }, 'nlp/intent');
    return intent;
};
