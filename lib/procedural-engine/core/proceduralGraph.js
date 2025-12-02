const nodes = [];

export function addNode(type, params = {}) {
  const node = { id: `node_${Math.random().toString(36).slice(2, 8)}`, type, params };
  nodes.push(node);
  return node;
}

export function getGraph() {
  return nodes;
}
