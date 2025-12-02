export function schedule(graph) {
  // Placeholder scheduler; real implementation would topologically sort and dispatch GPU passes.
  return {
    note: "VFX scheduler placeholder",
    nodes: graph.nodes.length,
    connections: graph.connections.length,
  };
}
