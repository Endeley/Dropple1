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

export default function FilterSettings() {
  const active = useWorkspaceUIStore((s) => s.activeRightSlideout);
  const closeRight = useWorkspaceUIStore((s) => s.closeRight);
  const filters = useImageWorkspaceStore((s) => s.filters);
  const setFilters = useImageWorkspaceStore((s) => s.setFilters);

  if (active !== "filterSettings") return null;

  return (
    <div className="pointer-events-auto flex flex-col gap-3">
      <SlideoutCard title="Filter settings" onClose={closeRight} width="w-72">
        <p className="text-xs text-neutral-500">Tune the selected filter. Left side browses, right side refines.</p>
        <Slider label="Strength" min={0} max={100} value={filters.intensity} onChange={(v) => setFilters("intensity", v)} />
        <Slider label="Tint" min={-100} max={100} value={filters.tint ?? 0} onChange={(v) => setFilters("tint", v)} />
        <Slider label="Fade" min={0} max={100} value={filters.fade ?? 20} onChange={(v) => setFilters("fade", v)} />
        <Slider label="Grain" min={0} max={100} value={filters.grain ?? 0} onChange={(v) => setFilters("grain", v)} />
        <Slider label="Color mix" min={0} max={100} value={filters.mix ?? 50} onChange={(v) => setFilters("mix", v)} />
        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={() => setFilters("preset", "none")}
            className="rounded-md border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            Reset
          </button>
          <button
            type="button"
            className="rounded-md bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-500"
          >
            Save preset
          </button>
        </div>
      </SlideoutCard>
    </div>
  );
}
