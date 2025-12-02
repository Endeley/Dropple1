"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function ConstraintsPanel({ layer }) {
  if (!layer) return null;
  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">CONSTRAINTS</div>
      <select
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={layer.constraints?.horizontal || "left"}
        onChange={(e) => updateLayerProp(layer.id, "constraints.horizontal", e.target.value)}
      >
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="center">Center</option>
        <option value="scale">Scale</option>
      </select>
      <select
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={layer.constraints?.vertical || "top"}
        onChange={(e) => updateLayerProp(layer.id, "constraints.vertical", e.target.value)}
      >
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="center">Center</option>
        <option value="scale">Scale</option>
      </select>
    </div>
  );
}
