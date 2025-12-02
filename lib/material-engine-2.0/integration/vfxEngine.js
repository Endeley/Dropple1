export function bindMaterialToVFX(material, vfxId) {
  return { materialId: material.id, vfxId, status: "bound" };
}
