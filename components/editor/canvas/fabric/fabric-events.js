export default function setupCanvasEvents(canvas) {
    let panning = false;

    canvas.on('mouse:down', (e) => {
        if (e.e.spaceKey) {
            panning = true;
            canvas.setCursor('grab');
        }
    });

    canvas.on('mouse:move', (e) => {
        if (panning && e.e) {
            canvas.relativePan({ x: e.e.movementX, y: e.e.movementY });
        }
    });

    canvas.on('mouse:up', () => {
        panning = false;
        canvas.setCursor('default');
    });

    // Zoom with mouse wheel
    canvas.on('mouse:wheel', (opt) => {
        let delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 5) zoom = 5;
        if (zoom < 0.2) zoom = 0.2;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
}
