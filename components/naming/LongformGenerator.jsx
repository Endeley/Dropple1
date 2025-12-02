"use client";

import { useState } from "react";

export default function LongformGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Modern, Clear, Insightful");
  const [audience, setAudience] = useState("General Audience");
  const [length, setLength] = useState(1200);
  const [keywords, setKeywords] = useState("");
  const [format, setFormat] = useState("article");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/longform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          tone,
          audience,
          length: Number(length) || 1200,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          format,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate long-form content");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate long-form content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Long-Form Writing Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        >
          <option value="article">Article</option>
          <option value="guide">Guide</option>
          <option value="tutorial">Tutorial</option>
          <option value="blog">Blog</option>
        </select>

        <button
          onClick={generate}
          className="mt-4 rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Long-Form Content"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <h3 className="text-lg text-purple-300">Title Options</h3>
          <ul className="ml-5 list-disc">
            {result.title_options?.map((t, i) => (
              <li key={`title-${i}`}>{t}</li>
            ))}
          </ul>

          <h3 className="text-lg text-purple-300">Outline</h3>
          <ul className="ml-5 list-decimal">
            {result.outline?.map((o, i) => (
              <li key={`outline-${i}`}>{o}</li>
            ))}
          </ul>

          <h3 className="text-lg text-purple-300">Article</h3>
          <p className="whitespace-pre-line">{result.article}</p>

          <h3 className="text-lg text-purple-300">SEO Keywords</h3>
          <p>{(result.seo_keywords || []).join(", ")}</p>

          <h3 className="text-lg text-purple-300">Meta Description</h3>
          <p>{result.meta_description}</p>

          <h3 className="text-lg text-purple-300">Social Snippets</h3>
          <ul className="ml-5 list-disc">
            {result.social_snippets?.map((s, i) => (
              <li key={`snippet-${i}`}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
