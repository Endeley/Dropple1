"use client";
import { useLayersStore } from "@/stores/useLayersStore";
import { useTemplateStore } from "@/stores/useTemplateStore";

export default function TemplateSlotInspector() {
  const selection = useLayersStore((s) => s.selection);
  const templateInstances = useTemplateStore((s) => s.templateInstances) || [];

  if (!selection || selection.type !== "template-slot") return null;

  const instance = templateInstances.find((t) => t.id === selection.instanceId);

  const slot = instance?.slots?.find((sl) => sl.id === selection.slotId);

  if (!instance || !slot) return null;

  return (
    <div className="p-4 border-l border-neutral-200 dark:border-neutral-800">
      <h3 className="font-semibold text-lg mb-2">Slot Inspector</h3>

      <div className="text-sm opacity-70">Slot ID: {slot.id}</div>
      <div className="text-sm opacity-70">Type: {slot.type}</div>

      {/* Future UI: text editing, image upload, color pickers, etc */}
      <div className="mt-4 text-sm">
        <strong>Content:</strong>
      </div>
      <div className="mt-1 p-2 bg-neutral-100 dark:bg-neutral-900 rounded">
        {JSON.stringify(slot.content, null, 2)}
      </div>
    </div>
  );
}
