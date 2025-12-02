"use client";

import { create } from "zustand";

const sampleLibraries = {
  lib_demo: {
    id: "lib_demo",
    name: "Dropple UI Kit",
    version: "1.0.0",
    updatedAt: Date.now(),
    components: {
      lib_button_primary: {
        id: "lib_button_primary",
        name: "Button / Primary",
        rootLayerIds: ["lib_button_root"],
        layers: {
          lib_button_root: {
            id: "lib_button_root",
            type: "frame",
            x: 0,
            y: 0,
            width: 220,
            height: 64,
            opacity: 1,
            fills: [{ color: "#6F4BFF" }],
            strokes: [],
            strokeWidth: 0,
            cornerRadius: 14,
            children: ["lib_button_label"],
          },
          lib_button_label: {
            id: "lib_button_label",
            type: "text",
            x: 20,
            y: 20,
            width: 180,
            height: 24,
            text: "Primary Button",
            fontFamily: "Inter",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.2,
            textAlign: "left",
            fills: [{ color: "#ffffff" }],
            children: [],
          },
        },
        variants: {
          Secondary: {
            key: "Secondary",
            overrides: {
              "lib_button_root:fills[0].color": "#41415F",
              "lib_button_label:text": "Secondary Button",
            },
            createdAt: Date.now(),
          },
        },
      },
    },
  },
};

function normalizeLibrary(library) {
  if (!library) return null;
  return {
    id: library.id,
    name: library.name || "Untitled Library",
    version: library.version || "0.0.1",
    ownerId: library.ownerId || null,
    updatedAt: library.updatedAt || Date.now(),
    components: normalizeComponentMap(library.components || {}),
    tokens: library.tokens || {},
  };
}

function normalizeComponentMap(map) {
  if (!map) return {};
  return Object.entries(map).reduce((acc, [id, comp]) => {
    if (!comp) return acc;
    const { variants, ...rest } = comp;
    acc[id] = {
      ...rest,
      id: comp.id || id,
      name: comp.name || "Component",
      layers: comp.layers || {},
      rootLayerIds: comp.rootLayerIds || [],
      variants: variants || {},
    };
    return acc;
  }, {});
}

function normalizeLibraryMap(libraries) {
  return Object.entries(libraries || {}).reduce((acc, [id, lib]) => {
    const normalized = normalizeLibrary({ ...(lib || {}), id });
    if (normalized) acc[id] = normalized;
    return acc;
  }, {});
}

const initialLibraries = normalizeLibraryMap(sampleLibraries);

export const useLibraryStore = create((set, get) => ({
  libraries: initialLibraries,

  loadLibrary(id, data) {
    const normalized = normalizeLibrary({ ...(data || {}), id });
    if (!normalized) return;
    set((state) => ({
      libraries: { ...state.libraries, [id]: normalized },
    }));
  },

  updateLibrary(id, patch) {
    set((state) => {
      const current = state.libraries[id];
      if (!current) return {};
      const next = normalizeLibrary({
        ...current,
        ...patch,
        components: patch?.components
          ? normalizeComponentMap(patch.components)
          : current.components,
      });
      return {
        libraries: {
          ...state.libraries,
          [id]: next,
        },
      };
    });
  },

  removeLibrary(id) {
    set((state) => {
      if (!state.libraries[id]) return {};
      const next = { ...state.libraries };
      delete next[id];
      return { libraries: next };
    });
  },
}));

export function getLibraryById(id) {
  return useLibraryStore.getState().libraries[id] || null;
}

export function getLibraryComponent(masterId) {
  const { libraries } = useLibraryStore.getState();
  for (const lib of Object.values(libraries)) {
    if (lib.components?.[masterId]) {
      return { library: lib, component: lib.components[masterId] };
    }
  }
  return null;
}
