const storage = new Map();

export function saveWorldState(worldId, state = {}) {
  storage.set(worldId, { state, ts: Date.now() });
  return true;
}

export function loadWorldState(worldId) {
  return storage.get(worldId) || null;
}
