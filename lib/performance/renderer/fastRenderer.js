import { usePerformanceStore } from '@/lib/state/performance/usePerformanceStore';
import { rafBatcher } from '../utils/rafBatcher';

export class FastRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas?.getContext?.('2d');
        this.isDirty = true;
        this.isFrozen = false;
        this.staticCache = null;
        this.viewport = { x: 0, y: 0, width: canvas.width, height: canvas.height };

        this.render = this.render.bind(this);
        this.markDirty = this.markDirty.bind(this);
        this.freeze = this.freeze.bind(this);
        this.thaw = this.thaw.bind(this);

        rafBatcher.add(this.render);
    }

    buildStaticCache(objects = []) {
        const cacheCanvas = document.createElement('canvas');
        cacheCanvas.width = this.canvas.width;
        cacheCanvas.height = this.canvas.height;
        const cacheCtx = cacheCanvas.getContext('2d');

        objects.forEach((obj) => {
            if (obj.locked || obj.staticCache) {
                obj.render(cacheCtx);
            }
        });

        this.staticCache = cacheCanvas;
    }

    freeze() {
        this.isFrozen = true;
    }

    thaw() {
        this.isFrozen = false;
        this.markDirty();
    }

    markDirty() {
        if (!this.isFrozen) this.isDirty = true;
    }

    getVisibleObjects(objects = []) {
        const { x, y, width, height } = this.viewport;
        return objects.filter((obj) => {
            const bounds = obj.getBoundingRect(true);
            return (
                bounds.left < x + width &&
                bounds.left + bounds.width > x &&
                bounds.top < y + height &&
                bounds.top + bounds.height > y
            );
        });
    }

    render() {
        if (!this.ctx || !this.isDirty || this.isFrozen) return;

        const perf = usePerformanceStore.getState();
        const objects = this.canvas._objects || [];

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (perf.useStaticLayerCache && this.staticCache) {
            this.ctx.drawImage(this.staticCache, 0, 0);
        }

        let drawList = objects;
        if (perf.useVirtualCanvas) drawList = this.getVisibleObjects(objects);

        drawList.forEach((obj) => {
            if (!obj.locked) obj.render(this.ctx);
        });

        this.isDirty = false;
    }

    updateViewport(viewport) {
        this.viewport = { ...this.viewport, ...viewport };
        this.markDirty();
    }
}
