export function createGlassMaterial({ color = [1, 1, 1], ior = 1.45, roughness = 0.05, transmission = 0.9 } = {}) {
  return {
    type: "glass",
    color,
    ior,
    roughness,
    transmission,
  };
}
