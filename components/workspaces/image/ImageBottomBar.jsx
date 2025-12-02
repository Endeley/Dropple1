"use client";

import { Minus, Plus, RefreshCw, Eye, Maximize2, Sparkles } from "lucide-react";
import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function ImageBottomBar() {
  const zoom = useImageWorkspaceStore((s) => s.zoom);
  const setZoom = useImageWorkspaceStore((s) => s.setZoom);
  const toggleBeforeAfter = useImageWorkspaceStore((s) => s.toggleBeforeAfter);
  const resetAdjustments = useImageWorkspaceStore((s) => s.resetAdjustments);
  const openModal = useWorkspaceUIStore((s) => s.openModal);

  const clampZoom = (next) => Math.min(3, Math.max(0.1, Number(next.toFixed(2))));

  return (
    <div className="flex items-center gap-3 border-t border-neutral-200 bg-[#f7f7f8] px-4 py-2 text-neutral-900">
      <div className="flex items-center gap-1 rounded-md bg-white px-2 py-1 border border-neutral-200">
        <button
          type="button"
          onClick={() => setZoom(clampZoom(zoom - 0.1))}
          className="rounded p-1 hover:bg-neutral-200"
        >
          <Minus size={16} />
        </button>
        <span className="px-3 text-sm tabular-nums">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={() => setZoom(clampZoom(zoom + 0.1))}
          className="rounded p-1 hover:bg-neutral-200"
        >
          <Plus size={16} />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setZoom(1)}
        className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-100"
      >
        <Maximize2 size={16} />
        Fit
      </button>

      <button
        type="button"
        onClick={toggleBeforeAfter}
        className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-100"
      >
        <Eye size={16} />
        Before / After
      </button>

      <button
        type="button"
        onClick={resetAdjustments}
        className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-100"
      >
        <RefreshCw size={16} />
        Reset
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={() => openModal("enhance")}
          className="flex items-center gap-2 rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-500"
        >
          <Sparkles size={16} />
          Enhance
        </button>
        <button
          type="button"
          onClick={() => openModal("export")}
          className="flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-100"
        >
          Export
        </button>
      </div>
    </div>
  );
}
