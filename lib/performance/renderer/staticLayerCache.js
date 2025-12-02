export class StaticLayerCache {
    constructor(canvas) {
        this.canvas = canvas;
        this.cacheCanvas = document.createElement('canvas');
        this.cacheCanvas.width = canvas.width;
        this.cacheCanvas.height = canvas.height;
        this.cacheCtx = this.cacheCanvas.getContext('2d');
    }

    shouldCache(obj) {
        return (
            obj.locked ||
            obj.staticCache ||
            obj.backgroundLayer ||
            obj.isDecoration ||
            obj.type === 'image' ||
            obj.type === 'rect' ||
            obj.type === 'gradientRect'
        );
    }

    build(objects = []) {
        this.cacheCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        objects.forEach((obj) => {
            if (this.shouldCache(obj)) {
                obj.render(this.cacheCtx);
            }
        });
    }

    drawTo(ctx) {
        if (!this.cacheCanvas) return;
        ctx.drawImage(this.cacheCanvas, 0, 0);
    }
}
