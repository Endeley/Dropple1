export function simulateEco(world = {}) {
  return { worldId: world.id || "unknown", status: "simulated" };
}
