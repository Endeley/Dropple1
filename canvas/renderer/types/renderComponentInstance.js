"use client";

import { useComponentStore } from "@/canvas/components/componentStore";
import { resolveInstance } from "@/canvas/components/resolveInstance";
import { renderLayerTree } from "../renderLayerTree";
import { getComponentDefinition } from "@/foundation/libraries/getComponentDefinition";

export function renderComponentInstance(ctx, instanceLayer) {
  const { instances } = useComponentStore.getState();
  const fallbackInstance = instanceLayer?.masterId
    ? {
        id: instanceLayer.id,
        masterId: instanceLayer.masterId,
        overrides: instanceLayer.overrides || {},
        variant: instanceLayer.variant || "Default",
      }
    : null;

  const instance = instances[instanceLayer.id] || fallbackInstance;
  if (!instance || !instance.masterId) return;

  const { master, variants } = getComponentDefinition(instance.masterId);
  if (!master) return;

  const resolved = resolveInstance(master, instance, variants);
  renderLayerTree(ctx, resolved.layers, resolved.rootLayerIds);
}
