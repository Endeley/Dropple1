import { ensureFabricFilters } from '@/utils/fabricFilterLoader';

export const applyLUT = async (obj, lutURL) => {
    await ensureFabricFilters();

    window.fabric.Image.fromURL(lutURL, (lut) => {
        obj.filters = obj.filters || [];
        obj.filters.push(
            new window.fabric.Image.filters.LUT({
                lut: lut._originalElement,
            })
        );
        obj.applyFilters();
    });
};
