"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";
import { useLayersStore } from "@/stores/useLayersStore";

export default function TemplateLayerTree() {
  const templateInstances = useTemplateStore((s) => s.templateInstances) ?? [];
  const selection = useLayersStore((s) => s.selection);
  const setSelection = useLayersStore((s) => s.setSelection);

  if (templateInstances.length === 0) {
    return <div className="p-4 text-sm opacity-70">No templates on canvas.</div>;
  }

  return (
    <div className="p-3 border-b border-neutral-200 dark:border-neutral-800">
      <h3 className="text-sm font-semibold mb-3">Layers</h3>

      <div className="flex flex-col gap-2">
        {templateInstances.map((inst) => (
          <div key={inst.id}>
            <div
              onClick={() =>
                setSelection({ type: "template-instance", instanceId: inst.id })
              }
              className={`cursor-pointer px-2 py-1 rounded
                ${
                  selection?.instanceId === inst.id &&
                  selection?.type === "template-instance"
                    ? "bg-neutral-200 dark:bg-neutral-800"
                    : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                }
              `}
            >
              <span className="text-sm font-medium">Template: {inst.templateId}</span>
            </div>

            <div className="pl-4 mt-1 flex flex-col gap-1">
              {(inst.slots || []).map((slot) => {
                const isActive =
                  selection?.type === "template-slot" &&
                  selection?.instanceId === inst.id &&
                  selection?.slotId === slot.id;

                return (
                  <div
                    key={slot.id}
                    onClick={() =>
                      setSelection({
                        type: "template-slot",
                        instanceId: inst.id,
                        slotId: slot.id,
                      })
                    }
                    className={`cursor-pointer text-xs px-2 py-1 rounded
                      ${
                        isActive
                          ? "bg-violet-200 dark:bg-violet-900"
                          : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
                      }
                    `}
                  >
                    Slot: {slot.id} ({slot.type})
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
