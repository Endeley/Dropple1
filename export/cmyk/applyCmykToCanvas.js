import { rgbToCmyk } from './rgbToCmyk';

export const applyCmykToCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = img.data;

    for (let i = 0; i < data.length; i += 4) {
        const [c, m, y, k] = rgbToCmyk(data[i], data[i + 1], data[i + 2]);
        data[i] = 255 * (1 - c) * (1 - k);
        data[i + 1] = 255 * (1 - m) * (1 - k);
        data[i + 2] = 255 * (1 - y) * (1 - k);
    }

    ctx.putImageData(img, 0, 0);
};
