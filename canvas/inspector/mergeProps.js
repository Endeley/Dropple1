"use client";

import { setByPath } from "./setByPath";

export function mergeProps(masterLayer, overrides = {}) {
  const merged = structuredClone(masterLayer);

  Object.entries(overrides).forEach(([path, value]) => {
    setByPath(merged, path, value);
  });

  return merged;
}
