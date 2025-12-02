const store = new Map();

export function saveUniverse(universeId, payload = {}) {
  store.set(universeId, { payload, ts: Date.now() });
  return true;
}

export function loadUniverse(universeId) {
  return store.get(universeId) || null;
}
