export function createEmissiveMaterial({ color = [1, 0.5, 1], intensity = 1.5 } = {}) {
  return {
    type: "emissive",
    color,
    intensity,
  };
}
