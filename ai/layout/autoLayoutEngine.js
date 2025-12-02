export const autoLayout = (canvas) => {
    const objs = canvas.getObjects();

    const spacing = 20;
    let y = 100;

    objs.forEach((o) => {
        o.left = 200;
        o.top = y;
        y += o.height * o.scaleY + spacing;
        o.setCoords();
    });

    canvas.requestRenderAll();
};
