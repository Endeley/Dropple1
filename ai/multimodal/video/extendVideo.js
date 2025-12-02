import { openaiClient } from '../engines/openaiClient';

export const extendVideo = async (videoUrl, extraSeconds = 2) => {
    return openaiClient({ video: videoUrl, extra: extraSeconds }, 'video/extend');
};
