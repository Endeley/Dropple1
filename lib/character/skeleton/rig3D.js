export function createRig3D() {
  return {
    id: `rig3d_${Math.random().toString(36).slice(2, 8)}`,
    skeleton: [],
    constraints: [],
    retarget: [],
  };
}

export function addJoint(rig, joint) {
  return { ...rig, skeleton: [...rig.skeleton, joint] };
}
