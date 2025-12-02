import { create } from 'zustand';

export const useCreatorStore = create((set) => ({
    creator: null,
    templates: [],
    followers: 0,
    loading: false,

    setCreator: (creator) => set({ creator }),
    setTemplates: (templates) => set({ templates }),
    setFollowers: (followers) => set({ followers }),
    setLoading: (loading) => set({ loading }),
}));
