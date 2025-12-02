self.onmessage = async (event) => {
    const { type, payload } = event.data;

    try {
        switch (type) {
            case 'BLUR':
                self.postMessage(await applyFilter(payload, 'blur'));
                break;
            case 'SHARPEN':
                self.postMessage(await applyFilter(payload, 'sharpen'));
                break;
            case 'SATURATION':
                self.postMessage(await applyFilter(payload, 'saturation'));
                break;
            default:
                self.postMessage({ error: 'Unknown filter' });
        }
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};

async function applyFilter({ blob, value }, filterType) {
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.filter = getFilter(filterType, value);
    ctx.drawImage(bitmap, 0, 0);
    const output = await canvas.convertToBlob({ type: 'image/png' });
    return { success: true, blob: output };
}

function getFilter(type, value) {
    switch (type) {
        case 'blur':
            return `blur(${value}px)`;
        case 'sharpen':
            return `contrast(${100 + value}%)`;
        case 'saturation':
            return `saturate(${value}%)`;
        default:
            return 'none';
    }
}
