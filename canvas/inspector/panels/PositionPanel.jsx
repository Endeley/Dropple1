"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function PositionPanel({ layer }) {
  if (!layer) return null;
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">POSITION</div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={layer.x ?? 0}
          onChange={(e) => updateLayerProp(layer.id, "x", Number(e.target.value))}
          className="bg-neutral-800/80 rounded px-2 py-1"
        />
        <input
          type="number"
          value={layer.y ?? 0}
          onChange={(e) => updateLayerProp(layer.id, "y", Number(e.target.value))}
          className="bg-neutral-800/80 rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
