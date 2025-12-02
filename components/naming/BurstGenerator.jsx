"use client";

import { useState } from "react";

export default function BurstGenerator() {
  const [concept, setConcept] = useState("");
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("Creative");
  const [count, setCount] = useState(100);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/naming/burst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          tone,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          count: Number(count) || 100,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate burst names");
      }
      setResults(data.names || []);
    } catch (err) {
      setError(err?.message || "Failed to generate burst names");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Creative Burst Mode</h2>

      <div className="grid gap-3">
        <input
          placeholder="Concept (e.g., Minimal, Neon, Nature, Luxury)"
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

        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none"
        >
          <option>Creative</option>
          <option>Bold</option>
          <option>Minimal</option>
          <option>Luxury</option>
          <option>Playful</option>
          <option>Futuristic</option>
        </select>

        <input
          type="number"
          value={count}
          min={10}
          max={500}
          onChange={(e) => setCount(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : `Generate ${count} Names`}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {results && (
        <div className="mt-5 max-h-80 overflow-y-scroll rounded-xl border border-white/5 bg-black/20 p-4">
          {results.map((n, i) => (
            <p key={`burst-${i}`} className="text-white/70">
              {n}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
