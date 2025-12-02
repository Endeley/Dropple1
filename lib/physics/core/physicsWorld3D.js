export function createPhysicsWorld3D({ gravity = [0, -9.81, 0] } = {}) {
  return {
    type: "3D",
    gravity,
    bodies: [],
    constraints: [],
  };
}

export function stepWorld3D(world, dt = 1 / 60) {
  // Placeholder integrator for 3D world
  return { ...world, lastStep: dt };
}
