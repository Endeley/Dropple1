const worldMem = new Map();

export function rememberWorldEvent(worldId, event) {
  if (!worldMem.has(worldId)) worldMem.set(worldId, []);
  worldMem.get(worldId).push({ event, ts: Date.now() });
}

export function getWorldMemories(worldId) {
  return worldMem.get(worldId) || [];
}
