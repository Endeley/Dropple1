"use client";

import { useLayerStore } from "@/canvas/core/layerStore";
import { useComponentStore } from "./componentStore";
import { createLayer } from "@/canvas/core/createLayer";
import { LayerType } from "@/canvas/core/layerTypes";
import { getComponentDefinition } from "@/foundation/libraries/getComponentDefinition";

export function createComponentInstance(masterId, position = { x: 100, y: 100 }) {
  const { master, variants } = getComponentDefinition(masterId);
  if (!master) return null;

  const variantKeys = Object.keys(variants || {});
  const defaultVariant = variantKeys[0] || "Default";

  const instanceId = `inst_${crypto.randomUUID()}`;

  const instanceLayer = createLayer({
    id: instanceId,
    type: LayerType.COMPONENT_INSTANCE,
    x: position.x,
    y: position.y,
    width: 200,
    height: 100,
    masterId,
    variant: defaultVariant,
    overrides: {},
  });

  useLayerStore.getState().addLayer(instanceLayer);
  useComponentStore.getState().addInstance({
    id: instanceId,
    masterId,
    overrides: {},
    variant: defaultVariant,
  });

  return instanceId;
}
