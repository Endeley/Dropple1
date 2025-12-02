import { create } from "zustand";

export const useWorkspaceUIStore = create((set) => ({
  // Slideouts: 'assets' | 'filters' | 'effects' | null
  activeLeftSlideout: null,
  activeRightSlideout: null,
  leftHoveringTrigger: false,
  leftHoveringSlideout: false,
  rightHoveringTrigger: false,
  rightHoveringSlideout: false,

  // Popouts: 'export' | 'bgremove' | 'replace' | 'cropconfirm' | null
  activeModal: null,

  // ACTIONS
  openLeft: (id) => set({ activeLeftSlideout: id }),
  closeLeft: () => set({ activeLeftSlideout: null }),
  setLeftHoveringTrigger: (hovering) => set({ leftHoveringTrigger: !!hovering }),
  setLeftHoveringSlideout: (hovering) => set({ leftHoveringSlideout: !!hovering }),
  setRightHoveringTrigger: (hovering) => set({ rightHoveringTrigger: !!hovering }),

  openRight: (id) => set({ activeRightSlideout: id }),
  closeRight: () => set({ activeRightSlideout: null }),
  setRightHoveringSlideout: (hovering) => set({ rightHoveringSlideout: !!hovering }),

  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
