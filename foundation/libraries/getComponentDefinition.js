"use client";

import { useMemo } from "react";
import { useDocumentStore } from "../documents/documentStore";
import { useLibraryStore } from "./libraryStore";

function resolveFromLibraries(installed, libraries, masterId) {
  for (const libId of installed || []) {
    const library = libraries[libId];
    if (!library) continue;
    const component = library.components?.[masterId];
    if (component) {
      const { variants = {}, ...master } = component;
      return {
        master,
        variants,
        source: { type: "library", libraryId: libId },
      };
    }
  }
  return null;
}

function buildDefinition(doc, libraries, masterId) {
  if (!doc) {
    return { master: null, variants: {}, source: null };
  }

  const localMaster = doc.componentMasters?.[masterId];
  if (localMaster) {
    return {
      master: localMaster,
      variants: doc.componentVariants?.[masterId] || {},
      source: { type: "document", documentId: doc.id },
    };
  }

  const libraryMatch = resolveFromLibraries(
    doc.installedLibraries || [],
    libraries,
    masterId
  );
  if (libraryMatch) return libraryMatch;

  return { master: null, variants: {}, source: null };
}

export function useComponentDefinition(masterId) {
  const docSlice = useDocumentStore((state) => {
    const doc = state.documents[state.currentId];
    if (!doc) {
      return {
        master: null,
        variants: {},
        installedLibraries: [],
      };
    }
    return {
      master: masterId ? doc.componentMasters?.[masterId] : null,
      variants: masterId ? doc.componentVariants?.[masterId] : {},
      installedLibraries: doc.installedLibraries || [],
      docId: doc.id,
    };
  });

  const libraries = useLibraryStore((state) => state.libraries);

  return useMemo(() => {
    if (!masterId) return { master: null, variants: {}, source: null };
    if (docSlice.master) {
      return {
        master: docSlice.master,
        variants: docSlice.variants || {},
        source: { type: "document", documentId: docSlice.docId },
      };
    }
    return buildDefinition(
      {
        id: docSlice.docId,
        componentMasters: {},
        componentVariants: {},
        installedLibraries: docSlice.installedLibraries,
      },
      libraries,
      masterId
    );
  }, [docSlice, libraries, masterId]);
}

export function getComponentDefinition(masterId) {
  const doc = useDocumentStore.getState().getCurrent();
  const libraries = useLibraryStore.getState().libraries;
  return buildDefinition(doc, libraries, masterId);
}
