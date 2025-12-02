"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";
import { useWorkspaceUIStore } from "@/lib/state/ui/useWorkspaceUIStore";
import SlideoutCard from "./SlideoutCard";

const Slider = ({ label, value, min, max, step = 1, onChange }) => (
  <label className="flex items-center justify-between text-sm">
    <span className="text-neutral-700">{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-40 accent-violet-500"
    />
  </label>
);

export default function MaskControls() {
  const active = useWorkspaceUIStore((s) => s.activeRightSlideout);
  const closeRight = useWorkspaceUIStore((s) => s.closeRight);
  const brush = useImageWorkspaceStore((s) => s.brush);
  const setBrush = useImageWorkspaceStore((s) => s.setBrush);
  const mask = useImageWorkspaceStore((s) => s.mask);
  const setMask = useImageWorkspaceStore((s) => s.setMask);
  const setMaskInvertConfirm = useImageWorkspaceStore((s) => s.setMaskInvertConfirm);

  if (active !== "mask") return null;

  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <SlideoutCard title="Mask controls" onClose={closeRight} width="w-72">
        <p className="text-xs text-neutral-500">Tune brush and mask edges. Designed for Mask, Lasso, Magic Select, BG Remove.</p>
        <Slider label="Size" min={1} max={200} value={brush.size} onChange={(v) => setBrush("size", v)} />
        <Slider label="Softness" min={0} max={1} step={0.01} value={brush.hardness} onChange={(v) => setBrush("hardness", v)} />
        <Slider label="Opacity" min={0} max={1} step={0.01} value={brush.opacity} onChange={(v) => setBrush("opacity", v)} />
        <Slider label="Edge feather" min={0} max={100} value={mask.feather} onChange={(v) => setMask("feather", v)} />
        <Slider label="Edge refine" min={0} max={100} value={mask.refine} onChange={(v) => setMask("refine", v)} />
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-700">Preview mask</span>
          <button
            type="button"
            onClick={() => setMask("preview", !mask.preview)}
            className="rounded-full border border-neutral-200 px-2 py-1 text-xs font-semibold text-neutral-700 hover:border-violet-400"
          >
            {mask.preview ? "On" : "Off"}
          </button>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setMaskInvertConfirm(true)}
            className="rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            Invert mask
          </button>
        </div>
      </SlideoutCard>
    </div>
  );
}
