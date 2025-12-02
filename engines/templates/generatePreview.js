export const generatePreview = async (canvas, id) => {
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 0.92,
        multiplier: 0.5,
    });

    return dataURL;
};
