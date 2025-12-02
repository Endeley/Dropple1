import { openaiClient } from '../engines/openaiClient';

export const autoMaterial = async (mesh, style = 'realistic') => {
    return openaiClient({ mesh, style }, 'threed/material');
};
