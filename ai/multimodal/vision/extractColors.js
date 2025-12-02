import { openaiClient } from '../engines/openaiClient';

export const extractColors = async (imageUrl, count = 6) => {
    return openaiClient({ image: imageUrl, count }, 'vision/palette');
};
