"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function LayoutFixerPanel() {
  const applyAll = useTemplateStore((s) => s.applyLayoutFix);
  const fixAlignment = useTemplateStore((s) => s.fixAlignment);
  const tidySpacing = useTemplateStore((s) => s.tidySpacing);
  const loadSuggestions = useTemplateStore((s) => s.loadLayoutSuggestions);
  const suggestions = useTemplateStore((s) => s.layoutSuggestions);
  const [loading, setLoading] = useState(false);

  const handleSuggestions = async () => {
    setLoading(true);
    await loadSuggestions?.();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">AI Layout Fixer</h3>
        <button
          type="button"
          onClick={applyAll}
          className="rounded border border-neutral-300 px-3 py-1 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
        >
          Apply All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={fixAlignment}
          className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
        >
          Fix Alignment
        </button>
        <button
          type="button"
          onClick={tidySpacing}
          className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
        >
          Tidy Spacing
        </button>
      </div>

      <button
        type="button"
        onClick={handleSuggestions}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        {loading ? "Loading..." : "AI Suggestions"}
      </button>

      <div className="space-y-2">
        {(suggestions || []).map((s, i) => (
          <div
            key={i}
            className="rounded border border-neutral-200 px-3 py-2 text-xs text-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
          >
            {s}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Layout preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview layout fixes on your design background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Detects misalignment, overlap, and spacing issues, offers AI suggestions, and applies tidy/align fixes in one
        click.
      </p>
    </div>
  );
}
