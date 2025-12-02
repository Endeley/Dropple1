"use client";

import { useDocumentStore, updateCurrentDocument } from "@/foundation/documents/documentStore";

const layerActions = {
  addLayer(layer) {
    updateCurrentDocument((doc) => {
      const rootLayerIds =
        layer.parentId == null
          ? [...doc.rootLayerIds, layer.id]
          : doc.rootLayerIds;

      return {
        ...doc,
        layers: { ...doc.layers, [layer.id]: layer },
        rootLayerIds,
      };
    });
  },

  updateLayer(id, patch) {
    updateCurrentDocument((doc) => {
      const target = doc.layers[id];
      if (!target) return doc;
      return {
        ...doc,
        layers: {
          ...doc.layers,
          [id]: { ...target, ...patch },
        },
      };
    });
  },

  removeLayer(id) {
    updateCurrentDocument((doc) => {
      if (!doc.layers[id]) return doc;
      const nextLayers = { ...doc.layers };
      delete nextLayers[id];
      return {
        ...doc,
        layers: nextLayers,
        rootLayerIds: doc.rootLayerIds.filter((rootId) => rootId !== id),
      };
    });
  },

  addChild(parentId, childId) {
    updateCurrentDocument((doc) => {
      const parent = doc.layers[parentId];
      if (!parent) return doc;
      return {
        ...doc,
        layers: {
          ...doc.layers,
          [parentId]: {
            ...parent,
            children: [...(parent.children || []), childId],
          },
        },
      };
    });
  },

  removeChild(parentId, childId) {
    updateCurrentDocument((doc) => {
      const parent = doc.layers[parentId];
      if (!parent) return doc;
      return {
        ...doc,
        layers: {
          ...doc.layers,
          [parentId]: {
            ...parent,
            children: (parent.children || []).filter((id) => id !== childId),
          },
        },
      };
    });
  },

  getLayerTree() {
    const doc = useDocumentStore.getState().getCurrent();
    const { layers = {}, rootLayerIds = [] } = doc || {};

    const buildNode = (id) => {
      const node = layers[id];
      if (!node) return null;
      return {
        ...node,
        children: (node.children || []).map(buildNode).filter(Boolean),
      };
    };

    return rootLayerIds.map(buildNode).filter(Boolean);
  },
};

function selectLayerState(doc) {
  return {
    layers: doc?.layers || {},
    rootIds: doc?.rootLayerIds || [],
    ...layerActions,
  };
}

export function useLayerStore(selector, equalityFn) {
  const select = selector ?? ((state) => state);
  return useDocumentStore(
    (state) => select(selectLayerState(state.documents[state.currentId])),
    equalityFn
  );
}

useLayerStore.getState = function getLayerStoreState() {
  return selectLayerState(useDocumentStore.getState().getCurrent());
};
