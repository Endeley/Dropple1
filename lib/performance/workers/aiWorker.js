self.onmessage = async (event) => {
    const { id, type, payload } = event.data;

    try {
        let result;
        switch (type) {
            case 'PREPARE_TEXT':
                result = await cleanTextPrompt(payload.prompt);
                break;
            case 'PREPARE_IMAGE':
                result = await prepareImage(payload.blob);
                break;
            case 'BATCH_TASKS':
                result = await batchTasks(payload.tasks);
                break;
            default:
                throw new Error('Unknown AI worker task');
        }

        self.postMessage({ id, success: true, data: result });
    } catch (error) {
        self.postMessage({ id, error: error.message });
    }
};

async function cleanTextPrompt(prompt = '') {
    const trimmed = prompt.trim();
    const normalized = trimmed.replace(/\s+/g, ' ').replace(/(\n|\r)/g, ' ');
    return { prompt: normalized };
}

async function prepareImage(blob) {
    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    const encoded = await canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 });
    return { width: bitmap.width, height: bitmap.height, blob: encoded };
}

async function batchTasks(tasks = []) {
    return { batch: tasks };
}
