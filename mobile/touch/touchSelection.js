export const initTouchSelection = (canvas) => {
    if (!canvas) return () => {};

    const handleMouseDown = (opt) => {
        const event = opt?.e;
        const isTouchEvent = event && (event.pointerType === 'touch' || event.touches);
        if (!isTouchEvent) return;

        if (opt.target) {
            canvas.setActiveObject(opt.target);
        } else {
            canvas.discardActiveObject();
        }
        canvas.requestRenderAll();
    };

    canvas.on('mouse:down', handleMouseDown);

    return () => {
        canvas.off('mouse:down', handleMouseDown);
    };
};
