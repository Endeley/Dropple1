import { openaiClient } from '../engines/openaiClient';

export const textTo3D = async (prompt, format = 'glb') => {
    return openaiClient({ prompt, format }, 'threed/textTo3D');
};
