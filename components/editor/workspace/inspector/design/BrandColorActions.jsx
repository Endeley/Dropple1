"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

export default function BrandColorActions() {
  const kit = useTemplateStore((s) => s.activeBrandKit);
  const applyColor = useTemplateStore((s) => s.applyBrandColorToObject);
  const applyBg = useTemplateStore((s) => s.applyBrandColorToBackground);

  if (!kit || !kit.colors) return null;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-300">Brand Colors</label>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(kit.colors).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <button
              type="button"
              className="h-10 w-full rounded-md border border-neutral-200 dark:border-neutral-700"
              style={{ backgroundColor: value }}
              onClick={() => applyColor(key)}
            />
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex-1 rounded border border-neutral-300 px-2 py-1 text-[11px] font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover-border-violet-400"
                onClick={() => applyBg(key)}
              >
                BG
              </button>
              <span className="text-[11px] capitalize text-neutral-600 dark:text-neutral-300">{key}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
