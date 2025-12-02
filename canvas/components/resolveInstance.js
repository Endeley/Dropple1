"use client";

import { setByPath } from "@/canvas/inspector/setByPath";
import { applyVariant } from "./resolveVariant";

export function resolveInstance(master, instance, variants = {}) {
  let resolved = {};
  Object.entries(master.layers).forEach(([id, layer]) => {
    resolved[id] = structuredClone(layer);
  });

  const variant = variants?.[instance.variant];
  if (variant) {
    resolved = applyVariant(resolved, variant);
  }

  Object.entries(instance.overrides || {}).forEach(([path, value]) => {
    const [layerId, propPath] = path.split(":");
    if (!layerId || !propPath || !resolved[layerId]) return;
    setByPath(resolved[layerId], propPath, value);
  });

  return {
    masterId: master.id,
    layers: resolved,
    rootLayerIds: master.rootLayerIds,
  };
}
