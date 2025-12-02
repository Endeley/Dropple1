"use client";

import { useTemplateInstanceStore } from "@/foundation/templates/templateInstanceStore";

export default function SlotInspector({ layer, instanceId }) {
  const updateSlot = useTemplateInstanceStore((state) => state.updateSlotOverride);
  if (!layer) return null;

  const value = layer.filledValue ?? layer.defaultValue ?? "";
  const setValue = (next) => updateSlot(instanceId, layer.id, next);

  if (layer.kind === "text") {
    return (
      <div className="space-y-2 bg-neutral-900/70 border border-white/5 rounded p-3 text-sm">
        <div className="text-xs text-neutral-400">TEXT SLOT</div>
        <textarea
          className="w-full bg-neutral-800 rounded p-2"
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  }

  if (layer.kind === "image" || layer.kind === "logo") {
    return (
      <div className="space-y-2 bg-neutral-900/70 border border-white/5 rounded p-3 text-sm">
        <div className="text-xs text-neutral-400">{layer.kind.toUpperCase()} SLOT</div>
        <input
          type="file"
          accept="image/*"
          className="text-xs"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => setValue(reader.result);
            reader.readAsDataURL(file);
          }}
        />
        {value && (
          <img
            src={value}
            alt="Slot preview"
            className="mt-2 w-full rounded border border-white/10"
          />
        )}
      </div>
    );
  }

  if (layer.kind === "color") {
    return (
      <div className="space-y-2 bg-neutral-900/70 border border-white/5 rounded p-3 text-sm">
        <div className="text-xs text-neutral-400">COLOR SLOT</div>
        <input
          type="color"
          value={value || "#000000"}
          onChange={(e) => setValue(e.target.value)}
          className="w-full h-10 rounded border border-white/10 bg-neutral-800"
        />
      </div>
    );
  }

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded p-3 text-xs text-neutral-400">
      Unsupported slot type: {layer.kind}
    </div>
  );
}
