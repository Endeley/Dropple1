export function createKnowledgeGraph() {
  return {
    nodes: [],
    edges: [],
  };
}

export function addNode(graph, node) {
  return { ...graph, nodes: [...graph.nodes, node] };
}

export function addEdge(graph, from, relation, to) {
  return { ...graph, edges: [...graph.edges, { from, relation, to }] };
}
