"use client";

import { useDocumentStore, updateCurrentDocument } from "@/foundation/documents/documentStore";
import { createTemplateDefinition } from "./templateSchema";

const templateActions = {
  addTemplate(definition) {
    const template = createTemplateDefinition(definition || {});
    updateCurrentDocument((doc) => ({
      ...doc,
      templates: { ...doc.templates, [template.id]: template },
    }));
    return template.id;
  },

  updateTemplate(id, patch) {
    if (!id) return;
    updateCurrentDocument((doc) => {
      const target = doc.templates[id];
      if (!target) return doc;
      return {
        ...doc,
        templates: {
          ...doc.templates,
          [id]: { ...target, ...patch },
        },
      };
    });
  },

  removeTemplate(id) {
    if (!id) return;
    updateCurrentDocument((doc) => {
      if (!doc.templates[id]) return doc;
      const next = { ...doc.templates };
      delete next[id];
      return { ...doc, templates: next };
    });
  },
};

function selectTemplateState(doc) {
  return {
    templates: doc?.templates || {},
    ...templateActions,
  };
}

export function useTemplateStore(selector, equalityFn) {
  const select = selector ?? ((state) => state);
  return useDocumentStore(
    (state) => select(selectTemplateState(state.documents[state.currentId])),
    equalityFn
  );
}

useTemplateStore.getState = function getTemplateStoreState() {
  return selectTemplateState(useDocumentStore.getState().getCurrent());
};
