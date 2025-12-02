"use client";

import { create } from "zustand";

export const useCanvasPanState = create((set) => ({
  x: 0,
  y: 0,
  setPan: (x, y) => set({ x, y }),
  resetPan: () => set({ x: 0, y: 0 }),
}));
