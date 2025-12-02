"use client";

import { useState } from "react";
import { useTemplateStore } from "@/stores/useTemplateStore";

const PREVIEW_SRC = "/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png";
const MODES = [
  { id: "shorter", label: "Shorter" },
  { id: "longer", label: "Longer" },
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "engaging", label: "More Engaging" },
  { id: "emotional", label: "More Emotional" },
];

const GENERATE_TYPES = [
  { id: "headline", label: "Generate Headline" },
  { id: "subheader", label: "Generate Subheader" },
  { id: "paragraph", label: "Generate Paragraph" },
  { id: "cta", label: "Generate CTA" },
];

const TONES = ["Friendly", "Bold", "Corporate", "Elegant", "Youthful", "Minimalist", "Techy"];

export default function AICopyPanel() {
  const selected = useTemplateStore((s) => s.selectedObject);
  const applyText = useTemplateStore((s) => s.applyAIToSelectedText);
  const [tone, setTone] = useState("Friendly");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const doRewrite = async (mode) => {
    if (!selected?.text) return;
    setLoading(true);
    const res = await fetch("/api/ai/rewrite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, tone, text: selected.text }),
    }).then((r) => r.json()).catch(() => ({ output: selected.text }));
    const out = res?.output || selected.text;
    setSuggestion(out);
    applyText?.(out);
    setLoading(false);
  };

  const doGenerate = async (type) => {
    setLoading(true);
    const res = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, tone }),
    }).then((r) => r.json()).catch(() => ({ output: "Design smarter with Dropple." }));
    const out = res?.output || "";
    setSuggestion(out);
    applyText?.(out);
    setLoading(false);
  };

  if (!selected || (selected.type !== "i-text" && selected.type !== "text" && selected.type !== "textbox")) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100">AI Copywriting</h3>
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700"
        >
          {TONES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => doRewrite(m.id)}
            disabled={loading}
            className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 disabled:opacity-60 dark:border-neutral-700"
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {GENERATE_TYPES.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => doGenerate(g.id)}
            disabled={loading}
            className="rounded border border-neutral-300 px-3 py-2 text-xs font-semibold hover:border-violet-400 hover:text-violet-500 disabled:opacity-60 dark:border-neutral-700"
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <img
          src={PREVIEW_SRC}
          alt="AI copy preview"
          onError={(e) => (e.currentTarget.src = "/logo.png")}
          className="h-20 w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 px-4 text-center text-[11px] font-semibold text-white">
          {loading ? "Generating..." : suggestion || "AI suggestion preview will appear here"}
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        Rewrites and generates copy directly into the selected text layer. Uses your uploaded image as the preview
        background so you can see the tone in context.
      </p>
    </div>
  );
}
