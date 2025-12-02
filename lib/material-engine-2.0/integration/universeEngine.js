export function syncMaterialCanon(universeId, material) {
  return { universeId, materialId: material.id, synced: true };
}
