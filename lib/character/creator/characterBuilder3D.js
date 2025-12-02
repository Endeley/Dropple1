export function build3DCharacter({ name = "Avatar3D", bodyType = "humanoid" }) {
  return {
    id: `char3d_${Math.random().toString(36).slice(2, 8)}`,
    name,
    bodyType,
    rig: null,
    mesh: null,
    materials: [],
  };
}
