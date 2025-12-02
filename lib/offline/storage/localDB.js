const db = {
  projects: new Map(),
  assets: new Map(),
  states: new Map(),
};

export function saveProjectLocal(id, data) {
  db.projects.set(id, { data, savedAt: Date.now() });
  return id;
}

export function loadProjectLocal(id) {
  return db.projects.get(id) || null;
}

export function cacheAssetLocal(id, asset) {
  db.assets.set(id, { asset, cachedAt: Date.now() });
  return id;
}

export function getAssetLocal(id) {
  return db.assets.get(id) || null;
}
