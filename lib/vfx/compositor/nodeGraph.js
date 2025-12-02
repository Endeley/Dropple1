export function createNodeGraph() {
  return {
    nodes: [],
    connections: [],
  };
}

export function addNode(graph, node) {
  return { ...graph, nodes: [...graph.nodes, node] };
}

export function connectNodes(graph, from, to) {
  return { ...graph, connections: [...graph.connections, { from, to }] };
}
