import { create } from "zustand";

export const useWorkspaceStore = create((set) => ({
  mode: "design",
  setMode: (mode) => set({ mode }),
  activeTool: "select",
  setActiveTool: (tool) => set({ activeTool: tool }),
}));
