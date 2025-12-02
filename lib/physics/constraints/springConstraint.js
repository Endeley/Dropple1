export function createSpringConstraint({ bodyA, bodyB, restLength = 1, stiffness = 50, damping = 2 }) {
  return {
    id: `spring_${Math.random().toString(36).slice(2, 8)}`,
    bodyA,
    bodyB,
    restLength,
    stiffness,
    damping,
  };
}
