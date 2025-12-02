export const enableLowPowerMode = (canvas) => {
    if (!canvas) return () => {};

    const original = {
        renderOnAddRemove: canvas.renderOnAddRemove,
        preserveObjectStacking: canvas.preserveObjectStacking,
    };

    canvas.renderOnAddRemove = false;
    canvas.preserveObjectStacking = false;

    return () => {
        canvas.renderOnAddRemove = original.renderOnAddRemove;
        canvas.preserveObjectStacking = original.preserveObjectStacking;
    };
};
