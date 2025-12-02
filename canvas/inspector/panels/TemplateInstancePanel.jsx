"use client";

import { useTemplateInstanceStore } from "@/foundation/templates/templateInstanceStore";
import { useTemplateStore } from "@/foundation/templates/templateStore";
import { useLayerSelectionStore } from "@/canvas/selection/layerSelectionStore";

export default function TemplateInstancePanel({ layer }) {
  const templateInstances = useTemplateInstanceStore((s) => s.instances);
  const templates = useTemplateStore((s) => s.templates);
  const selectSlot = useLayerSelectionStore((s) => s.selectTemplateSlot);

  const instance = templateInstances[layer.templateInstanceId || layer.id];
  const template = instance ? templates[instance.templateId] : null;

  if (!instance || !template) {
    return (
      <div className="bg-neutral-900/60 rounded-md p-3 text-sm text-neutral-400">
        Template data unavailable.
      </div>
    );
  }

  const slotLayers = Object.values(template.layers || {}).filter(
    (l) => l.type === "slot"
  );

  return (
    <div className="bg-neutral-900/60 rounded-md p-3 space-y-3 text-sm text-neutral-200">
      <div className="text-xs text-neutral-400">TEMPLATE INSTANCE</div>
      <div>
        <div className="font-semibold text-white">{template.name}</div>
        <div className="text-xs text-neutral-500 break-all">
          Instance ID: {instance.id}
        </div>
      </div>

      {slotLayers.length > 0 && (
        <div className="space-y-1">
          <div className="text-xs text-neutral-400">Slots</div>
          <div className="space-y-1">
            {slotLayers.map((slot) => (
              <button
                key={slot.id}
                className="w-full text-left text-xs px-2 py-1 bg-neutral-800/70 rounded hover:bg-neutral-800"
                onClick={() => selectSlot(instance.id, slot.id)}
              >
                {slot.name || slot.kind} — {slot.kind}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
