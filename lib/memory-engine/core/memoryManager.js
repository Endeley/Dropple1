const store = {
  episodic: [],
  semantic: new Map(),
  procedural: [],
  preference: new Map(),
  graph: [],
};

export function saveEpisodic(event) {
  store.episodic.push({ ...event, ts: Date.now() });
}

export function saveSemantic(key, value) {
  store.semantic.set(key, value);
}

export function saveProcedural(action) {
  store.procedural.push({ action, ts: Date.now() });
}

export function savePreference(key, value) {
  store.preference.set(key, value);
}

export function getMemorySnapshot() {
  return {
    episodic: store.episodic.slice(-20),
    semantic: Array.from(store.semantic.entries()),
    procedural: store.procedural.slice(-20),
    preference: Array.from(store.preference.entries()),
    graph: store.graph,
  };
}
