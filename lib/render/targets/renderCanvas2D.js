export function renderCanvas2D({ scene, width, height }) {
  // Placeholder structure; real implementation would draw to HTMLCanvasElement.
  return {
    type: "canvas2d",
    width,
    height,
    nodes: scene,
    note: "Canvas2D render placeholder",
  };
}
