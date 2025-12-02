import { layoutGenerator } from './layoutGenerator';
import { paletteGenerator } from './paletteGenerator';
import { textGenerator } from './textGenerator';

export const templateGenerator = async (type = 'generic') => {
    const layout = layoutGenerator(type);
    const palette = paletteGenerator(type);
    const text = await textGenerator(type);

    return {
        layout,
        palette,
        copy: text,
    };
};
