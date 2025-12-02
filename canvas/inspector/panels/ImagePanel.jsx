"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function ImagePanel({ layer }) {
  if (layer?.type !== "image") return null;

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">IMAGE</div>
      <input
        type="text"
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={layer.src || ""}
        onChange={(e) => updateLayerProp(layer.id, "src", e.target.value)}
        placeholder="Image URL"
      />
    </div>
  );
}
