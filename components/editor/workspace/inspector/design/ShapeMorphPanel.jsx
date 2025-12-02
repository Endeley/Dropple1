"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function ShapeMorphPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const setFrom = useTemplateStore((s) => s.setMorphFromSelection);
  const setTo = useTemplateStore((s) => s.setMorphToSelection);
  const createMorph = useTemplateStore((s) => s.createMorphFromTargets);
  const morphProgress = useTemplateStore((s) => s.morphProgress);
  const updateProgress = useTemplateStore((s) => s.updateMorphProgress);

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Shape Morph</h3>
        <span className="text-[11px] text-neutral-500">Vectors only</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={setFrom}
          className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
        >
          Set From
        </button>
        <button
          type="button"
          onClick={setTo}
          className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
        >
          Set To
        </button>
      </div>

      <button
        type="button"
        onClick={createMorph}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Create Morph
      </button>

      <label className="flex items-center gap-2 text-xs">
        <span className="w-16">Progress</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={morphProgress}
          onChange={(e) => updateProgress(Number(e.target.value))}
          className="flex-1"
        />
        <span className="w-10 text-right">{Math.round(morphProgress * 100)}%</span>
      </label>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Morph preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 px-4 text-center text-[11px] font-semibold text-white">
          Adjust morph to preview against your design background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Pick a source shape, pick a target shape, then create a morph-path. Use the slider to scrub between shapes. Works
        best with vector paths (including SVG imports and pen tool shapes).
      </p>
    </div>
  );
}
