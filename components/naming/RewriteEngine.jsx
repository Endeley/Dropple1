"use client";

import { useState } from "react";

export default function RewriteEngine() {
  const [text, setText] = useState("");
  const [goal, setGoal] = useState("More professional");
  const [tone, setTone] = useState("Modern, Clean");
  const [personality, setPersonality] = useState("");
  const [industry, setIndustry] = useState("");
  const [format, setFormat] = useState("headline");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          goal,
          tone,
          personality,
          industry,
          format,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to rewrite text");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to rewrite text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-xl text-purple-300">Context-Aware Rewrite Engine</h2>

      <textarea
        placeholder="Enter text to rewrite…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[120px] w-full rounded-md border border-white/10 bg-white/5 p-3 text-white outline-none placeholder:text-white/40"
      />

      <div className="mt-4 grid grid-cols-2 gap-3">
        <input
          placeholder="Rewrite Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Tone (e.g., Minimal, Luxury)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Brand Personality (optional)"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Industry (optional)"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none"
        >
          <option>headline</option>
          <option>caption</option>
          <option>sentence</option>
          <option>paragraph</option>
          <option>cta</option>
        </select>
      </div>

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Rewriting…" : "Rewrite"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="text-lg text-white/90">{result.rewritten}</p>
          <p className="mt-2 text-sm italic text-white/40">{result.explanation}</p>
        </div>
      )}
    </div>
  );
}
