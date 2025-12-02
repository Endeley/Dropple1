import * as fabric from 'fabric';

export const applyPlaceholders = (canvas, placeholderMap) => {
    const objects = canvas.getObjects();

    objects.forEach((obj) => {
        if (obj.type === 'textbox') {
            const keys = Object.keys(placeholderMap);
            keys.forEach((key) => {
                if (obj.text.includes(key)) {
                    obj.text = obj.text.replace(key, placeholderMap[key]);
                }
            });
        }

        if (obj.type === 'image') {
            const match = Object.keys(placeholderMap).find((k) =>
                obj.src?.includes(k)
            );

            if (match) {
                fabric.Image.fromURL(placeholderMap[match], (img) => {
                    canvas.remove(obj);
                    canvas.add(img);
                });
            }
        }
    });

    canvas.requestRenderAll();
};
