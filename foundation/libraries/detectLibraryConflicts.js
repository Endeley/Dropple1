"use client";

export function detectLibraryConflicts(instance, master) {
  if (!instance || !master) return [];
  const conflicts = [];

  Object.keys(instance.overrides || {}).forEach((key) => {
    const [layerId] = key.split(":");
    if (!layerId) return;
    if (!master.layers?.[layerId]) {
      conflicts.push({
        type: "missing-layer",
        layerId,
        overrideKey: key,
      });
    }
  });

  return conflicts;
}
