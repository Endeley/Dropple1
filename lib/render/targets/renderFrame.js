export function renderFrame({ scene, width, height, frame = 0 }) {
  return {
    type: "frame",
    width,
    height,
    frame,
    nodes: scene,
    note: "Video frame render placeholder",
  };
}
