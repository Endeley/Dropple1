"use client";

import { useDocumentStore, updateCurrentDocument } from "@/foundation/documents/documentStore";

const componentActions = {
  addMaster(master) {
    updateCurrentDocument((doc) => ({
      ...doc,
      componentMasters: { ...doc.componentMasters, [master.id]: master },
    }));
  },

  updateMaster(masterId, patch) {
    updateCurrentDocument((doc) => {
      const current = doc.componentMasters[masterId];
      if (!current) return doc;
      return {
        ...doc,
        componentMasters: {
          ...doc.componentMasters,
          [masterId]: { ...current, ...patch },
        },
      };
    });
  },

  removeMaster(masterId) {
    updateCurrentDocument((doc) => {
      if (!doc.componentMasters[masterId]) return doc;
      const next = { ...doc.componentMasters };
      delete next[masterId];
      return {
        ...doc,
        componentMasters: next,
      };
    });
  },

  addVariant(masterId, variantKey, variantDef) {
    updateCurrentDocument((doc) => ({
      ...doc,
      componentVariants: {
        ...doc.componentVariants,
        [masterId]: {
          ...(doc.componentVariants[masterId] || {}),
          [variantKey]: variantDef,
        },
      },
    }));
  },

  updateVariant(masterId, variantKey, patch) {
    updateCurrentDocument((doc) => {
      const targetVariant =
        doc.componentVariants[masterId]?.[variantKey];
      if (!targetVariant) return doc;
      return {
        ...doc,
        componentVariants: {
          ...doc.componentVariants,
          [masterId]: {
            ...(doc.componentVariants[masterId] || {}),
            [variantKey]: {
              ...targetVariant,
              ...patch,
            },
          },
        },
      };
    });
  },

  addInstance(instance) {
    updateCurrentDocument((doc) => ({
      ...doc,
      componentInstances: {
        ...doc.componentInstances,
        [instance.id]: instance,
      },
    }));
  },

  updateInstance(instanceId, patch) {
    updateCurrentDocument((doc) => {
      const current = doc.componentInstances[instanceId];
      if (!current) return doc;
      return {
        ...doc,
        componentInstances: {
          ...doc.componentInstances,
          [instanceId]: { ...current, ...patch },
        },
      };
    });
  },

  removeInstance(instanceId) {
    updateCurrentDocument((doc) => {
      if (!doc.componentInstances[instanceId]) return doc;
      const next = { ...doc.componentInstances };
      delete next[instanceId];
      return {
        ...doc,
        componentInstances: next,
      };
    });
  },

  setThumbnail(masterId, dataUrl) {
    updateCurrentDocument((doc) => ({
      ...doc,
      componentThumbnails: {
        ...doc.componentThumbnails,
        [masterId]: dataUrl,
      },
    }));
  },
};

function selectComponentState(doc) {
  return {
    masters: doc?.componentMasters || {},
    variants: doc?.componentVariants || {},
    instances: doc?.componentInstances || {},
    thumbnails: doc?.componentThumbnails || {},
    ...componentActions,
  };
}

export function useComponentStore(selector, equalityFn) {
  const select = selector ?? ((state) => state);
  return useDocumentStore(
    (state) => select(selectComponentState(state.documents[state.currentId])),
    equalityFn
  );
}

useComponentStore.getState = function getComponentStoreState() {
  return selectComponentState(useDocumentStore.getState().getCurrent());
};
