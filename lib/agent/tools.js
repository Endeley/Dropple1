import { useLayersStore } from "@/lib/state/layers/useLayersStore";
import { useCanvasStore } from "@/lib/state/canvas/useCanvasStore";

export const tools = {
  addLayer: (layer) => {
    useLayersStore.getState()?.addLayer?.(layer);
  },
  removeLayer: (id) => {
    useLayersStore.getState()?.removeLayer?.(id);
  },
  updateLayer: (id, props) => {
    useLayersStore.getState()?.updateLayer?.(id, props);
  },
  autoLayout: () => {
    console.log("Auto layout placeholder");
  },
  selectLayer: (id) => {
    useLayersStore.getState()?.setActiveLayer?.(id);
    useCanvasStore.getState()?.selectLayer?.(id);
  },
};
