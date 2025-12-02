import { create } from 'zustand';

export const useRevisionStore = create((set) => ({
    revisionList: [],
    activeRevision: null,

    addRevision: (rev) =>
        set((state) => ({
            revisionList: [rev, ...state.revisionList],
        })),

    setActiveRevision: (id) => set({ activeRevision: id }),
}));
