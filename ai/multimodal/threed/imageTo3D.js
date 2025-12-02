import { openaiClient } from '../engines/openaiClient';

export const imageTo3D = async (imageUrl, format = 'glb') => {
    return openaiClient({ image: imageUrl, format }, 'threed/imageTo3D');
};
