"use client";

import { create } from "zustand";

export const useSnapState = create((set) => ({
  enabled: true,
  threshold: 6,
  showGuides: true,
  toggleSnap: () => set((state) => ({ enabled: !state.enabled })),
  toggleGuides: () => set((state) => ({ showGuides: !state.showGuides })),
}));
