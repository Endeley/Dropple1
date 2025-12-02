export function pushProceduralVFX(vfx) {
  return { count: Array.isArray(vfx) ? vfx.length : 0, status: "queued" };
}
