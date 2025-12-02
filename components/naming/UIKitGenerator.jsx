"use client";

import { useState } from "react";

export default function UIKitGenerator() {
  const [brand, setBrand] = useState("");
  const [visualStyle, setVisualStyle] = useState("Neon + gradient glow");
  const [archetype, setArchetype] = useState("Creator + Magician");
  const [tokens, setTokens] = useState("Violet primary, glow shadows, rounded radius");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/uikit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          visual_style: visualStyle,
          archetype,
          tokens,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate UI kit");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate UI kit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">UI Kit Generator</h2>

      <div className="grid gap-3">
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Visual Style"
          value={visualStyle}
          onChange={(e) => setVisualStyle(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Archetype"
          value={archetype}
          onChange={(e) => setArchetype(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Tokens (colors, radius, shadows, spacing)"
          value={tokens}
          onChange={(e) => setTokens(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate UI Kit"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Component Categories</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.component_categories, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Components</h3>
            <ul className="ml-5 list-disc">
              {result.components?.map((c, i) => (
                <li key={`component-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Tokens Used</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.tokens_used, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Component Examples</h3>
            <ul className="ml-5 list-disc">
              {result.component_examples?.map((c, i) => (
                <li key={`example-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Design Rules</h3>
            <ul className="ml-5 list-disc">
              {result.design_rules?.map((d, i) => (
                <li key={`rule-${i}`}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Code Export</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.code_export, null, 2)}</pre>
          </section>
        </div>
      )}
    </div>
  );
}
