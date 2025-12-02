export function createRig2D() {
  return {
    id: `rig2d_${Math.random().toString(36).slice(2, 8)}`,
    bones: [],
    constraints: [],
    ikChains: [],
  };
}

export function addBone(rig, bone) {
  return { ...rig, bones: [...rig.bones, bone] };
}
