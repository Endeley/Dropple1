const registry = new Map();

export function registerAgent(agent) {
  registry.set(agent.id, agent);
}

export function getAgent(id) {
  return registry.get(id);
}

export function unregisterAgent(id) {
  registry.delete(id);
}
