export function createStoryNode(title, data = {}) {
  return { id: `node_${Math.random().toString(36).slice(2, 8)}`, title, data };
}
