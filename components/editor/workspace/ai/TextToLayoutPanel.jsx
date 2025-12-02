"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

export default function TextToLayoutPanel() {
  const generate = useTemplateStore((s) => s.generateTextToLayout);
  const aiGenerating = useTemplateStore((s) => s.aiGenerating);
  const [prompt, setPrompt] = useState("Hero with headline, subtext, CTA, and preview image");

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Text → Layout</h3>
        {aiGenerating && <span className="text-[11px] text-violet-500">Building…</span>}
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={3}
        className="w-full rounded border border-neutral-300 p-2 text-xs dark:border-neutral-700"
        placeholder="Describe a layout (e.g., Pricing grid with 3 cards and CTA)"
      />

      <button
        type="button"
        disabled={aiGenerating}
        onClick={() => generate?.(prompt)}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700"
      >
        Build Layout
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Layout preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview layouts on your template background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Describe any layout in natural language and Dropple will assemble frames, headings, text, buttons, and images
        automatically. Uses your uploaded image as context for realistic preview.
      </p>
    </div>
  );
}
