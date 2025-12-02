import * as fabric from 'fabric';

// Lightweight material tagger. Rendering remains default to avoid regressions;
// materials can be expanded with custom shader passes later.
const originalRender = fabric.Object.prototype._render;

function ensureMaterial(obj) {
    if (!obj.material) {
        obj.material = { type: 'none', options: {} };
    }
}

export function applyMaterialShader(obj, type = 'none', options = {}) {
    if (!obj) return;
    ensureMaterial(obj);
    obj.material.type = type;
    obj.material.options = options;
    obj.dirty = true;
    obj.canvas?.requestRenderAll?.();
}

fabric.Object.prototype._render = function materialRender(ctx) {
    // If a custom material is set, keep the hook for future shader pipeline.
    // For now, fall back to normal rendering to stay stable.
    return originalRender.call(this, ctx);
};
