"use client";

import { useState } from "react";

export default function ArchetypeGenerator() {
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("General");
  const [personality, setPersonality] = useState("Modern, Creative, Empowering");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/archetype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          industry,
          personality,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate archetype");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate archetype");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Brand Archetype Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Brand Name"
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

        <button
          onClick={generate}
          className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Archetype"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Primary Archetype</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.primary_archetype, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Secondary Archetype</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.secondary_archetype, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Tertiary Archetype</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.tertiary_archetype, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Brand Drivers</h3>
            <ul className="ml-5 list-disc">
              {result.brand_drivers?.map((d, i) => (
                <li key={`drv-${i}`}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Emotional Triggers</h3>
            <ul className="ml-5 list-disc">
              {result.emotional_triggers?.map((t, i) => (
                <li key={`trigger-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Voice</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.voice, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Visual Alignment</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.visual_alignment, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Story Themes</h3>
            <ul className="ml-5 list-disc">
              {result.story_themes?.map((s, i) => (
                <li key={`story-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Taglines</h3>
            <ul className="ml-5 list-disc">
              {result.taglines?.map((t, i) => (
                <li key={`tag-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Archetype Summary</h3>
            <p className="whitespace-pre-line">{result.archetype_summary}</p>
          </section>
        </div>
      )}
    </div>
  );
}
