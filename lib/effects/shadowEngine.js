// Placeholder lighting engine; real projected shadows/reflections can replace this.
export function applyLightingToObject(obj, settings) {
    if (!obj) return;
    obj.lighting = { ...(obj.lighting || {}), ...(settings || {}) };
    obj.dirty = true;
    obj.canvas?.requestRenderAll?.();
}
