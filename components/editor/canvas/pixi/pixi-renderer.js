import * as PIXI from 'pixi.js';

/**
 * Main Pixi rendering loop
 * Syncs with Fabric.js interaction layer
 */
export default function createPixiRenderer(app, layers, fabricCanvas) {
    // Keep track of Fabric’s render calls
    let needsRender = true;

    // Hook Fabric to request a new Pixi frame
    fabricCanvas.on('object:modified', () => (needsRender = true));
    fabricCanvas.on('object:moving', () => (needsRender = true));
    fabricCanvas.on('object:scaling', () => (needsRender = true));
    fabricCanvas.on('object:rotating', () => (needsRender = true));
    fabricCanvas.on('object:added', () => (needsRender = true));
    fabricCanvas.on('object:removed', () => (needsRender = true));

    // Fabric background images or fills
    fabricCanvas.on('after:render', () => (needsRender = true));

    // Main Pixi render loop
    app.ticker.add(() => {
        if (!needsRender) return;

        // Future: Convert Fabric objects → Pixi Sprites

        // For now, render Pixi stage
        app.renderer.render(app.stage);

        needsRender = false;
    });

    return {
        requestRender: () => (needsRender = true),
    };
}
