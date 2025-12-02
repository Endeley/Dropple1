export function syncUniverseMemory(universeId, events = []) {
  return { universeId, events: events.length };
}
