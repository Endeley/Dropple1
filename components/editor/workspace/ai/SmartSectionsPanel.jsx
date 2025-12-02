"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const SECTION_TYPES = [
  { id: "hero", label: "Hero" },
  { id: "features", label: "Features" },
  { id: "gallery", label: "Gallery" },
  { id: "pricing", label: "Pricing" },
  { id: "cta", label: "CTA" },
];

export default function SmartSectionsPanel() {
  const generate = useTemplateStore((s) => s.generateSmartSection);
  const aiGenerating = useTemplateStore((s) => s.aiGenerating);
  const [status, setStatus] = useState("");

  const handleGenerate = async (type) => {
    setStatus("Generating…");
    await generate?.(type);
    setStatus("Inserted to canvas");
    setTimeout(() => setStatus(""), 1200);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Smart Sections</h3>
        {status && <span className="text-[11px] text-violet-500">{status}</span>}
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Smart layout preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 to-black/10 text-xs font-semibold text-white">
          AI Layout Preview
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {SECTION_TYPES.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={aiGenerating}
            onClick={() => handleGenerate(item.id)}
            className="rounded border border-neutral-200 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:border-violet-400"
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Generates a ready-to-edit section with smart spacing and auto-layout-friendly frames. Uses your uploaded image
        as the contextual preview.
      </p>
    </div>
  );
}
