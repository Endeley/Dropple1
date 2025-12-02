import { create } from 'zustand';

export const useUIStore = create((set) => ({
    leftSidebarOpen: true,
    rightSidebarOpen: true,
    bottomBarOpen: true,
    currentMode: 'design',

    toggleLeftSidebar: () => set((state) => ({ leftSidebarOpen: !state.leftSidebarOpen })),
    toggleRightSidebar: () => set((state) => ({ rightSidebarOpen: !state.rightSidebarOpen })),
    toggleBottomBar: () => set((state) => ({ bottomBarOpen: !state.bottomBarOpen })),
    setMode: (mode) => set({ currentMode: mode }),
}));
