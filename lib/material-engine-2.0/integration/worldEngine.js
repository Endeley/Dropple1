export function sendMaterialToWorld(worldId, material) {
  return { worldId, materialId: material.id, status: "applied" };
}
