import { create } from "zustand";

export const usePerformanceStore = create((set) => ({
  // Rendering
  useVirtualCanvas: true,
  useStaticLayerCache: true,
  useFastTransforms: true,

  // Workers
  useWebWorkers: true,
  usePreloadEngine: true,

  // Modes
  highPerformanceMode: true,
  lowMemoryMode: false,
  throttleAnimations: false,

  // Toggles
  toggleVirtualCanvas: () =>
    set((s) => ({ useVirtualCanvas: !s.useVirtualCanvas })),

  toggleStaticLayerCache: () =>
    set((s) => ({ useStaticLayerCache: !s.useStaticLayerCache })),

  toggleFastTransforms: () =>
    set((s) => ({ useFastTransforms: !s.useFastTransforms })),

  toggleWorkers: () => set((s) => ({ useWebWorkers: !s.useWebWorkers })),

  togglePreloadEngine: () =>
    set((s) => ({ usePreloadEngine: !s.usePreloadEngine })),

  toggleHighPerformanceMode: () =>
    set((s) => ({ highPerformanceMode: !s.highPerformanceMode })),

  toggleLowMemoryMode: () =>
    set((s) => ({ lowMemoryMode: !s.lowMemoryMode })),

  toggleThrottleAnimations: () =>
    set((s) => ({ throttleAnimations: !s.throttleAnimations })),
}));
