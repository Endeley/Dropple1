export function renderWebGL({ scene, width, height }) {
  return {
    type: "webgl",
    width,
    height,
    nodes: scene,
    note: "WebGL render placeholder (GPU path)",
  };
}
