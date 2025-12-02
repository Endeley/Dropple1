"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const SCALE_MODES = [
  "Auto (Smart)",
  "Content-Aware Stretch",
  "Safe Resize (Protect Faces)",
  "Safe Resize (Protect Text)",
  "Fluid Stretch",
  "Exact Fit (Distort OK)",
];

export default function CASPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const applyCAS = useTemplateStore((s) => s.applyCASScaling);
  const [mode, setMode] = useState("Auto (Smart)");
  const [importance, setImportance] = useState(0.5);
  const [aggressive, setAggressive] = useState(0.4);
  const [textThreshold, setTextThreshold] = useState(32);

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Content-Aware Scaling</h3>
      </div>

      <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-200">Scale Mode</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
      >
        {SCALE_MODES.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>

      <SliderRow label="Importance Sensitivity" min={0} max={1} step={0.01} value={importance} onChange={setImportance} />
      <SliderRow label="Aggressiveness" min={0} max={1} step={0.01} value={aggressive} onChange={setAggressive} />
      <SliderRow label="Text Resize Threshold" min={10} max={72} step={1} value={textThreshold} onChange={setTextThreshold} />

      <button
        type="button"
        onClick={() =>
          applyCAS?.({
            mode,
            importance,
            aggressive,
            textThreshold,
          })
        }
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Apply CAS to Selection
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="CAS preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview scaling on your template background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Content-Aware Scaling protects important regions (faces, text, logos) and stretches low-importance areas. This is
        a scaffold—replace API and applyCAS with real seam carving / AI importance maps.
      </p>
    </div>
  );
}

function SliderRow({ label, value, min, max, step = 0.01, onChange }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-28 text-neutral-700 dark:text-neutral-200">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="w-10 text-right text-neutral-600 dark:text-neutral-300">
        {value >= 1 ? value.toFixed(0) : value.toFixed(2)}
      </span>
    </label>
  );
}
