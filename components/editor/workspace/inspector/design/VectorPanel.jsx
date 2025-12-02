"use client";

import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function VectorPanel() {
  const penMode = useTemplateStore((s) => s.penMode);
  const startPen = useTemplateStore((s) => s.startPen);
  const stopPen = useTemplateStore((s) => s.stopPen);
  const aiGenerating = useTemplateStore((s) => s.aiGenerating);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Vector Pen</h3>
        <button
          type="button"
          onClick={() => (penMode ? stopPen() : startPen())}
          disabled={aiGenerating}
          className={`rounded px-3 py-1 text-xs font-semibold border ${
            penMode
              ? "border-rose-400 text-rose-500"
              : "border-neutral-300 hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400"
          }`}
        >
          {penMode ? "Stop Pen" : "Start Pen"}
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Vector preview"
          onError={(e) => {
            e.currentTarget.src = "/logo.png";
          }}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white drop-shadow">
          Vector Preview
        </div>
      </div>

      <p className="text-xs text-neutral-600 dark:text-neutral-300">
        Click on canvas to add points. This is an early pen-tool scaffold; handles and node editing will be added next.
      </p>
    </div>
  );
}
