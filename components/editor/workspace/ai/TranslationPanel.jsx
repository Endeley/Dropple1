"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";

const LANGS = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Spanish", value: "es" },
  { label: "German", value: "de" },
  { label: "Arabic", value: "ar" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Yoruba", value: "yo" },
  { label: "Igbo", value: "ig" },
  { label: "Hausa", value: "ha" },
];

export default function TranslationPanel() {
  const translateLayer = useTemplateStore((s) => s.translateLayer);
  const translateAll = useTemplateStore((s) => s.translateAll);
  const selected = useTemplateStore((s) => s.selectedObject);
  const [target, setTarget] = useState("fr");

  const isText = selected && (selected.type === "i-text" || selected.type === "text" || selected.type === "textbox");

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Translate</h3>
        <select
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
        >
          {LANGS.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        disabled={!isText}
        onClick={() => translateLayer?.(selected?.id || selected?.layerId, target)}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700"
      >
        Translate Selected
      </button>

      <button
        type="button"
        onClick={() => translateAll?.(target)}
        className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700"
      >
        Translate Entire Project
      </button>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="Translation preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-4 text-center text-[11px] font-semibold text-white">
          Preview translated text on your design background.
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        AI-powered translations keep formatting and reflow text to avoid overflow. Switch languages any time and export
        localized variants.
      </p>
    </div>
  );
}
