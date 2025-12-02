export function createSyncEngine() {
  return {
    entities: new Map(),
    version: 0,
  };
}

export function registerEntity(sync, id, data) {
  const next = new Map(sync.entities);
  next.set(id, data);
  return { ...sync, entities: next };
}

export function applyUpdate(sync, id, patch) {
  const next = new Map(sync.entities);
  const existing = next.get(id) || {};
  next.set(id, { ...existing, ...patch, _v: (existing._v || 0) + 1 });
  return { ...sync, entities: next, version: sync.version + 1 };
}
