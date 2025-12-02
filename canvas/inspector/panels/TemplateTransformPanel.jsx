"use client";

import { useLayersStore } from "@/stores/useLayersStore";
import { useTemplateStore } from "@/stores/useTemplateStore";

export default function TemplateTransformPanel() {
  const selection = useLayersStore((s) => s.selection);
  const templateInstances = useTemplateStore((s) => s.templateInstances) ?? [];
  const updateTransform = useTemplateStore((s) => s.updateTransform);

  if (!selection || selection.type !== "template-instance") return null;

  const instance = templateInstances.find((i) => i.id === selection.instanceId);
  if (!instance) return null;

  const { x, y, scale, rotation } = instance.transform;

  const update = (field, value) => {
    const parsed = parseFloat(value);
    if (Number.isNaN(parsed)) return;
    updateTransform(instance.id, { [field]: parsed });
  };

  return (
    <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
      <h3 className="text-sm font-semibold mb-2">Transform</h3>

      <div className="flex flex-col gap-3 text-sm">
        <label className="flex justify-between items-center gap-2">
          <span>X</span>
          <input
            type="number"
            value={x}
            onChange={(e) => update("x", e.target.value)}
            className="w-24 px-2 py-1 border rounded bg-neutral-50 dark:bg-neutral-900"
          />
        </label>

        <label className="flex justify-between items-center gap-2">
          <span>Y</span>
          <input
            type="number"
            value={y}
            onChange={(e) => update("y", e.target.value)}
            className="w-24 px-2 py-1 border rounded bg-neutral-50 dark:bg-neutral-900"
          />
        </label>

        <label className="flex justify-between items-center gap-2">
          <span>Scale</span>
          <input
            type="number"
            step="0.01"
            value={scale}
            onChange={(e) => update("scale", e.target.value)}
            className="w-24 px-2 py-1 border rounded bg-neutral-50 dark:bg-neutral-900"
          />
        </label>

        <label className="flex justify-between items-center gap-2">
          <span>Rotation</span>
          <input
            type="number"
            value={rotation}
            onChange={(e) => update("rotation", e.target.value)}
            className="w-24 px-2 py-1 border rounded bg-neutral-50 dark:bg-neutral-900"
          />
        </label>
      </div>
    </div>
  );
}
