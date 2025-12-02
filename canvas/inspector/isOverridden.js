"use client";

import { getByPath } from "./getByPath";

export function isOverridden(masterLayer, instance, path) {
  const masterValue = getByPath(masterLayer, path);
  const overrideValue = getByPath(instance?.overrides || {}, path);
  return overrideValue !== undefined && overrideValue !== masterValue;
}
