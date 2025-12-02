import { create } from 'zustand';

export const useAssetsStore = create((set, get) => ({
    assets: [],
    addAsset: (asset) => set((state) => ({ assets: [...state.assets, asset] })),
    deleteAsset: (id) => set((state) => ({ assets: state.assets.filter((asset) => asset.id !== id) })),
    getAsset: (id) => get().assets.find((asset) => asset.id === id),
}));
