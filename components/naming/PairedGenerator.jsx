"use client";

import { useState } from "react";

export default function PairedGenerator() {
  const [concept, setConcept] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Futuristic");
  const [audience, setAudience] = useState("");
  const [count, setCount] = useState(10);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/naming/paired", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          tone,
          audience,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          count: Number(count) || 10,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate brand systems");
      }
      setResults(data.systems || []);
    } catch (err) {
      setError(err?.message || "Failed to generate brand systems");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Paired Naming + Slogan Systems</h2>

      <div className="grid gap-3">
        <input
          placeholder="Concept (e.g., Futuristic Purple Minimalism)"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Keywords (comma or | separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Target Audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none"
        >
          <option>Futuristic</option>
          <option>Minimal</option>
          <option>Creative</option>
          <option>Luxury</option>
          <option>Playful</option>
          <option>Bold</option>
        </select>

        <input
          type="number"
          value={count}
          min={1}
          max={50}
          onChange={(e) => setCount(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : `Generate ${count} Brand Systems`}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {results && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          {results.map((sys, i) => (
            <div key={`paired-${i}`} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-lg font-semibold text-purple-300">{sys.name}</h3>
              <p className="text-sm italic text-white/60">{sys.meaning}</p>

              <div className="mt-2 space-y-1 text-white/80">
                <p>
                  <strong>Slogan:</strong> {sys.short_slogan}
                </p>
                <p>
                  <strong>Tagline:</strong> {sys.hero_tagline}
                </p>
                <p>
                  <strong>CTA:</strong> {sys.cta}
                </p>
              </div>

              <div className="mt-3 text-white/70">
                <strong>Variants:</strong>
                <ul className="ml-5 list-disc">
                  {sys.variants?.map((v, idx) => (
                    <li key={`variant-${i}-${idx}`}>{v}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-3 text-white/70">
                <strong>Color Themes:</strong>
                <ul className="ml-5 list-disc">
                  {sys.color_themes?.map((v, idx) => (
                    <li key={`color-${i}-${idx}`}>{v}</li>
                  ))}
                </ul>
              </div>

              <p className="mt-3 text-white/80">
                <strong>Brand Story:</strong> {sys.brand_story}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
