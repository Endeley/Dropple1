"use client";

import { create } from "zustand";

export const useRulerState = create((set) => ({
  showRulers: true,
  showGuides: true,
  guides: [],
  toggleRulers: () => set((state) => ({ showRulers: !state.showRulers })),
  toggleGuides: () => set((state) => ({ showGuides: !state.showGuides })),
  addGuide: (guide) =>
    set((state) => ({ guides: [...state.guides, guide] })),
  removeGuide: (id) =>
    set((state) => ({ guides: state.guides.filter((g) => g.id !== id) })),
}));
