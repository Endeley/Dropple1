"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

const effectSliders = [
  { key: "blur", label: "Blur", min: 0, max: 100, step: 1 },
  { key: "vignette", label: "Vignette", min: 0, max: 100, step: 1 },
  { key: "grain", label: "Grain", min: 0, max: 100, step: 1 },
];

export default function EffectsPanel() {
  const effects = useImageWorkspaceStore((s) => s.effects);
  const setEffect = useImageWorkspaceStore((s) => s.setEffect);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Effects</h3>
      </div>
      <div className="space-y-3">
        {effectSliders.map((slider) => (
          <div key={slider.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>{slider.label}</span>
              <span className="tabular-nums text-neutral-500">
                {effects[slider.key]}
              </span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={effects[slider.key]}
              onChange={(e) => setEffect(slider.key, Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-violet-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
