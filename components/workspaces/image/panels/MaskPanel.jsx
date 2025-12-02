"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

export default function MaskPanel() {
  const brush = useImageWorkspaceStore((s) => s.brush);
  const setBrush = useImageWorkspaceStore((s) => s.setBrush);
  const activeTool = useImageWorkspaceStore((s) => s.activeTool);
  const isMasking = ["mask", "brush", "erase", "lasso"].includes(activeTool);
  const setMaskInvertConfirm = useImageWorkspaceStore((s) => s.setMaskInvertConfirm);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Mask / Brush</h3>
        <span className="text-[11px] text-neutral-500">
          {isMasking ? "Active" : "Idle"}
        </span>
      </div>
      <div className="space-y-3">
        <SliderRow
          label="Size"
          value={brush.size}
          min={1}
          max={200}
          onChange={(v) => setBrush("size", v)}
        />
        <SliderRow
          label="Hardness"
          value={brush.hardness}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => setBrush("hardness", v)}
        />
        <SliderRow
          label="Opacity"
          value={brush.opacity}
          min={0}
          max={1}
          step={0.01}
          onChange={(v) => setBrush("opacity", v)}
        />
        <button
          type="button"
          onClick={() => setMaskInvertConfirm(true)}
          className="w-full rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white/80 hover:border-violet-400 hover:text-violet-200"
        >
          Invert mask
        </button>
      </div>
      {!isMasking && (
        <p className="mt-3 text-xs text-neutral-500">
          Select Mask, Brush, Erase, or Lasso to edit mask properties.
        </p>
      )}
    </div>
  );
}

function SliderRow({ label, value, min, max, step = 1, onChange }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs text-neutral-600">
        <span>{label}</span>
        <span className="tabular-nums text-neutral-500">
          {typeof value === "number" ? value.toFixed(2).replace(/\.?0+$/, "") : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer accent-violet-500"
      />
    </div>
  );
}
