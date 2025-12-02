"use client";

import { useComponentStore } from "./componentStore";

export function resetInstanceOverride(instanceId, layerId, propPath) {
  const key = `${layerId}:${propPath}`;
  const { instances, updateInstance } = useComponentStore.getState();
  const instance = instances[instanceId];
  if (!instance || !instance.overrides) return;

  const overrides = { ...instance.overrides };
  delete overrides[key];

  updateInstance(instanceId, { overrides });
}
