"use client";

import { useEffect, useState } from "react";
import { Wand2 } from "lucide-react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import NamingResultList from "@/components/naming/NamingResultList";
import { useNamingAssistant } from "./NamingAssistantProvider";

const QUICK_TYPES = ["Project", "Template", "Component / Layer", "File", "Slogan", "Brand"];

export default function NamingQuickModal() {
  const renameLayer = useTemplateStore((s) => s.renameLayer);
  const selectedObject = useTemplateStore((s) => s.selectedObject);
  const {
    quickModalOpen,
    closeQuickModal,
    presetTarget,
    generateNames,
    results,
    loading,
    lastAppliedName,
    setLastAppliedName,
  } = useNamingAssistant();

  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Minimal");
  const [type, setType] = useState("Project");
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    if (quickModalOpen) {
      const friendly = (presetTarget || "Project")
        .replace(/[-_]+/g, " ")
        .replace(/\s*\/\s*/g, " / ")
        .replace(/\s+/g, " ")
        .trim();
      const candidate = friendly ? friendly.replace(/\b\w/g, (l) => l.toUpperCase()) : "Project";
      const match = QUICK_TYPES.find((t) => t.toLowerCase() === candidate.toLowerCase());
      setType(match || "Project");
    }
  }, [presetTarget, quickModalOpen]);

  if (!quickModalOpen) return null;

  const applyName = async (name) => {
    if (selectedObject) {
      renameLayer?.(selectedObject, name);
    } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(name).catch(() => {});
    }
    setLastAppliedName?.(name);
    closeQuickModal();
  };

  const run = async () => {
    await generateNames({
      type: type.toLowerCase(),
      tone,
      keywords: prompt,
      language,
      mode: type.toLowerCase() === "slogan" ? "slogan" : "list",
      count: 8,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
      <div className="w-[520px] max-w-full rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Quick Naming</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Drop in a hint and AJ will fill it.</p>
          </div>
          <button
            type="button"
            onClick={closeQuickModal}
            className="rounded-full px-3 py-1 text-sm font-semibold text-neutral-500 transition hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">What is this?</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
            >
              {QUICK_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Tone</span>
            <input
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              placeholder="Luxury, playful, minimal..."
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
            />
          </label>
          <label className="col-span-2 flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Prompt / Keywords</span>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Elegant gradient flyer for a fintech brand"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-3 dark:border-neutral-700 dark:bg-neutral-900"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">Language</span>
            <input
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="English"
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
            />
          </label>
          <div className="flex items-end">
            <button
              type="button"
              onClick={run}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 disabled:opacity-60"
            >
              <Wand2 size={16} />
              Generate
            </button>
          </div>
        </div>

        <div className="mt-4 max-h-80 overflow-auto">
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
  );
}
