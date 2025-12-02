"use client";

import { useState } from "react";

export default function ProductDescriptionGenerator() {
  const [product, setProduct] = useState("");
  const [tone, setTone] = useState("Modern, Clean, Premium");
  const [audience, setAudience] = useState("General Consumers");
  const [industry, setIndustry] = useState("E-commerce");
  const [keywords, setKeywords] = useState("");

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/naming/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          tone,
          audience,
          industry,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate product copy");
      }
      setResults(data);
    } catch (err) {
      setError(err?.message || "Failed to generate product copy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-xl text-purple-300">Product Description Engine</h2>

      <input
        placeholder="Product Name / Description"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Tone (e.g., Luxury Minimal)"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Audience"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Industry (e.g., Tech, Beauty, Fashion)"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Keywords (comma separated)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Product Copy"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {results && (
        <div className="mt-6 max-h-[500px] space-y-6 overflow-y-scroll text-white/80">
          <h3 className="text-lg text-purple-300">{results.title}</h3>

          <p className="text-white/70">{results.short_description}</p>
          <p className="text-white/60">{results.long_description}</p>

          <div>
            <h4 className="mt-4 text-purple-300">Features</h4>
            <ul className="ml-5 list-disc">
              {results.features?.map((f, i) => (
                <li key={`feat-${i}`}>{f}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mt-4 text-purple-300">Benefits</h4>
            <ul className="ml-5 list-disc">
              {results.benefits?.map((b, i) => (
                <li key={`benefit-${i}`}>{b}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mt-4 text-purple-300">SEO Keywords</h4>
            <ul className="ml-5 list-disc">
              {results.seo_keywords?.map((k, i) => (
                <li key={`seo-${i}`}>{k}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mt-4 text-purple-300">CTA</h4>
            <ul className="ml-5 list-disc">
              {results.cta?.map((c, i) => (
                <li key={`cta-${i}`}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
