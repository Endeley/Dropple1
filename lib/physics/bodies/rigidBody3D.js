export function createRigidBody3D({ shape = "box", mass = 1, position = [0, 0, 0], velocity = [0, 0, 0], restitution = 0.2, friction = 0.5 }) {
  return {
    id: `rb3d_${Math.random().toString(36).slice(2, 8)}`,
    shape,
    mass,
    position,
    velocity,
    restitution,
    friction,
  };
}
