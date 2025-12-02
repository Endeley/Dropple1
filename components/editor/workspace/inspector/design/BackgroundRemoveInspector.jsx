"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

export default function BackgroundRemoveInspector() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const removeBG = useTemplateStore((s) => s.removeBackground);
  const bgRemoving = useTemplateStore((s) => s.bgRemoving);

  if (!selected || selected.type !== "image") return null;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <button
        type="button"
        disabled={bgRemoving}
        className="rounded bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-60"
        onClick={() => removeBG()}
      >
        {bgRemoving ? "Removing…" : "Remove Background"}
      </button>
    </div>
  );
}
