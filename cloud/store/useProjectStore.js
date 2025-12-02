import { create } from 'zustand';

export const useProjectStore = create((set) => ({
    project: null,
    updates: [],
    loading: false,

    setProject: (project) => set({ project }),
    addUpdate: (update) => set((state) => ({ updates: [...state.updates, update] })),
    setLoading: (loading) => set({ loading }),
}));
