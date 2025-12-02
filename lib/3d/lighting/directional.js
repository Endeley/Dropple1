export function createDirectionalLight({ color = [1, 1, 1], intensity = 1, direction = [0, -1, 0] } = {}) {
  return {
    id: `light_${Math.random().toString(36).slice(2, 8)}`,
    type: "directional",
    color,
    intensity,
    direction,
  };
}
