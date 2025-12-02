import { openaiClient } from '../engines/openaiClient';

export const upscaleImage = async (imageUrl, mode = '2x') => {
    return openaiClient({ image: imageUrl, mode }, 'image/upscale');
};
