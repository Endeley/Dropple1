self.onmessage = async (event) => {
    const { type, payload } = event.data;

    try {
        switch (type) {
            case 'RESIZE':
                self.postMessage(await resizeImage(payload));
                break;
            case 'COMPRESS':
                self.postMessage(await compressImage(payload));
                break;
            case 'CROP':
                self.postMessage(await cropImage(payload));
                break;
            case 'TO_DATA_URL':
                self.postMessage(await convertToDataURL(payload));
                break;
            default:
                self.postMessage({ error: 'Unknown operation' });
        }
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};

async function resizeImage({ blob, width, height }) {
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0, width, height);
    const output = await canvas.convertToBlob({ type: 'image/png' });
    return { success: true, blob: output };
}

async function compressImage({ blob, quality }) {
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    const output = await canvas.convertToBlob({
        type: 'image/jpeg',
        quality: quality ?? 0.8,
    });
    return { success: true, blob: output };
}

async function cropImage({ blob, x, y, width, height }) {
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, x, y, width, height, 0, 0, width, height);
    const output = await canvas.convertToBlob({ type: 'image/png' });
    return { success: true, blob: output };
}

async function convertToDataURL({ blob }) {
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    const pngBlob = await canvas.convertToBlob({ type: 'image/png' });
    const dataUrl = await blobToDataURL(pngBlob);
    return { success: true, dataUrl };
}

function blobToDataURL(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}
