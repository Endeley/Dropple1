"use client";

import { useState } from "react";

export default function TemplateThemeGenerator() {
  const [brand, setBrand] = useState("");
  const [visualStyle, setVisualStyle] = useState("Neon Futurism + Gradient Intelligence");
  const [archetype, setArchetype] = useState("Creator + Magician");
  const [conceptArt, setConceptArt] = useState("Light metaphors, glowing shapes, abstract morphing");
  const [categories, setCategories] = useState("Social, Marketing, Branding, UI, Animation");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/templates/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          visual_style: visualStyle,
          archetype,
          concept_art: conceptArt,
          categories,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate template theme");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate template theme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Template Theme Generator</h2>

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
          placeholder="Concept Art"
          value={conceptArt}
          onChange={(e) => setConceptArt(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Categories (comma separated)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Template Theme"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Theme Name</h3>
            <p className="whitespace-pre-line">{result.theme_name}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Theme Variants</h3>
            <ul className="ml-5 list-disc">
              {result.theme_variants?.map((v, i) => (
                <li key={`variant-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Template Categories</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.template_categories, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Template Examples</h3>
            <ul className="ml-5 list-disc">
              {result.template_examples?.map((t, i) => (
                <li key={`example-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Shape Language</h3>
            <ul className="ml-5 list-disc">
              {result.shape_language?.map((s, i) => (
                <li key={`shape-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Animation Hooks</h3>
            <ul className="ml-5 list-disc">
              {result.animation_hooks?.map((a, i) => (
                <li key={`anim-${i}`}>{a}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Color Usage Rules</h3>
            <ul className="ml-5 list-disc">
              {result.color_usage_rules?.map((c, i) => (
                <li key={`color-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Type Usage Rules</h3>
            <ul className="ml-5 list-disc">
              {result.type_usage_rules?.map((t, i) => (
                <li key={`type-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Special Effects</h3>
            <ul className="ml-5 list-disc">
              {result.special_effects?.map((s, i) => (
                <li key={`effect-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Naming Scheme</h3>
            <ul className="ml-5 list-disc">
              {result.naming_scheme?.map((n, i) => (
                <li key={`name-${i}`}>{n}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Export Pack</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.export_pack, null, 2)}</pre>
          </section>
        </div>
      )}
    </div>
  );
}
