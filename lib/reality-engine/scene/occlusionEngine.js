export function computeOcclusion(realMesh = {}, virtualObjects = []) {
  return { occluded: virtualObjects.length, mesh: !!realMesh };
}
