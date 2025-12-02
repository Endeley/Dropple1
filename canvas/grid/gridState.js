"use client";

import { create } from "zustand";

export const useGridState = create((set) => ({
  enabled: true,
  snapToGrid: false,
  size: 16,
  color: "rgba(120,120,120,0.25)",
  type: "dot",
  toggle: () => set((state) => ({ enabled: !state.enabled })),
  toggleSnap: () => set((state) => ({ snapToGrid: !state.snapToGrid })),
  setSize: (size) => set({ size }),
  setColor: (color) => set({ color }),
  setType: (type) => set({ type }),
}));
