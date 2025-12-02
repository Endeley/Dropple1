"use client";

import { create } from "zustand";

export const useEditorMode = create((set, get) => ({
  mode: "canvas",
  masterId: null,
  masterStack: [],

  enterMasterMode(masterId, options = {}) {
    if (!masterId) return;
    set((state) => {
      const shouldReset =
        options.reset ||
        state.mode !== "component" ||
        state.masterStack.length === 0;

      const alreadyFocused =
        !shouldReset &&
        state.masterStack[state.masterStack.length - 1] === masterId;
      const nextStack = alreadyFocused
        ? state.masterStack
        : shouldReset
        ? [masterId]
        : [...state.masterStack, masterId];

      return {
        mode: "component",
        masterId,
        masterStack: nextStack,
      };
    });
  },

  exitMasterMode() {
    set((state) => {
      if (state.masterStack.length <= 1) {
        return {
          mode: "canvas",
          masterId: null,
          masterStack: [],
        };
      }

      const nextStack = state.masterStack.slice(0, -1);
      return {
        mode: "component",
        masterId: nextStack[nextStack.length - 1],
        masterStack: nextStack,
      };
    });
  },

  exitToCanvas() {
    set({
      mode: "canvas",
      masterId: null,
      masterStack: [],
    });
  },

  jumpToMasterIndex(index) {
    const { masterStack } = get();
    if (!masterStack.length) return;
    const safeIndex = Math.max(0, Math.min(index, masterStack.length - 1));
    const nextStack = masterStack.slice(0, safeIndex + 1);
    set({
      mode: "component",
      masterId: nextStack[nextStack.length - 1],
      masterStack: nextStack,
    });
  },
}));
