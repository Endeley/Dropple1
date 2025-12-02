import { ensureFabricFilters } from '@/utils/fabricFilterLoader';

export const applyBlurEffect = async (obj, amount = 0.2) => {
    await ensureFabricFilters();

    obj.filters = obj.filters || [];
    obj.filters.push(new window.fabric.Image.filters.Blur({ blur: amount }));

    obj.applyFilters();
};
