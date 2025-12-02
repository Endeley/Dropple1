"use client";

import { useLayerStore } from "@/canvas/core/layerStore";
import { setByPath } from "./setByPath";

export function updateLayerProp(layerId, path, value) {
  const layer = useLayerStore.getState().layers[layerId];
  if (!layer) return;

  const updated = structuredClone(layer);
  setByPath(updated, path, value);
  useLayerStore.getState().updateLayer(layerId, updated);
}
