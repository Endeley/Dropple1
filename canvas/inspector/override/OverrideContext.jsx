"use client";

import { createContext, useContext, useMemo } from "react";
import { useComponentStore } from "@/canvas/components/componentStore";
import { isOverridden as checkOverride } from "@/canvas/components/isOverridden";
import { updateInstanceOverride } from "@/canvas/components/updateInstanceOverride";
import { resetInstanceOverride } from "@/canvas/components/resetInstanceOverride";
import { getByPath } from "../getByPath";
import { useComponentDefinition } from "@/foundation/libraries/getComponentDefinition";

const OverrideCtx = createContext(null);

export function OverrideProvider({ instanceId, masterLayerId, children }) {
  const instance = useComponentStore((state) => state.instances[instanceId]);
  const { master } = useComponentDefinition(instance?.masterId);

  const value = useMemo(() => {
    if (!instance || !master) return null;
    const masterLayers = master.layers || {};
    const overrides = instance.overrides || {};

    const getMasterValue = (path) => getByPath(masterLayers[masterLayerId], path);

    const applyOverride = (path, val) => {
      const masterVal = getMasterValue(path);
      if (JSON.stringify(masterVal) === JSON.stringify(val)) {
        resetInstanceOverride(instanceId, masterLayerId, path);
      } else {
        updateInstanceOverride(instanceId, masterLayerId, path, val);
      }
    };

    return {
      instance,
      master,
      masterLayerId,
      masterLayers,
      overrides,
      getMasterValue,
      getOverrideValue: (path) => overrides[`${masterLayerId}:${path}`],
      isOverridden: (path) =>
        checkOverride(masterLayers, overrides, masterLayerId, path),
      setOverride: applyOverride,
      resetOverride: (path) =>
        resetInstanceOverride(instanceId, masterLayerId, path),
    };
  }, [instance, master, masterLayerId, instanceId]);

  if (!value) return null;

  return <OverrideCtx.Provider value={value}>{children}</OverrideCtx.Provider>;
}

export function useOverride() {
  return useContext(OverrideCtx);
}
