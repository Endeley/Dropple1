export function createPhysicsWorld2D({ gravity = [0, -9.81] } = {}) {
  return {
    type: "2D",
    gravity,
    bodies: [],
    constraints: [],
  };
}

export function stepWorld2D(world, dt = 1 / 60) {
  // Placeholder integrator for 2D world
  return { ...world, lastStep: dt };
}
