"use client";

import { useState } from "react";
import { MessageCircle, Sparkles, Zap } from "lucide-react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import NamingResultList from "@/components/naming/NamingResultList";
import { useNamingAssistant } from "./NamingAssistantProvider";

export default function NamingBubble() {
  const renameLayer = useTemplateStore((s) => s.renameLayer);
  const selectedObject = useTemplateStore((s) => s.selectedObject);
  const { generateNames, loading, results, openQuickModal, setLastAppliedName, lastAppliedName } = useNamingAssistant();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("20 elegant names for a purple gradient template");
  const [tone, setTone] = useState("Playful");
  const [type, setType] = useState("template");

  const applyName = async (name) => {
    if (selectedObject) {
      renameLayer?.(selectedObject, name);
    } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(name).catch(() => {});
    }
    setLastAppliedName?.(name);
  };

  const run = async (count = 20) => {
    await generateNames({
      type,
      tone,
      keywords: prompt,
      count,
      mode: count >= 80 ? "burst" : "list",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1200] flex flex-col items-end gap-2">
      {open && (
        <div className="w-[360px] rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xl backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-violet-500">AJ naming</p>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Need a quick batch?</h4>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2 py-1 text-xs text-neutral-500 transition hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="mt-3 space-y-2">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
            />
            <div className="flex gap-2">
              <input
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-32 rounded-lg border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
              >
                <option value="template">Template</option>
                <option value="project">Project</option>
                <option value="component">Component</option>
                <option value="file">File</option>
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => run(20)}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:opacity-60"
              >
                <Sparkles size={14} />
                20 names
              </button>
              <button
                type="button"
                onClick={() => run(100)}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition hover:border-amber-400 hover:bg-amber-100 dark:border-amber-700/60 dark:bg-amber-900/40 dark:text-amber-200"
              >
                <Zap size={14} />
                100 burst
              </button>
              <button
                type="button"
                onClick={() => openQuickModal(type)}
                className="rounded-full border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-violet-400 dark:border-neutral-700 dark:text-neutral-200"
              >
                Open full
              </button>
            </div>

            <div className="max-h-72 overflow-auto">
              <NamingResultList
                results={results}
                onUse={applyName}
                loading={loading}
                compact
                lastApplied={lastAppliedName}
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-violet-500 active:translate-y-[1px]"
      >
        <MessageCircle size={16} />
        AJ Naming
      </button>
    </div>
  );
}
