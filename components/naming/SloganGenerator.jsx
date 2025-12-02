"use client";

import { useState } from "react";

export default function SloganGenerator() {
  const [name, setName] = useState("");
  const [tone, setTone] = useState("Creative");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/naming/slogan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          tone,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          audience,
          count: 12,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate slogans");
      }
      setResults(data);
    } catch (err) {
      setError(err?.message || "Failed to generate slogans");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Slogan & Tagline Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Brand / Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          <option>Creative</option>
          <option>Bold</option>
          <option>Minimal</option>
          <option>Luxury</option>
          <option>Playful</option>
          <option>Futuristic</option>
          <option>Inspirational</option>
        </select>

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Taglines"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {results && (
        <div className="mt-5 grid grid-cols-2 gap-4">
          <section>
            <h3 className="mb-1 text-purple-300">Hero Taglines</h3>
            {results.hero?.map((t, i) => (
              <p key={`hero-${i}`} className="text-white/70">
                {t}
              </p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Short Slogans</h3>
            {results.short?.map((t, i) => (
              <p key={`short-${i}`} className="text-white/70">
                {t}
              </p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">CTA Lines</h3>
            {results.cta?.map((t, i) => (
              <p key={`cta-${i}`} className="text-white/70">
                {t}
              </p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Marketing Lines</h3>
            {results.marketing?.map((t, i) => (
              <p key={`marketing-${i}`} className="text-white/70">
                {t}
              </p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Value-Based Lines</h3>
            {results.value_based?.map((t, i) => (
              <p key={`value-${i}`} className="text-white/70">
                {t}
              </p>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
