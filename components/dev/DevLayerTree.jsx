"use client";

import { useLayersStore } from "@/stores/useLayersStore";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function DevLayerTree() {
  const layers = useLayersStore((s) => s.layers || []);
  const devSelectedLayer = useAIStudioStore((s) => s.devSelectedLayer);
  const setDevSelectedLayer = useAIStudioStore((s) => s.setDevSelectedLayer);

  return (
    <div className="p-4 border-b border-white/10 max-h-60 overflow-auto">
      <p className="text-xs text-white/60 mb-2">LAYERS</p>
      {layers.length === 0 && (
        <div className="text-xs text-white/40">No layers detected.</div>
      )}
      <div className="space-y-1">
        {layers.map((layer) => (
          <button
            key={layer.id}
            className={`w-full text-left px-2 py-1 rounded transition text-sm ${
              devSelectedLayer === layer.id
                ? "bg-violet-600/40 text-white"
                : "hover:bg-white/5 text-white/80"
            }`}
            onClick={() => setDevSelectedLayer(layer.id)}
          >
            {layer.name || layer.id}
          </button>
        ))}
      </div>
    </div>
  );
}
