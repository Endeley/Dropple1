"use client";

import { getByPath } from "@/canvas/inspector/getByPath";

export function isOverridden(masterLayers, instanceOverrides = {}, layerId, propPath) {
  if (!masterLayers?.[layerId]) return false;
  const key = `${layerId}:${propPath}`;
  if (!(key in (instanceOverrides || {}))) return false;

  const masterValue = getByPath(masterLayers[layerId], propPath);
  const overrideValue = instanceOverrides[key];
  return JSON.stringify(masterValue) !== JSON.stringify(overrideValue);
}
