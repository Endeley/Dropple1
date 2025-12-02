"use client";

import { create } from "zustand";

export const useComponentLibraryUI = create((set) => ({
  isOpen: true,
  search: "",
  selectedCategory: "all",
  setSearch: (search) => set({ search }),
  setCategory: (selectedCategory) => set({ selectedCategory }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
