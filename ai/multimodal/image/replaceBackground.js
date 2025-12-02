import { openaiClient } from '../engines/openaiClient';

export const replaceBackground = async (imageUrl, prompt) => {
    return openaiClient({ image: imageUrl, prompt }, 'image/background');
};
