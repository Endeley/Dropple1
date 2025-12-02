"use client";

import { updateLayerProp } from "../updateLayerProp";
import TokenValuePicker from "../controls/TokenValuePicker";

export default function StrokePanel({ layer }) {
  if (!layer) return null;
  const stroke = layer.strokes?.[0] || {};

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">STROKE</div>
      <TokenValuePicker
        value={stroke.color || "#000000"}
        onChange={(val) => updateLayerProp(layer.id, "strokes[0].color", val)}
      />
      <input
        type="number"
        className="w-full bg-neutral-800/80 rounded px-2 py-1"
        value={layer.strokeWidth ?? 1}
        onChange={(e) => updateLayerProp(layer.id, "strokeWidth", Number(e.target.value))}
      />
    </div>
  );
}
