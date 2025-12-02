const materials = new Map();

export function createMaterial(name = "Material", pipeline = "pbr") {
  const mat = { id: `mat_${Math.random().toString(36).slice(2, 8)}`, name, pipeline, params: {} };
  materials.set(mat.id, mat);
  return mat;
}

export function listMaterials() {
  return Array.from(materials.values());
}
