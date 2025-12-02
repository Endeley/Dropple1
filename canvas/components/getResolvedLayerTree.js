"use client";

import { useMemo } from "react";
import { useComponentStore } from "./componentStore";
import { resolveInstance } from "./resolveInstance";
import { useComponentDefinition } from "@/foundation/libraries/getComponentDefinition";

export function useResolvedLayerTree(instanceId) {
  const instance = useComponentStore((state) => state.instances[instanceId]);
  const { master, variants } = useComponentDefinition(
    instance?.masterId || null
  );

  return useMemo(() => {
    if (!instance || !master) return null;
    return resolveInstance(master, instance, variants || {});
  }, [instance, master, variants]);
}
