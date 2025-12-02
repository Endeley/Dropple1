"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";
import { useMemo } from "react";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

const buildGradientCSS = (g) => {
  const stops = (g.stops || []).map(
    (s) =>
      `${s.color}${Math.round((s.opacity ?? 1) * 255)
        .toString(16)
        .padStart(2, "0")} ${Math.round((s.offset || 0) * 100)}%`
  );
  if (g.type === "linear") return `linear-gradient(${g.angle || 0}deg, ${stops.join(", ")})`;
  if (g.type === "radial") return `radial-gradient(circle at center, ${stops.join(", ")})`;
  return `conic-gradient(from ${g.angle || 0}deg, ${stops.join(", ")})`;
};

export default function GradientEditor() {
  const g = useTemplateStore((s) => s.gradientEditor);
  const setG = useTemplateStore((s) => s.setGradientEditor);
  const apply = useTemplateStore((s) => s.applyGradientToObject);

  const previewStyle = useMemo(
    () => ({
      background: buildGradientCSS(g),
      mixBlendMode: "multiply",
      opacity: 0.85,
    }),
    [g]
  );

  const addStop = () => {
    const stops = [...(g.stops || []), { offset: 0.5, color: "#ffffff", opacity: 1 }];
    setG({ stops });
  };

  const updateStop = (i, patch) => {
    const stops = (g.stops || []).map((s, idx) => (idx === i ? { ...s, ...patch } : s));
    setG({ stops });
  };

  const removeStop = (i) => {
    const stops = (g.stops || []).filter((_, idx) => idx !== i);
    setG({ stops });
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Gradient Editor</h3>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Gradient preview"
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
          className="h-32 w-full object-cover"
        />
        <div className="absolute inset-0" style={previewStyle} />
      </div>

      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Type</label>
      <select
        value={g.type}
        onChange={(e) => setG({ type: e.target.value })}
        className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
      >
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
        <option value="conic">Conic</option>
      </select>

      {g.type === "linear" && (
        <>
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Angle</label>
          <input
            type="range"
            min="0"
            max="360"
            value={g.angle}
            onChange={(e) => setG({ angle: Number(e.target.value) })}
            className="accent-violet-500"
          />
        </>
      )}

      {g.type === "radial" && (
        <>
          <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Radius</label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={g.radius}
            onChange={(e) => setG({ radius: Number(e.target.value) })}
            className="accent-violet-500"
          />
        </>
      )}

      <div className="space-y-2">
        {(g.stops || []).map((stop, i) => (
          <div key={i} className="flex flex-col gap-1 rounded border border-neutral-200 p-2 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
                Stop {i + 1}
              </span>
              <button
                type="button"
                className="ml-auto text-[11px] text-rose-500 hover:text-rose-600"
                onClick={() => removeStop(i)}
              >
                Remove
              </button>
            </div>

            <label className="text-[11px] text-neutral-600 dark:text-neutral-300">Offset</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={stop.offset}
              onChange={(e) => updateStop(i, { offset: Number(e.target.value) })}
              className="accent-violet-500"
            />

            <label className="text-[11px] text-neutral-600 dark:text-neutral-300">Color</label>
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(i, { color: e.target.value })}
              className="h-8 w-full rounded border border-neutral-300 dark:border-neutral-700"
            />

            <label className="text-[11px] text-neutral-600 dark:text-neutral-300">Opacity</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={stop.opacity}
              onChange={(e) => updateStop(i, { opacity: Number(e.target.value) })}
              className="accent-violet-500"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="rounded border border-neutral-300 px-2 py-2 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
        onClick={addStop}
      >
        Add Stop
      </button>

      <button
        type="button"
        className="rounded bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
        onClick={() => apply()}
      >
        Apply Gradient
      </button>
    </div>
  );
}
