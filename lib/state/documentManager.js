const listeners = new Set();

const state = {
  activeDocumentId: null,
  documents: {},
};

const randomId = (prefix = "doc") => `${prefix}_${Math.random().toString(36).slice(2, 8)}`;

function notify() {
  listeners.forEach((fn) => {
    try {
      fn(getState());
    } catch {
      /* noop */
    }
  });
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getState() {
  return { ...state, documents: { ...state.documents } };
}

export function getDocument(id) {
  return state.documents[id] || null;
}

export function getActiveDocument() {
  return state.documents[state.activeDocumentId] || null;
}

export function setActiveDocument(id) {
  if (!state.documents[id]) return null;
  state.activeDocumentId = id;
  notify();
  return state.documents[id];
}

export function newDocument(payload = {}) {
  const id = payload.id || randomId();
  const name = payload.name || "Untitled";
  const now = Date.now();
  const doc = {
    id,
    name,
    path: payload.path || null,
    dirty: true,
    lastSaved: null,
    createdAt: now,
    updatedAt: now,
    model: payload.model || {
      document: {},
      layers: [],
      styles: {},
      themes: {},
      tokens: {},
      assets: {},
      history: [],
      pages: [],
      plugins: {},
    },
    uiState: payload.uiState || {
      zoom: 1,
      pan: { x: 0, y: 0 },
      selection: [],
      pageId: null,
    },
  };
  state.documents[id] = doc;
  state.activeDocumentId = id;
  notify();
  return doc;
}

export async function importFromDRPL(buffer, loaders) {
  const { loadDRPL } = loaders || {};
  if (!loadDRPL) throw new Error("loadDRPL helper required");
  const result = await loadDRPL(buffer);
  const doc = newDocument({
    name: result?.document?.title || "Imported",
    model: {
      document: result.document,
      layers: result.layers,
      styles: result.styles,
      themes: result.themes,
      tokens: result.tokens,
      assets: result.assets,
      history: result.history,
      plugins: result.plugins,
    },
  });
  doc.dirty = false;
  doc.lastSaved = Date.now();
  notify();
  return doc;
}

export async function exportToDRPL(id, savers) {
  const doc = getDocument(id);
  if (!doc) throw new Error("Document not found");
  const { saveDRPL } = savers || {};
  if (!saveDRPL) throw new Error("saveDRPL helper required");

  const blob = await saveDRPL({
    document: doc.model.document,
    layers: doc.model.layers,
    styles: doc.model.styles,
    themes: doc.model.themes,
    tokens: doc.model.tokens,
    history: doc.model.history,
    plugins: doc.model.plugins,
    assets: doc.model.assets,
  });

  doc.dirty = false;
  doc.lastSaved = Date.now();
  notify();
  return blob;
}

export function updateDocument(id, updater) {
  const doc = getDocument(id);
  if (!doc) return null;
  const updated = typeof updater === "function" ? updater(doc) : { ...doc, ...updater };
  state.documents[id] = {
    ...doc,
    ...updated,
    dirty: true,
    updatedAt: Date.now(),
  };
  notify();
  return state.documents[id];
}

export function renameDocument(id, name) {
  return updateDocument(id, { name });
}

export function closeDocument(id) {
  if (!state.documents[id]) return;
  delete state.documents[id];
  if (state.activeDocumentId === id) {
    const first = Object.keys(state.documents)[0] || null;
    state.activeDocumentId = first;
  }
  notify();
}

export function duplicateDocument(id) {
  const doc = getDocument(id);
  if (!doc) return null;
  const copy = JSON.parse(JSON.stringify(doc));
  copy.id = randomId();
  copy.name = `${doc.name} Copy`;
  copy.dirty = true;
  state.documents[copy.id] = copy;
  state.activeDocumentId = copy.id;
  notify();
  return copy;
}

export function markDirty(id) {
  const doc = getDocument(id);
  if (!doc) return null;
  doc.dirty = true;
  doc.updatedAt = Date.now();
  state.documents[id] = doc;
  notify();
  return doc;
}

export function markSaved(id) {
  const doc = getDocument(id);
  if (!doc) return null;
  doc.dirty = false;
  doc.lastSaved = Date.now();
  state.documents[id] = doc;
  notify();
  return doc;
}
