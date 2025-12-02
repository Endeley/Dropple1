export function createSphereGeometry({ radius = 0.5, widthSegments = 32, heightSegments = 16 } = {}) {
  return {
    type: "sphere",
    radius,
    widthSegments,
    heightSegments,
  };
}
