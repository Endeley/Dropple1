import { create } from 'zustand';

export const useLayersStore = create((set) => ({
    collapsedGroups: {},

    toggleGroup: (groupId) =>
        set((state) => ({
            collapsedGroups: {
                ...state.collapsedGroups,
                [groupId]: !state.collapsedGroups[groupId],
            },
        })),
}));
