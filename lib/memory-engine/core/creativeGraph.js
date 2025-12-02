const graph = [];

export function addGraphLink(a, b, type = "link") {
  graph.push({ a, b, type });
}

export function getGraph() {
  return graph;
}
