"use client";

export function springValue({
  from = 0,
  to = 0,
  velocity = 0,
  stiffness = 300,
  damping = 22,
  mass = 1,
  dt = 1 / 60,
}) {
  const k = stiffness;
  const c = damping;

  const displacement = from - to;
  const force = -k * displacement;
  const accel = force / mass;

  velocity += accel * dt;
  velocity *= 1 - c * dt * 0.01;

  const value = from + velocity * dt;

  return { value, velocity };
}
