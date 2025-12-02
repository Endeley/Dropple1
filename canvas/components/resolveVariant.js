"use client";

import { setByPath } from "@/canvas/inspector/setByPath";

export function applyVariant(resolvedLayers, variant) {
  if (!variant) return resolvedLayers;

  const next = structuredClone(resolvedLayers);
  const overrides = variant.overrides || {};

  Object.entries(overrides).forEach(([path, value]) => {
    const [layerId, propPath] = path.split(":");
    if (!layerId || !propPath || !next[layerId]) return;
    setByPath(next[layerId], propPath, value);
  });

  return next;
}
