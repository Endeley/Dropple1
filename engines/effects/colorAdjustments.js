import { ensureFabricFilters } from '@/utils/fabricFilterLoader';

export const applyColorAdjustments = async (
    obj,
    { brightness = 0, contrast = 0, saturation = 0, hue = 0 }
) => {
    await ensureFabricFilters();

    obj.filters = [];

    if (brightness !== 0) {
        obj.filters.push(new window.fabric.Image.filters.Brightness({ brightness }));
    }
    if (contrast !== 0) {
        obj.filters.push(new window.fabric.Image.filters.Contrast({ contrast }));
    }
    if (saturation !== 0) {
        obj.filters.push(new window.fabric.Image.filters.Saturation({ saturation }));
    }
    if (hue !== 0) {
        obj.filters.push(new window.fabric.Image.filters.HueRotation({ rotation: hue }));
    }

    obj.applyFilters();
};
