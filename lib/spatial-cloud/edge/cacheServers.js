export function cacheState(key, value) {
  return { key, cached: true, size: JSON.stringify(value).length };
}
