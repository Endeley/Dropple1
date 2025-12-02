import { openaiClient } from '../engines/openaiClient';

export const detectObjects = async (imageUrl) => {
    return openaiClient({ image: imageUrl }, 'vision/detect');
};
