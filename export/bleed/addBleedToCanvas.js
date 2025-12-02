export const addBleedToCanvas = (canvas, bleedInMM, dpi = 300) => {
    const mmToInch = 0.0393701;
    const bleedPx = bleedInMM * mmToInch * dpi;

    const temp = document.createElement('canvas');
    temp.width = canvas.width + bleedPx * 2;
    temp.height = canvas.height + bleedPx * 2;

    const ctx = temp.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, temp.width, temp.height);

    ctx.drawImage(canvas, bleedPx, bleedPx);

    return temp;
};
