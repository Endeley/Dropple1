"use client";

import { create } from "zustand";

const DEFAULT_DOCUMENT_NAME = "Untitled Document";

function generateId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function createBlankDocument(name = DEFAULT_DOCUMENT_NAME) {
  const id = generateId("doc");
  return {
    id,
    name,
    pages: [generateId("page")],
    layers: {},
    rootLayerIds: [],
    componentMasters: {},
    componentVariants: {},
    componentInstances: {},
    componentThumbnails: {},
    templates: {},
    templateInstances: {},
    assets: {},
    installedLibraries: [],
    settings: {
      canvasZoom: 1,
      canvasPan: { x: 0, y: 0 },
    },
  };
}

const emptyDocumentShape = {
  id: null,
  name: DEFAULT_DOCUMENT_NAME,
  pages: [],
  layers: {},
  rootLayerIds: [],
  componentMasters: {},
  componentVariants: {},
  componentInstances: {},
  componentThumbnails: {},
  templates: {},
  templateInstances: {},
  assets: {},
  installedLibraries: [],
  settings: {
    canvasZoom: 1,
    canvasPan: { x: 0, y: 0 },
  },
};

function mergeDocumentDefaults(doc) {
  if (!doc) return { ...emptyDocumentShape };
  return {
    ...emptyDocumentShape,
    ...doc,
    layers: doc.layers || {},
    rootLayerIds: doc.rootLayerIds || [],
    componentMasters: doc.componentMasters || {},
    componentVariants: doc.componentVariants || {},
    componentInstances: doc.componentInstances || {},
    componentThumbnails: doc.componentThumbnails || {},
    templates: doc.templates || {},
    templateInstances: doc.templateInstances || {},
    assets: doc.assets || {},
    installedLibraries: doc.installedLibraries || [],
    settings: {
      ...emptyDocumentShape.settings,
      ...(doc.settings || {}),
      canvasPan: {
        ...emptyDocumentShape.settings.canvasPan,
        ...((doc.settings && doc.settings.canvasPan) || {}),
      },
    },
  };
}

export const useDocumentStore = create((set, get) => ({
  documents: {},
  currentId: null,

  createDocument(name = DEFAULT_DOCUMENT_NAME) {
    const doc = createBlankDocument(name);
    set((state) => ({
      documents: { ...state.documents, [doc.id]: doc },
      currentId: doc.id,
    }));
    return doc.id;
  },

  loadDocument(id, data, options = {}) {
    if (!id || !data) return;
    const merged = mergeDocumentDefaults({ ...data, id });
    set((state) => {
      const documents = { ...state.documents, [merged.id]: merged };
      const shouldSetCurrent =
        options.setCurrent ||
        !state.currentId ||
        !(state.currentId in documents);
      return {
        documents,
        currentId: shouldSetCurrent ? merged.id : state.currentId,
      };
    });
  },

  setCurrent(id) {
    if (!get().documents[id]) return;
    set({ currentId: id });
  },

  getCurrent() {
    return mergeDocumentDefaults(get().documents[get().currentId]);
  },

  updateCurrentDocument(updater) {
    set((state) => {
      const { currentId, documents } = state;
      if (!currentId) return {};
      const currentDoc = documents[currentId];
      if (!currentDoc) return {};
      const updatedDoc = updater(mergeDocumentDefaults(currentDoc));
      if (!updatedDoc) return {};
      return {
        documents: {
          ...documents,
          [currentId]: mergeDocumentDefaults(updatedDoc),
        },
      };
    });
  },

  installLibrary(libraryId) {
    if (!libraryId) return;
    get().updateCurrentDocument((doc) => {
      if (doc.installedLibraries.includes(libraryId)) return doc;
      return {
        ...doc,
        installedLibraries: [...doc.installedLibraries, libraryId],
      };
    });
  },

  removeLibrary(libraryId) {
    if (!libraryId) return;
    get().updateCurrentDocument((doc) => ({
      ...doc,
      installedLibraries: doc.installedLibraries.filter((id) => id !== libraryId),
    }));
  },
}));

export function getCurrentDocumentSnapshot() {
  const state = useDocumentStore.getState();
  return mergeDocumentDefaults(state.documents[state.currentId]);
}

export function updateCurrentDocument(mutator) {
  useDocumentStore.getState().updateCurrentDocument(mutator);
}

export function createNewDocument(name) {
  return useDocumentStore.getState().createDocument(name);
}

export { createBlankDocument };
