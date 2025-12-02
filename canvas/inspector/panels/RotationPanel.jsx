"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function RotationPanel({ layer }) {
  if (!layer) return null;
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">ROTATION</div>
      <input
        type="number"
        value={layer.rotation ?? 0}
        onChange={(e) => updateLayerProp(layer.id, "rotation", Number(e.target.value))}
        className="bg-neutral-800/80 rounded px-2 py-1 w-full"
      />
    </div>
  );
}
