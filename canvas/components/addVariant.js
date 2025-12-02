"use client";

import { useComponentStore } from "./componentStore";

export function addVariant(masterId, variantKey, overrides = {}) {
  const variant = {
    key: variantKey,
    overrides,
    createdAt: Date.now(),
  };

  useComponentStore.getState().addVariant(masterId, variantKey, variant);
  return variantKey;
}
