export function inferWorldTone(state = {}) {
  const has3D = (state.layers || []).some((l) => l.type === "3d");
  return has3D ? "cinematic" : "2d_flat";
}
