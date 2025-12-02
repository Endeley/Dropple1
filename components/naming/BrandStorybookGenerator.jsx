"use client";

import { useState } from "react";

export default function BrandStorybookGenerator() {
  const [concept, setConcept] = useState("");
  const [tone, setTone] = useState("Modern, Creative, Elegant");
  const [audience, setAudience] = useState("Global Creative Audience");
  const [keywords, setKeywords] = useState("");
  const [storybook, setStorybook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setStorybook(null);

    try {
      const res = await fetch("/api/naming/storybook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          tone,
          audience,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate storybook");
      }
      setStorybook(data);
    } catch (err) {
      setError(err?.message || "Failed to generate storybook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Brand Storybook Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Concept (e.g., Neo African Futurism)"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Keywords (optional)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating Storybook…" : "Generate Storybook"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {storybook && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll text-white/80">
          <section>
            <h3 className="text-purple-300">Brand Story</h3>
            <p>{storybook.brand_story}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Mission & Vision</h3>
            <p>
              <strong>Mission:</strong> {storybook.mission}
            </p>
            <p>
              <strong>Vision:</strong> {storybook.vision}
            </p>
          </section>

          <section>
            <h3 className="text-purple-300">Core Values</h3>
            <ul className="ml-5 list-disc">
              {storybook.values?.map((v, i) => (
                <li key={`value-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Personality</h3>
            <ul className="ml-5 list-disc">
              {storybook.personality?.map((p, i) => (
                <li key={`persona-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Voice & Tone</h3>
            <p>
              <strong>Tone:</strong> {storybook.voice?.tone}
            </p>
            <ul className="ml-5 mt-2 list-disc">
              {storybook.voice?.principles?.map((v, i) => (
                <li key={`vp-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Examples:</strong>
            </p>
            <ul className="ml-5 list-disc">
              <li>Headline: {storybook.voice?.examples?.headline}</li>
              <li>Tagline: {storybook.voice?.examples?.tagline}</li>
              <li>CTA: {storybook.voice?.examples?.cta}</li>
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Messaging</h3>
            <p>
              <strong>Positioning:</strong> {storybook.messaging?.positioning}
            </p>
            <p className="mt-2">
              <strong>Pillars:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.messaging?.pillars?.map((v, i) => (
                <li key={`pillar-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Taglines:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.messaging?.taglines?.map((v, i) => (
                <li key={`tag-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Visual Style</h3>
            <p>
              <strong>Colors:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.visuals?.color_palette?.map((v, i) => (
                <li key={`color-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Typography:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.visuals?.typography?.map((v, i) => (
                <li key={`type-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Imagery Style:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.visuals?.imagery_style?.map((v, i) => (
                <li key={`img-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Applications</h3>
            <p>
              <strong>Ads:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.applications?.ads?.map((v, i) => (
                <li key={`ad-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Social:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.applications?.social?.map((v, i) => (
                <li key={`social-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Website:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.applications?.website?.map((v, i) => (
                <li key={`web-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Logo Usage:</strong>
            </p>
            <ul className="ml-5 list-disc">
              {storybook.applications?.logo_usage?.map((v, i) => (
                <li key={`logo-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2">
              <strong>Spacing Rules:</strong> {storybook.applications?.spacing_rules}
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
