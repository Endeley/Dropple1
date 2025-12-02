export const scaleCanvasForDPI = (canvas, dpi) => {
    const multiplier = dpi / 72;
    return canvas.toDataURL({
        multiplier,
        format: 'png',
        quality: 1,
    });
};
