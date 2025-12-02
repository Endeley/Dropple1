const cache = new Map();

export const getAsset = (key) => cache.get(key);
export const setAsset = (key, value) => cache.set(key, value);
export const clearAssets = () => cache.clear();
