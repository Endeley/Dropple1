"use client";

import { create } from "zustand";

export const useCanvasZoomState = create((set) => ({
  zoom: 1,
  minZoom: 0.2,
  maxZoom: 4,
  setZoom: (value) =>
    set((state) => ({
      zoom: Math.min(state.maxZoom, Math.max(state.minZoom, value)),
    })),
  zoomIn: () =>
    set((state) => ({
      zoom: Math.min(state.zoom * 1.1, state.maxZoom),
    })),
  zoomOut: () =>
    set((state) => ({
      zoom: Math.max(state.zoom * 0.9, state.minZoom),
    })),
  resetZoom: () => set({ zoom: 1 }),
}));
