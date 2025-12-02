"use client";

import { useState } from "react";

export default function ConceptArtGenerator() {
  const [brand, setBrand] = useState("");
  const [archetype, setArchetype] = useState("Creator + Magician");
  const [creativeDirection, setCreativeDirection] = useState("Futuristic glow, abstract shapes, expressive gradients");
  const [purpose, setPurpose] = useState("Templates, landing pages, campaigns");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/concept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          archetype,
          creative_direction: creativeDirection,
          purpose,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate concept art direction");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate concept art direction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Concept Art & Visual Metaphor Engine</h2>

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
          placeholder="Creative Direction"
          value={creativeDirection}
          onChange={(e) => setCreativeDirection(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />
        <input
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Concept Art Direction"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Master Metaphor</h3>
            <p className="whitespace-pre-line">{result.master_metaphor}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Concept Categories</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.concept_categories, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Symbol Library</h3>
            <ul className="ml-5 list-disc">
              {result.symbol_library?.map((s, i) => (
                <li key={`sym-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Composition Frameworks</h3>
            <ul className="ml-5 list-disc">
              {result.composition_frameworks?.map((c, i) => (
                <li key={`comp-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Camera Directions</h3>
            <ul className="ml-5 list-disc">
              {result.camera_directions?.map((c, i) => (
                <li key={`cam-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Materials</h3>
            <ul className="ml-5 list-disc">
              {result.materials?.map((m, i) => (
                <li key={`mat-${i}`}>{m}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Textures</h3>
            <ul className="ml-5 list-disc">
              {result.textures?.map((t, i) => (
                <li key={`tex-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Template Concepts</h3>
            <ul className="ml-5 list-disc">
              {result.template_concepts?.map((t, i) => (
                <li key={`tpl-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Animation Concepts</h3>
            <ul className="ml-5 list-disc">
              {result.animation_concepts?.map((a, i) => (
                <li key={`anim-${i}`}>{a}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Visual Stories</h3>
            <ul className="ml-5 list-disc">
              {result.visual_stories?.map((v, i) => (
                <li key={`story-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Concept Summary</h3>
            <p className="whitespace-pre-line">{result.concept_summary}</p>
          </section>
        </div>
      )}
    </div>
  );
}
