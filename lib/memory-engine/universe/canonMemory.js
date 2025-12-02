const canon = new Map();

export function setCanon(universeId, key, value) {
  if (!canon.has(universeId)) canon.set(universeId, new Map());
  canon.get(universeId).set(key, value);
}

export function getCanon(universeId, key) {
  return canon.get(universeId)?.get(key);
}
