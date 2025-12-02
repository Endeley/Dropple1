export function createBoxGeometry({ width = 1, height = 1, depth = 1 } = {}) {
  return {
    type: "box",
    width,
    height,
    depth,
  };
}
