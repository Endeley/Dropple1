"use client";

import { useState } from "react";
import { industryPresets } from "@/lib/naming/industry/industryPresets";

const labelize = (key) => key.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());

export default function IndustryCopyGenerator() {
  const [industry, setIndustry] = useState("tech_saas");
  const [context, setContext] = useState("Landing Page Hero");
  const [tone, setTone] = useState("");
  const [keywords, setKeywords] = useState("");
  const [count, setCount] = useState(5);
  const [language, setLanguage] = useState("English");

  const preset = industryPresets[industry] || {};

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/industry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry,
          context,
          tone: tone || preset.tone,
          brand_tone: preset.tone,
          keywords: [
            ...(preset.keywords || []),
            ...keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          ],
          count: Number(count) || 5,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate industry copy");
      }
      setResult(data.copies || []);
    } catch (err) {
      setError(err?.message || "Failed to generate industry copy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Industry-Specific Copy Engine</h2>

      <div className="grid gap-3">
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none"
        >
          {Object.keys(industryPresets).map((ind) => (
            <option key={ind} value={ind}>
              {labelize(ind)}
            </option>
          ))}
        </select>

        <input
          placeholder="Context (e.g., Social Ad, Poster, Landing Hero)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Additional Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          type="number"
          value={count}
          min={1}
          max={20}
          onChange={(e) => setCount(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Language (e.g., English, French, Yoruba)"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Industry Copy"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[500px] space-y-6 overflow-y-scroll">
          {result.map((c, i) => (
            <div key={`ind-${i}`} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-purple-300">{c.headline}</h3>
              <p className="mt-1 text-white/70">{c.subheadline}</p>
              <p className="mt-2 text-white/60">{c.body}</p>
              <p className="mt-3 font-semibold text-purple-400">{c.cta}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
