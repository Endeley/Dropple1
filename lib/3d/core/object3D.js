export function createObject3D({ type = "Mesh", geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) {
  return {
    id: `obj_${Math.random().toString(36).slice(2, 8)}`,
    type,
    geometry: geometry || null,
    material: material || null,
    position,
    rotation,
    scale,
    children: [],
  };
}

export function addChild(obj, child) {
  return { ...obj, children: [...(obj.children || []), child] };
}
