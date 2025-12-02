"use client";

import { updateLayerProp } from "../updateLayerProp";
import TokenValuePicker from "../controls/TokenValuePicker";

export default function FillPanel({ layer }) {
  if (!layer) return null;
  const fill = layer.fills?.[0] || {};

  return (
    <div className="bg-neutral-900/70 border border-white/5 rounded-lg p-3 text-sm space-y-2">
      <div className="text-xs text-neutral-400 font-semibold">FILL</div>
      <TokenValuePicker
        value={fill.color || "#ffffff"}
        onChange={(val) => updateLayerProp(layer.id, "fills[0].color", val)}
      />
    </div>
  );
}
