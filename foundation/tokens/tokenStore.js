"use client";

import { create } from "zustand";
import { defaultTokens } from "./defaultTokens";

export const useTokenStore = create((set, get) => ({
  tokens: { ...defaultTokens },
  themes: {
    default: {},
  },
  activeTheme: "default",

  loadTokens(tokenMap = {}) {
    set({ tokens: { ...tokenMap } });
  },

  addToken(token) {
    set((state) => ({
      tokens: { ...state.tokens, [token.id]: token },
    }));
  },

  updateToken(id, patch) {
    set((state) => ({
      tokens: {
        ...state.tokens,
        [id]: { ...state.tokens[id], ...patch },
      },
    }));
  },

  removeToken(id) {
    set((state) => {
      if (!state.tokens[id]) return state;
      const next = { ...state.tokens };
      delete next[id];
      return { tokens: next };
    });
  },

  addTheme(name, values = {}) {
    if (!name) return;
    set((state) => ({
      themes: { ...state.themes, [name]: { ...(state.themes[name] || {}), ...values } },
    }));
  },

  updateTheme(name, values = {}) {
    if (!name) return;
    set((state) => ({
      themes: {
        ...state.themes,
        [name]: { ...(state.themes[name] || {}), ...values },
      },
    }));
  },

  removeTheme(name) {
    if (!name || name === "default") return;
    set((state) => {
      const next = { ...state.themes };
      delete next[name];
      const activeTheme = state.activeTheme === name ? "default" : state.activeTheme;
      return { themes: next, activeTheme };
    });
  },

  setActiveTheme(name) {
    if (!name) return;
    set((state) => ({
      activeTheme: state.themes[name] ? name : state.activeTheme,
    }));
  },

  getActiveThemeValues() {
    const { themes, activeTheme } = get();
    return themes[activeTheme] ?? {};
  },
}));
