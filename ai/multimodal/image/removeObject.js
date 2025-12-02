import { openaiClient } from '../engines/openaiClient';

export const removeObject = async (imageUrl, maskUrl) => {
    return openaiClient({ image: imageUrl, mask: maskUrl }, 'image/remove');
};
