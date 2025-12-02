"use client";

import { useState } from "react";

export default function VisualLanguageGenerator() {
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("General");
  const [personality, setPersonality] = useState("Modern, bold, futuristic");
  const [colorType, setColorType] = useState("Violet Gradient");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/visual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          industry,
          personality,
          color_type: colorType,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate visual language");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate visual language");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Visual Style Language Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Personality"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Color Type (e.g., Violet gradient primary)"
          value={colorType}
          onChange={(e) => setColorType(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Visual Language"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Colors</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.colors, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Typography</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.typography, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Shapes</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.shapes, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Icons</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.icons, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Grid</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.grid, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Elevation</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.elevation, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Motion</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.motion, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Imagery</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.imagery, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Logo Rules</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.logo_rules, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Export Tokens</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.export_tokens, null, 2)}</pre>
          </section>
        </div>
      )}
    </div>
  );
}
