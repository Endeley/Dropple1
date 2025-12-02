"use client";

import { useLayersStore } from "@/stores/useLayersStore";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function DevInspector() {
  const layers = useLayersStore((s) => s.layers || []);
  const devSelectedLayer = useAIStudioStore((s) => s.devSelectedLayer);
  const layer = layers.find((l) => l.id === devSelectedLayer);

  if (!layer) {
    return (
      <div className="p-4 text-xs text-gray-400 border-b border-white/10">
        Select a layer to inspect its properties.
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-white/10 max-h-64 overflow-auto">
      <p className="text-xs text-white/60 mb-2">INSPECTOR</p>
      <pre className="text-xs text-white/80 whitespace-pre-wrap">
        {JSON.stringify(layer, null, 2)}
      </pre>
    </div>
  );
}
