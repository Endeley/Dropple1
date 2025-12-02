"use client";

import { useState } from "react";

export default function VoicePersonaGenerator() {
  const [personality, setPersonality] = useState("Apple");
  const [tone, setTone] = useState("Minimal, Elegant, Clean");
  const [context, setContext] = useState("Hero Headline");
  const [keywords, setKeywords] = useState("");
  const [length, setLength] = useState("short");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personality,
          tone,
          context,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          length,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate voice copy");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate voice copy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Voice & Persona Copywriting Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Personality (e.g., Apple, Nike, African Futuristic)"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Tone description"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Context (headline, caption, paragraph)"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <select
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none"
        >
          <option>short</option>
          <option>medium</option>
          <option>long</option>
          <option>headline</option>
          <option>caption</option>
          <option>paragraph</option>
        </select>

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Writing…" : "Generate Voice Text"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-lg italic text-white/80">{result.text}</p>
          <p className="mt-3 text-sm text-white/50">Explanation: {result.explanation}</p>
        </div>
      )}
    </div>
  );
}
