"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function LayerHeaderPanel({ layer }) {
  if (!layer) return null;

  return (
    <div className="flex items-center justify-between bg-neutral-900/80 border border-white/5 rounded-lg px-3 py-2">
      <input
        className="bg-neutral-800/80 border border-white/5 rounded px-2 py-1 text-sm w-40"
        value={layer.name || "Layer"}
        onChange={(e) => updateLayerProp(layer.id, "name", e.target.value)}
      />

      <div className="flex gap-2 text-sm">
        <button
          onClick={() => updateLayerProp(layer.id, "visible", !layer.visible)}
          className="px-2 py-1 rounded bg-neutral-800/80 border border-white/5 hover:bg-neutral-700"
        >
          {layer.visible === false ? "Show" : "Hide"}
        </button>
        <button
          onClick={() => updateLayerProp(layer.id, "locked", !layer.locked)}
          className="px-2 py-1 rounded bg-neutral-800/80 border border-white/5 hover:bg-neutral-700"
        >
          {layer.locked ? "Unlock" : "Lock"}
        </button>
      </div>
    </div>
  );
}
