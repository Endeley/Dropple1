"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

export default function AnimationInspector() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const addKeyframe = useTemplateStore((s) => s.addKeyframe);
  const duration = useTemplateStore((s) => s.animationState.duration);
  const setDuration = useTemplateStore((s) => s.setAnimationDuration);

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Animation</h3>
      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Duration (ms)</label>
      <input
        type="number"
        min={100}
        value={duration}
        onChange={(e) => setDuration(Number(e.target.value))}
        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
      />
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
          onClick={() => addKeyframe("left")}
        >
          Keyframe X
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
          onClick={() => addKeyframe("top")}
        >
          Keyframe Y
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => addKeyframe("opacity")}
        >
          Keyframe Opacity
        </button>
        <button
          type="button"
          className="rounded border border-neutral-300 px-2 py-1 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
          onClick={() => addKeyframe("angle")}
        >
          Keyframe Rotation
        </button>
      </div>
    </div>
  );
}
