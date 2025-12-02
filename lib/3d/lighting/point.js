export function createPointLight({ color = [1, 1, 1], intensity = 1, position = [0, 1, 0], range = 10 } = {}) {
  return {
    id: `light_${Math.random().toString(36).slice(2, 8)}`,
    type: "point",
    color,
    intensity,
    position,
    range,
  };
}
