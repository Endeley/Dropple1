"use client";

import { useLayerStore } from "@/canvas/core/layerStore";
import { useComponentStore } from "./componentStore";

export function createComponentMaster(selectedIds = [], name = "Component") {
  if (!selectedIds.length) return null;

  const layers = useLayerStore.getState().layers;
  const masterLayers = {};
  const stack = [...selectedIds];

  while (stack.length > 0) {
    const id = stack.pop();
    const layer = layers[id];
    if (!layer) continue;

    masterLayers[id] = structuredClone(layer);
    if (layer.children?.length) {
      stack.push(...layer.children);
    }
  }

  const masterId = `comp_${crypto.randomUUID()}`;
  const master = {
    id: masterId,
    name,
    rootLayerIds: [...selectedIds],
    layers: masterLayers,
    createdAt: Date.now(),
  };

  useComponentStore.getState().addMaster(master);
  return masterId;
}
