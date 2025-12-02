export function syncUniverseState(universeId, state = {}) {
  return { universeId, synced: true, stateVersion: Date.now() };
}
