const eventMem = [];

export function logUniverseEvent(universeId, detail) {
  eventMem.push({ universeId, detail, ts: Date.now() });
}

export function getUniverseEvents(universeId) {
  return eventMem.filter((e) => e.universeId === universeId);
}
