export const extractPlaceholders = (canvas) => {
    const objects = canvas.getObjects();

    const placeholders = [];

    objects.forEach((obj) => {
        if (!obj.__objectId) {
            obj.__objectId = crypto.randomUUID();
        }

        if (obj.type === 'textbox') {
            const key = `{{text-${obj.__objectId.slice(0, 6)}}}`;
            placeholders.push({
                id: obj.__objectId,
                key,
                type: 'text',
                defaultValue: obj.text,
            });
            obj.text = key;
        }

        if (obj.type === 'image') {
            const key = `{{image-${obj.__objectId.slice(0, 6)}}}`;
            placeholders.push({
                id: obj.__objectId,
                key,
                type: 'image',
                defaultValue: null,
            });
            obj.set('fill', '#ccc');
            obj.set('src', '');
        }
    });

    return placeholders;
};
