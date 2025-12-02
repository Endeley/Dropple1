import { debounceFrame } from '../utils/debounceFrame';
import { usePerformanceStore } from '@/lib/state/performance/usePerformanceStore';

export class FastTransforms {
    constructor(canvas, fastRenderer) {
        this.canvas = canvas;
        this.renderer = fastRenderer;
        this.attachEvents();
    }

    attachEvents() {
        const perf = usePerformanceStore.getState();

        this.canvas.on('object:moving', (event) => {
            if (perf.useFastTransforms) this.handleMove(event.target);
        });

        this.canvas.on('object:scaling', (event) => {
            if (perf.useFastTransforms) this.handleScale(event.target);
        });

        this.canvas.on('object:rotating', (event) => {
            if (perf.useFastTransforms) this.handleRotate(event.target);
        });
    }

    handleMove = debounceFrame((object) => {
        if (!object) return;
        object.setCoords();
        this.renderer.markDirty();
    });

    handleScale = debounceFrame((object) => {
        if (!object) return;
        object.setCoords();
        this.renderer.markDirty();
    });

    handleRotate = debounceFrame((object) => {
        if (!object) return;
        object.setCoords();
        this.renderer.markDirty();
    });
}
