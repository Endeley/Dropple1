"use client";

import { updateLayerProp } from "../updateLayerProp";

export default function TextInspector({ layer }) {
  if (!layer) return null;

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-white/60">Text</label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm"
          rows={3}
          value={layer.text || ""}
          onChange={(e) => updateLayerProp(layer.id, "text", e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs text-white/60">Font Size</label>
        <input
          type="number"
          className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-white text-sm"
          value={layer.fontSize || 16}
          onChange={(e) => updateLayerProp(layer.id, "fontSize", Number(e.target.value))}
        />
      </div>
    </div>
  );
}
