import { useEffect } from "react";
import { useLayerSelectionStore } from "@/canvas/selection/layerSelectionStore";
import { useLayerStore } from "@/canvas/core/layerStore";

function hitTest() {
  return null;
}

export default function useSelectionManager() {
  const selectLayer = useLayerSelectionStore((state) => state.selectLayer);
  const selectInstance = useLayerSelectionStore((state) => state.selectInstance);
  const layers = useLayerStore((state) => state.layers);

  useEffect(() => {
    const handleDown = (event) => {
      const id = hitTest(event.detail.e);
      if (id) {
        const layer = layers[id];
        if (layer?.type === "componentInstance") {
          selectInstance(id);
        } else {
          selectLayer(id);
        }
      }
    };

    window.addEventListener("canvas:pointerDown", handleDown);
    return () => window.removeEventListener("canvas:pointerDown", handleDown);
  }, [selectLayer, selectInstance, layers]);
}
