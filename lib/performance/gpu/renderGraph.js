export function createRenderGraph() {
  return {
    nodes: [],
    connections: [],
  };
}

export function addRenderNode(graph, node) {
  return { ...graph, nodes: [...graph.nodes, node] };
}

export function connectRenderNodes(graph, from, to) {
  return { ...graph, connections: [...graph.connections, { from, to }] };
}
