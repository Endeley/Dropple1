import * as PIXI from 'pixi.js';

/**
 * Creates GPU-accelerated rendering layers
 * similar to Figma's internal pipeline.
 *
 * Background → Effects → Objects → UI
 */
export default function createPixiLayers(app) {
    const layers = {
        background: new PIXI.Container(), // Mesh gradients, textures, AI BG
        shadows: new PIXI.Container(), // Drop shadows, glows
        objects: new PIXI.Container(), // Fabric-based objects mirrored to Pixi
        overlays: new PIXI.Container(), // Guides, selection, transform boxes
    };

    // Enable z-index sorting
    layers.background.zIndex = 0;
    layers.shadows.zIndex = 1;
    layers.objects.zIndex = 2;
    layers.overlays.zIndex = 3;

    app.stage.addChild(layers.background, layers.shadows, layers.objects, layers.overlays);

    return layers;
}
