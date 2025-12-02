import { openaiClient } from '../engines/openaiClient';

export const imageToVideo = async (imageUrl, motionPrompt, duration = 4) => {
    return openaiClient({ image: imageUrl, motion: motionPrompt, duration }, 'video/image2video');
};
