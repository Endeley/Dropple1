"use client";

import { useComponentStore } from "./componentStore";

export function updateInstanceOverride(instanceId, layerId, propPath, value) {
  const key = `${layerId}:${propPath}`;
  const { instances, updateInstance } = useComponentStore.getState();
  const instance = instances[instanceId];
  if (!instance) return;

  const overrides = { ...(instance.overrides || {}) };
  overrides[key] = value;

  updateInstance(instanceId, { overrides });
}
