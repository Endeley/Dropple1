import { create } from "zustand";

export const useBrushSettings = create((set) => ({
  size: 40,
  hardness: 0.8,
  feather: 0.2,
  strength: 1,
  mode: "paint",
  setSize: (size) => set({ size }),
  setHardness: (hardness) => set({ hardness }),
  setFeather: (feather) => set({ feather }),
  setStrength: (strength) => set({ strength }),
  setMode: (mode) => set({ mode }),
}));
