"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

const FILTERS = [
  { id: "none", label: "None" },
  { id: "vivid", label: "Vivid" },
  { id: "matte", label: "Matte" },
  { id: "cinematic", label: "Cinematic" },
  { id: "bw", label: "B&W" },
];

export default function FiltersPanel() {
  const filters = useImageWorkspaceStore((s) => s.filters);
  const setFilters = useImageWorkspaceStore((s) => s.setFilters);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Filters</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filters.preset === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilters("preset", f.id)}
              className={`rounded-md px-3 py-2 text-xs font-semibold ${
                active ? "bg-violet-600 text-white" : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-neutral-600">
          <span>Intensity</span>
          <span className="tabular-nums">{filters.intensity}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={filters.intensity}
          onChange={(e) => setFilters("intensity", Number(e.target.value))}
          className="mt-1 w-full accent-violet-500"
        />
      </div>
    </div>
  );
}
