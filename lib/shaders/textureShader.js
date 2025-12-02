import * as fabric from 'fabric';

// Lightweight texture scaffold: tags objects with texture settings and keeps
// rendering stable (no GLSL yet). Future work can swap in WebGL/offscreen passes.
const originalRender = fabric.Object.prototype._render;

function ensureTexture(obj) {
    if (!obj.texture) {
        obj.texture = {
            enabled: false,
            type: 'grain',
            intensity: 0.3,
            scale: 1,
            color: '#000000',
            blendMode: 'multiply',
        };
    }
}

export function applyTexture(obj, texture) {
    if (!obj) return;
    ensureTexture(obj);
    obj.texture = { ...obj.texture, ...(texture || {}) };
    obj.dirty = true;
    obj.canvas?.requestRenderAll?.();
}

fabric.Object.prototype._render = function textureRender(ctx) {
    ensureTexture(this);
    // Render object normally (no shader yet to avoid breaking pipeline).
    originalRender.call(this, ctx);
    // A future texture pass would draw into offscreen and composite here.
};
