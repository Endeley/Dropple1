"use client";

import { create } from "zustand";
import { createBrandKit } from "./brandSchema";

const defaultKit = createBrandKit({
  id: "brand_default",
  name: "Default Brand",
  colors: {
    primary: "#6C4BFF",
    secondary: "#EEAE7B",
    accent: "#42C1AD",
    neutral: "#1F1F2B",
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  style: "rounded",
});

export const useBrandKitStore = create((set, get) => ({
  kits: { [defaultKit.id]: defaultKit },
  activeKitId: defaultKit.id,

  createBrandKit(data) {
    const kit = createBrandKit(data || {});
    set((state) => ({
      kits: { ...state.kits, [kit.id]: kit },
      activeKitId: kit.id,
    }));
    return kit.id;
  },

  updateBrandKit(id, patch = {}) {
    set((state) => {
      const target = state.kits[id];
      if (!target) return state;
      return {
        kits: {
          ...state.kits,
          [id]: {
            ...target,
            ...patch,
            colors: patch.colors ? { ...target.colors, ...patch.colors } : target.colors,
            fonts: patch.fonts ? { ...target.fonts, ...patch.fonts } : target.fonts,
          },
        },
      };
    });
  },

  removeBrandKit(id) {
    if (!id || id === "brand_default") return;
    set((state) => {
      if (!state.kits[id]) return state;
      const next = { ...state.kits };
      delete next[id];
      const nextActive =
        state.activeKitId === id ? Object.keys(next)[0] || null : state.activeKitId;
      return {
        kits: next,
        activeKitId: nextActive,
      };
    });
  },

  setActiveBrandKit(id) {
    set((state) => ({
      activeKitId: state.kits[id] ? id : state.activeKitId,
    }));
  },

  getActive() {
    const state = get();
    return state.kits[state.activeKitId] ?? null;
  },
}));
