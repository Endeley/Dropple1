export const drawBleedGuides = (ctx, width, height, bleedPx) => {
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 1;
    ctx.strokeRect(bleedPx, bleedPx, width - bleedPx * 2, height - bleedPx * 2);
};
