"use client";

import { useState } from "react";

export default function AdVariantGenerator() {
  const [product, setProduct] = useState("");
  const [platform, setPlatform] = useState("Meta Ads");
  const [tone, setTone] = useState("Bold, Modern");
  const [audience, setAudience] = useState("General Buyers");
  const [keywords, setKeywords] = useState("");
  const [count, setCount] = useState(12);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          platform,
          tone,
          audience,
          count: Number(count) || 12,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate ad variants");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate ad variants");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Ad Variant Generator</h2>

      <input
        placeholder="Product / Offer"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>Meta Ads</option>
        <option>TikTok Ads</option>
        <option>Google Ads</option>
        <option>YouTube Ads</option>
        <option>Pinterest Ads</option>
        <option>Twitter/X Ads</option>
        <option>LinkedIn Ads</option>
      </select>

      <input
        placeholder="Tone"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Audience"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        type="number"
        placeholder="Count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Ad Variants"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Primary Text</h3>
            <ul className="ml-5 list-disc">
              {result.primary_text?.map((p, i) => (
                <li key={`pt-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Headlines</h3>
            <ul className="ml-5 list-disc">
              {result.headlines?.map((h, i) => (
                <li key={`head-${i}`}>{h}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Descriptions</h3>
            <ul className="ml-5 list-disc">
              {result.descriptions?.map((d, i) => (
                <li key={`desc-${i}`}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Hooks</h3>
            <ul className="ml-5 list-disc">
              {result.hooks?.map((h, i) => (
                <li key={`hook-${i}`}>{h}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Call To Action</h3>
            <ul className="ml-5 list-disc">
              {result.cta?.map((c, i) => (
                <li key={`cta-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Short Video Scripts</h3>
            <ul className="ml-5 list-disc">
              {result.script_variants?.map((s, i) => (
                <li key={`script-${i}`}>{s}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
