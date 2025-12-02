export function createPBRMaterial({
  albedo = [1, 1, 1, 1],
  metalness = 0.0,
  roughness = 0.5,
  emissive = [0, 0, 0],
  normalMap = null,
  emissiveMap = null,
  roughnessMap = null,
  metalnessMap = null,
} = {}) {
  return {
    type: "pbr",
    albedo,
    metalness,
    roughness,
    emissive,
    normalMap,
    emissiveMap,
    roughnessMap,
    metalnessMap,
  };
}
