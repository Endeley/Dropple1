"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function AutoLayoutPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const apply = useTemplateStore((s) => s.applyAutoLayout);
  const setLayout = useTemplateStore((s) => s.setFrameLayout);
  const setSpacing = useTemplateStore((s) => s.setFrameSpacing);
  const setPadding = useTemplateStore((s) => s.setFramePadding);

  if (!selected || selected.type !== "frame") return null;

  const padding = selected.padding || { top: 16, right: 16, bottom: 16, left: 16 };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Auto Layout</h3>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Auto-layout preview"
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow">
          Auto Layout Preview
        </div>
      </div>

      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Layout</label>
      <select
        value={selected.layout || "none"}
        onChange={(e) => setLayout(selected, e.target.value)}
        className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
      >
        <option value="none">None</option>
        <option value="vertical">Vertical</option>
        <option value="horizontal">Horizontal</option>
        <option value="grid">Grid</option>
      </select>

      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Spacing</label>
      <input
        type="number"
        value={selected.spacing ?? 12}
        onChange={(e) => setSpacing(selected, Number(e.target.value))}
        className="w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
      />

      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Padding</label>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number"
          value={padding.top}
          onChange={(e) => setPadding(selected, { ...padding, top: Number(e.target.value) })}
          className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          placeholder="Top"
        />
        <input
          type="number"
          value={padding.bottom}
          onChange={(e) => setPadding(selected, { ...padding, bottom: Number(e.target.value) })}
          className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          placeholder="Bottom"
        />
        <input
          type="number"
          value={padding.left}
          onChange={(e) => setPadding(selected, { ...padding, left: Number(e.target.value) })}
          className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          placeholder="Left"
        />
        <input
          type="number"
          value={padding.right}
          onChange={(e) => setPadding(selected, { ...padding, right: Number(e.target.value) })}
          className="rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          placeholder="Right"
        />
      </div>

      <button
        type="button"
        className="rounded bg-violet-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
        onClick={() => apply()}
      >
        Apply Auto Layout
      </button>
    </div>
  );
}
