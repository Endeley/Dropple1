"use client";

import { useComponentStore } from "@/canvas/components/componentStore";
import { useComponentDefinition } from "@/foundation/libraries/getComponentDefinition";

export default function VariantSelectorPanel({ layer }) {
  const instances = useComponentStore((state) => state.instances);
  const updateInstance = useComponentStore((state) => state.updateInstance);

  const instance = instances[layer.id];
  const { variants } = useComponentDefinition(instance?.masterId);
  if (!instance) return null;

  const masterVariants = variants || {};

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">VARIANTS</div>
      <select
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={instance.variant || "Default"}
        onChange={(e) => updateInstance(layer.id, { variant: e.target.value })}
      >
        {Object.keys(masterVariants).length === 0 && (
          <option value="Default">Default</option>
        )}
        {Object.keys(masterVariants).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
}
