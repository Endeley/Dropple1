"use client";

import { create } from "zustand";

export const useLayerSelectionStore = create((set) => ({
  selected: null,

  selectLayer(id) {
    set({ selected: { type: "layer", id } });
  },

  selectInstance(id) {
    set({ selected: { type: "instance", id } });
  },

  selectInstanceChild(instanceId, layerId) {
    set({ selected: { type: "instance-child", instanceId, layerId } });
  },

  selectTemplateSlot(instanceId, slotId) {
    set({ selected: { type: "template-slot", instanceId, slotId } });
  },

  clear() {
    set({ selected: null });
  },
}));
