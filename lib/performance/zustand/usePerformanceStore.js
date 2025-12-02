import { create } from 'zustand';

export const usePerformanceStore = create((set) => ({
    gpuMode: false,
    cacheHits: 0,
    cacheMisses: 0,

    setGpuMode: (gpuMode) => set({ gpuMode }),
    logCacheHit: () => set((state) => ({ cacheHits: state.cacheHits + 1 })),
    logCacheMiss: () => set((state) => ({ cacheMisses: state.cacheMisses + 1 })),
}));
