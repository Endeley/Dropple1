export function createPlaneGeometry({ width = 1, height = 1 } = {}) {
  return {
    type: "plane",
    width,
    height,
  };
}
