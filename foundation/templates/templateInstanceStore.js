"use client";

import { useDocumentStore, updateCurrentDocument } from "@/foundation/documents/documentStore";

const templateInstanceActions = {
  createInstance(templateId, initialProps = {}) {
    if (!templateId) return null;
    const id = "tmpl_inst_" + (crypto?.randomUUID ? crypto.randomUUID() : Date.now());
    updateCurrentDocument((doc) => ({
      ...doc,
      templateInstances: {
        ...doc.templateInstances,
        [id]: {
          id,
          templateId,
          slotOverrides: {},
          props: initialProps,
        },
      },
    }));
    return id;
  },

  updateInstance(id, patch) {
    if (!id) return;
    updateCurrentDocument((doc) => {
      const current = doc.templateInstances[id];
      if (!current) return doc;
      return {
        ...doc,
        templateInstances: {
          ...doc.templateInstances,
          [id]: { ...current, ...patch },
        },
      };
    });
  },

  removeInstance(id) {
    if (!id) return;
    updateCurrentDocument((doc) => {
      if (!doc.templateInstances[id]) return doc;
      const next = { ...doc.templateInstances };
      delete next[id];
      return {
        ...doc,
        templateInstances: next,
      };
    });
  },

  updateSlotOverride(instanceId, slotId, value) {
    if (!instanceId || !slotId) return;
    updateCurrentDocument((doc) => {
      const target = doc.templateInstances[instanceId];
      if (!target) return doc;
      const key = `${slotId}:slot`;
      return {
        ...doc,
        templateInstances: {
          ...doc.templateInstances,
          [instanceId]: {
            ...target,
            slotOverrides: {
              ...target.slotOverrides,
              [key]: value,
            },
          },
        },
      };
    });
  },
};

function selectTemplateInstanceState(doc) {
  return {
    instances: doc?.templateInstances || {},
    ...templateInstanceActions,
  };
}

export function useTemplateInstanceStore(selector, equalityFn) {
  const select = selector ?? ((state) => state);
  return useDocumentStore(
    (state) => select(selectTemplateInstanceState(state.documents[state.currentId])),
    equalityFn
  );
}

useTemplateInstanceStore.getState = function getTemplateInstanceStoreState() {
  return selectTemplateInstanceState(useDocumentStore.getState().getCurrent());
};
