export function mergeState(local = {}, remote = {}) {
  return { ...local, ...remote, mergedAt: Date.now() };
}

export function newCRDTNode(payload = {}) {
  return { id: `crdt_${Math.random().toString(36).slice(2, 8)}`, payload };
}
