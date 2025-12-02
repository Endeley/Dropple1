// Interaction graph scaffold — holds nodes and edges representing flows.
export const createInteractionGraph = () => ({
  nodes: [],
  edges: [],
});

export const addNode = (graph, node) => {
  graph.nodes.push(node);
  return node;
};

export const addEdge = (graph, from, to, condition = null) => {
  graph.edges.push({ from, to, condition });
  return { from, to, condition };
};
