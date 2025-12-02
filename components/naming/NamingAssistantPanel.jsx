"use client";

import { useMemo, useState } from "react";
import { Sparkles, Wand2, Zap } from "lucide-react";
import { useTemplateStore } from "@/stores/useTemplateStore";
import NamingResultList from "@/components/naming/NamingResultList";
import { useNamingAssistant } from "./NamingAssistantProvider";

const TARGETS = [
  "Project",
  "Brand",
  "Company",
  "Template",
  "Component / Layer",
  "Product",
  "Course",
  "Video / Animation",
  "Workspace File",
  "Podcast Episode",
  "Scene / Frame",
  "Timeline",
  "UI Component",
  "Export File",
];

const TONES = ["Luxury", "Playful", "Minimal", "Futuristic", "Bold", "Friendly", "Editorial", "Earthy"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Korean", "Portuguese"];

const parseKeywords = (text) =>
  `${text || ""}`
    .split(/[,|]/)
    .map((k) => k.trim())
    .filter(Boolean);

export default function NamingAssistantPanel({ selectedObject }) {
  const renameLayer = useTemplateStore((s) => s.renameLayer);
  const { results, generateNames, loading, error, openQuickModal, lastAppliedName, setLastAppliedName } =
    useNamingAssistant();

  const [target, setTarget] = useState("Project");
  const [tone, setTone] = useState("Luxury");
  const [language, setLanguage] = useState("English");
  const [keywords, setKeywords] = useState("");
  const [industry, setIndustry] = useState("");
  const [mode, setMode] = useState("list");
  const [familySeed, setFamilySeed] = useState("Titan");
  const [count, setCount] = useState(12);
  const [notes, setNotes] = useState("");
  const [expanded, setExpanded] = useState(false);

  const typeSlug = useMemo(
    () => target.toLowerCase().replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-"),
    [target]
  );

  const runGenerate = async (overrides = {}) => {
    const payload = {
      type: typeSlug,
      tone,
      language,
      industry,
      keywords: parseKeywords(keywords || notes),
      mode,
      familySeed,
      count,
      ...overrides,
    };
    return generateNames(payload);
  };

  const useName = async (name) => {
    if (selectedObject) {
      renameLayer?.(selectedObject, name);
    } else if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(name).catch(() => {});
    }
    setLastAppliedName?.(name);
  };

  const handleAutoLayer = async () => {
    const generated = await runGenerate({ type: "layer", mode: "list", count: 6 });
    if (generated?.[0]) {
      await useName(generated[0].name);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="text-violet-400" size={18} />
          <div>
            <h3 className="text-sm font-semibold text-white">Naming Assistant</h3>
            <p className="text-[11px] text-white/60">AJ generates names, systems, slogans, and file labels.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openQuickModal(typeSlug)}
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-violet-400 hover:text-violet-200"
          >
            Quick modal
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/80 transition hover:border-violet-400 hover:text-violet-200"
          >
            {expanded ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {!expanded && (
        <div className="mt-3 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-600/30 px-2 py-1 font-semibold text-white">Burst</span>
            <span>
              {tone} · {language}
            </span>
          </div>
          <button
            type="button"
            onClick={() => runGenerate({ mode: "burst" })}
            disabled={loading}
            className="flex items-center gap-1 rounded-md bg-violet-600 px-3 py-1 text-[11px] font-semibold text-white hover:bg-violet-500 disabled:opacity-60"
          >
            <Zap size={14} />
            {loading ? "Working…" : "Generate"}
          </button>
        </div>
      )}

      {expanded && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white/70">What are you naming?</span>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="rounded-lg border border-white/15 bg-[#0b0d12] px-2 py-1.5 text-sm text-white"
            >
              {TARGETS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white/70">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-white/15 bg-[#0b0d12] px-2 py-1.5 text-sm text-white"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </label>

          <label className="col-span-2 flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white/70">Tone</span>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => {
                const active = tone === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      active ? "bg-violet-600 text-white shadow-sm" : "border border-white/15 text-white/80 hover:border-violet-400"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white/70">Industry / Category</span>
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Tech, beauty, gaming..."
              className="rounded-lg border border-white/15 bg-[#0b0d12] px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white/70">Keywords</span>
            <input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="gradient, purple, luxury"
              className="rounded-lg border border-white/15 bg-[#0b0d12] px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
          </label>

          <label className="col-span-2 flex flex-col gap-1">
            <span className="text-[11px] font-semibold text-white/70">Notes / constraints</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Competitors, cultural guardrails, file extension..."
              className="min-h-[70px] rounded-lg border border-white/15 bg-[#0b0d12] px-3 py-2 text-sm text-white placeholder:text-white/40"
            />
          </label>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white/70">Mode</span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: "list", label: "10-20" },
                { id: "burst", label: "100+" },
                { id: "family", label: "Naming family" },
                { id: "slogan", label: "Slogans" },
                { id: "file", label: "File names" },
              ].map((m) => {
                const active = mode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMode(m.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      active ? "bg-violet-600 text-white shadow-sm" : "border border-white/15 text-white/80 hover:border-violet-400"
                    }`}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-white/70">How many</span>
            <input
              type="number"
              value={count}
              min={1}
              max={200}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-20 rounded-lg border border-white/15 bg-[#0b0d12] px-3 py-2 text-sm text-white"
            />
            <input
              value={familySeed}
              onChange={(e) => setFamilySeed(e.target.value)}
              className="flex-1 rounded-lg border border-white/15 bg-[#0b0d12] px-3 py-2 text-sm text-white placeholder:text-white/40"
              placeholder="Family seed"
            />
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => runGenerate()}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60 disabled:hover:bg-violet-600"
            >
              {loading ? "Generating…" : "Generate names"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleAutoLayer}
              className="flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-white/80 transition hover:border-violet-400 hover:text-violet-200"
            >
              <Wand2 size={16} />
              Auto layer
            </button>
          </div>

          <div className="col-span-2">
            <NamingResultList results={results} onUse={useName} loading={loading} error={error} lastAppliedName={lastAppliedName} />
          </div>
        </div>
      )}
    </div>
  );
}
