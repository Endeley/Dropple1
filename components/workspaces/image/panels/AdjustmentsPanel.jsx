"use client";

import { useImageWorkspaceStore } from "@/lib/state/workspaces/image/useImageWorkspaceStore";

const sliders = [
  { key: "brightness", label: "Brightness", min: -100, max: 100, step: 1 },
  { key: "contrast", label: "Contrast", min: -100, max: 100, step: 1 },
  { key: "exposure", label: "Exposure", min: -100, max: 100, step: 1 },
  { key: "highlights", label: "Highlights", min: -100, max: 100, step: 1 },
  { key: "shadows", label: "Shadows", min: -100, max: 100, step: 1 },
  { key: "saturation", label: "Saturation", min: -100, max: 100, step: 1 },
  { key: "vibrance", label: "Vibrance", min: -100, max: 100, step: 1 },
  { key: "temperature", label: "Temperature", min: -100, max: 100, step: 1 },
  { key: "tint", label: "Tint", min: -100, max: 100, step: 1 },
];

export default function AdjustmentsPanel() {
  const adjustments = useImageWorkspaceStore((s) => s.adjustments);
  const setAdjustment = useImageWorkspaceStore((s) => s.setAdjustment);
  const brushSettings = useImageWorkspaceStore((s) => s.brushSettings);
  const setBrushSetting = useImageWorkspaceStore((s) => s.setBrushSetting);
  const clearMask = useImageWorkspaceStore((s) => s.clearMaskSelected);
  const invertMask = useImageWorkspaceStore((s) => s.invertMaskSelected);

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-neutral-900">Adjustments</h3>
      </div>
      <div className="space-y-3">
        {sliders.map((slider) => (
          <div key={slider.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>{slider.label}</span>
              <span className="tabular-nums text-neutral-500">
                {adjustments[slider.key]}
              </span>
            </div>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={adjustments[slider.key]}
              onChange={(e) => setAdjustment(slider.key, Number(e.target.value))}
              className="h-2 w-full cursor-pointer accent-violet-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
        <div className="text-xs font-semibold text-neutral-700">Brush / Erase</div>
        <label className="flex items-center justify-between gap-2 text-sm text-neutral-700">
          <span>Size</span>
          <input
            type="range"
            min="4"
            max="80"
            step="1"
            value={brushSettings?.size || 20}
            onChange={(e) => setBrushSetting("size", Number(e.target.value))}
          />
        </label>
        <label className="flex items-center justify-between gap-2 text-sm text-neutral-700">
          <span>Opacity</span>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={brushSettings?.opacity || 1}
            onChange={(e) => setBrushSetting("opacity", Number(e.target.value))}
          />
        </label>
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            className="flex-1 rounded border border-neutral-200 bg-white px-2 py-1 text-xs font-semibold text-neutral-800 hover:border-neutral-300"
            onClick={clearMask}
          >
            Clear mask
          </button>
          <button
            type="button"
            className="flex-1 rounded border border-neutral-200 bg-white px-2 py-1 text-xs font-semibold text-neutral-800 hover:border-neutral-300"
            onClick={invertMask}
          >
            Invert mask
          </button>
        </div>
      </div>
    </div>
  );
}
