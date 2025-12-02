import * as fabric from 'fabric';
import { patchFabricGroupTransforms } from './patchFabricGroups';

export default function initFabric(container, pixiApp) {
    const canvasEl = document.createElement('canvas');
    canvasEl.style.position = 'absolute';
    canvasEl.style.top = 0;
    canvasEl.style.left = 0;
    canvasEl.style.pointerEvents = 'auto';

    container.appendChild(canvasEl);

    const fabricCanvas = new fabric.Canvas(canvasEl, {
        selection: true,
        preserveObjectStacking: true,
        backgroundColor: 'transparent',
    });

    patchFabricGroupTransforms(fabric);

    // Resize Fabric when Pixi or browser resizes
    const resize = () => {
        fabricCanvas.setWidth(container.clientWidth);
        fabricCanvas.setHeight(container.clientHeight);
        fabricCanvas.renderAll();
    };

    resize();
    window.addEventListener('resize', resize);

    return fabricCanvas;
}
