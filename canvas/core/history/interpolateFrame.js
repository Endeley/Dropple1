"use client";

export function interpolateFrame(a, b, t) {
  if (!a || !b) return a || b || null;
  return {
    x: lerp(a.x ?? 0, b.x ?? 0, t),
    y: lerp(a.y ?? 0, b.y ?? 0, t),
    width: lerp(a.width ?? 0, b.width ?? 0, t),
    height: lerp(a.height ?? 0, b.height ?? 0, t),
    rotation: lerp(a.rotation ?? 0, b.rotation ?? 0, t),
    opacity: lerp(a.opacity ?? 1, b.opacity ?? 1, t),
  };
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}
