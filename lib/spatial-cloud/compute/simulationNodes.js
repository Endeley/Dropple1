export function allocateSimulation(nodes = 1) {
  return { nodes, id: `sim_${Math.random().toString(36).slice(2, 8)}`, status: "allocated" };
}
