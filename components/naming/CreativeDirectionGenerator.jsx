"use client";

import { useState } from "react";

export default function CreativeDirectionGenerator() {
  const [brand, setBrand] = useState("");
  const [archetype, setArchetype] = useState("Creator + Magician");
  const [tone, setTone] = useState("Futuristic, bold, expressive, glowing");
  const [medium, setMedium] = useState("Website + advertising + templates");
  const [personality, setPersonality] = useState("Modern, vivid, empowering");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/creative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          archetype,
          tone,
          medium,
          personality,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate creative direction");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate creative direction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Creative Direction Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Archetype"
          value={archetype}
          onChange={(e) => setArchetype(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Medium"
          value={medium}
          onChange={(e) => setMedium(e.target.value)}
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
          {loading ? "Generating…" : "Generate Creative Direction"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Master Concept</h3>
            <p className="whitespace-pre-line">{result.master_concept}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Mood Themes</h3>
            <ul className="ml-5 list-disc">
              {result.mood_themes?.map((m, i) => (
                <li key={`mood-${i}`}>{m}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Color Environment</h3>
            <ul className="ml-5 list-disc">
              {result.color_environment?.map((c, i) => (
                <li key={`color-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Lighting Rules</h3>
            <ul className="ml-5 list-disc">
              {result.lighting_rules?.map((l, i) => (
                <li key={`light-${i}`}>{l}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Composition Rules</h3>
            <ul className="ml-5 list-disc">
              {result.composition_rules?.map((c, i) => (
                <li key={`comp-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Motion Direction</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.motion_direction, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Photography Style</h3>
            <ul className="ml-5 list-disc">
              {result.photography_style?.map((p, i) => (
                <li key={`photo-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Illustration Style</h3>
            <ul className="ml-5 list-disc">
              {result.illustration_style?.map((ill, i) => (
                <li key={`ill-${i}`}>{ill}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Symbolism</h3>
            <ul className="ml-5 list-disc">
              {result.symbolism?.map((s, i) => (
                <li key={`sym-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Do</h3>
            <ul className="ml-5 list-disc">
              {result.do?.map((d, i) => (
                <li key={`do-${i}`}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Don't</h3>
            <ul className="ml-5 list-disc">
              {result.dont?.map((d, i) => (
                <li key={`dont-${i}`}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Campaign Concepts</h3>
            <ul className="ml-5 list-disc">
              {result.campaign_concepts?.map((c, i) => (
                <li key={`campaign-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Art Direction Summary</h3>
            <p className="whitespace-pre-line">{result.art_direction_summary}</p>
          </section>
        </div>
      )}
    </div>
  );
}
