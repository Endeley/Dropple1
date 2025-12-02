const cache = new Map();

export function cacheAsset(key, value) {
  cache.set(key, value);
  return value;
}

export function getCachedAsset(key) {
  return cache.get(key);
}

export function clearAssetCache() {
  cache.clear();
}
