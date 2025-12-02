"use client";

import { useEditorMode } from "@/canvas/editor/editorModeStore";

export default function MasterHeader({ master }) {
  const exitToCanvas = useEditorMode((state) => state.exitToCanvas);

  return (
    <div className="bg-neutral-900/80 border border-white/5 rounded-lg p-3 flex items-center justify-between">
      <div>
        <div className="text-xs text-neutral-400">Editing Component</div>
        <div className="text-sm font-semibold">{master.name}</div>
      </div>
      <button
        className="bg-neutral-800 px-3 py-1 rounded hover:bg-neutral-700 text-sm"
        onClick={exitToCanvas}
      >
        Back to Canvas
      </button>
    </div>
  );
}
