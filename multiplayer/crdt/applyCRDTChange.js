export const applyCRDTChange = (canvas, patch) => {
    if (!patch) return;

    const objects = canvas.getObjects();

    patch.forEach((entry) => {
        const obj = objects.find((o) => o.__objectId === entry.id);
        if (!obj) return;

        Object.entries(entry.changes).forEach(([key, value]) => {
            obj.set(key, value);
        });

        obj.setCoords();
    });

    canvas.requestRenderAll();
};
