"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function LayoutPanel({ layer }) {
  if (!layer) return null;
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-3">
      <div className="text-xs text-neutral-400 font-semibold">LAYOUT</div>
      <select
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={layer.layoutMode || "none"}
        onChange={(e) => updateLayerProp(layer.id, "layoutMode", e.target.value)}
      >
        <option value="none">None</option>
        <option value="horizontal">Horizontal</option>
        <option value="vertical">Vertical</option>
      </select>
      <input
        type="number"
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={layer.spacing ?? 0}
        onChange={(e) => updateLayerProp(layer.id, "spacing", Number(e.target.value))}
        placeholder="Spacing"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          className="bg-neutral-800/80 rounded px-2 py-1"
          value={layer.padding?.top ?? 0}
          onChange={(e) => updateLayerProp(layer.id, "padding.top", Number(e.target.value))}
          placeholder="Padding Top"
        />
        <input
          type="number"
          className="bg-neutral-800/80 rounded px-2 py-1"
          value={layer.padding?.left ?? 0}
          onChange={(e) => updateLayerProp(layer.id, "padding.left", Number(e.target.value))}
          placeholder="Padding Left"
        />
      </div>
    </div>
  );
}
