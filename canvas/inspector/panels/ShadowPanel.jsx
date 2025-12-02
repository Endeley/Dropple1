"use client";

import { updateLayerProp } from "../updateLayerProp";
import TokenValuePicker from "../controls/TokenValuePicker";

export default function ShadowPanel({ layer }) {
  if (!layer) return null;
  const shadow = layer.shadows?.[0] || { x: 0, y: 0, blur: 0, color: "#000000" };

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">SHADOW</div>
      <TokenValuePicker
        value={shadow.color || "#000000"}
        onChange={(val) => updateLayerProp(layer.id, "shadows[0].color", val)}
      />
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          value={shadow.x}
          onChange={(e) => updateLayerProp(layer.id, "shadows[0].x", Number(e.target.value))}
          className="bg-neutral-800/80 rounded px-2 py-1"
        />
        <input
          type="number"
          value={shadow.y}
          onChange={(e) => updateLayerProp(layer.id, "shadows[0].y", Number(e.target.value))}
          className="bg-neutral-800/80 rounded px-2 py-1"
        />
        <input
          type="number"
          value={shadow.blur}
          onChange={(e) => updateLayerProp(layer.id, "shadows[0].blur", Number(e.target.value))}
          className="bg-neutral-800/80 rounded px-2 py-1"
        />
      </div>
    </div>
  );
}
