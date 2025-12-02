import { create } from 'zustand';

export const useMarketplaceStore = create((set) => ({
    templates: [],
    categories: [],
    loading: false,
    filters: {
        category: 'all',
        query: '',
        pricing: 'all',
    },
    activeCategory: 'all',
    searchTerm: '',
    activeMode: 'all',

    setTemplates: (templates) => set({ templates }),
    setCategories: (categories) => set({ categories }),
    setLoading: (loading) => set({ loading }),
    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
        })),
    setCategory: (category) => set({ activeCategory: category }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setActiveMode: (mode) => set({ activeMode: mode }),
}));
