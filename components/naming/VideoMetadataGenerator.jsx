"use client";

import { useState } from "react";

export default function VideoMetadataGenerator() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Friendly, Modern");
  const [platform, setPlatform] = useState("YouTube");
  const [target, setTarget] = useState("General audience");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          tone,
          platform,
          target,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate video metadata");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate video metadata");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Video Metadata Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Video Topic"
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

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        >
          <option>YouTube</option>
          <option>TikTok</option>
          <option>Instagram Reels</option>
          <option>Facebook Video</option>
          <option>Pinterest Video</option>
          <option>Vimeo</option>
        </select>

        <input
          placeholder="Target Audience"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Keywords (comma separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Metadata"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Titles</h3>
            <ul className="ml-5 list-disc">
              {result.title_options?.map((t, i) => (
                <li key={`title-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Long Description</h3>
            <p className="whitespace-pre-line">{result.description_long}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Short Description</h3>
            <p>{result.description_short}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Chapters</h3>
            <ul className="ml-5 list-disc">
              {result.chapters?.map((c, i) => (
                <li key={`chapter-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Tags</h3>
            <p>{(result.tags || []).join(", ")}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Hashtags</h3>
            <p>{(result.hashtags || []).join(" ")}</p>
          </section>

          <section>
            <h3 className="text-purple-300">CTA Block</h3>
            <pre className="whitespace-pre-wrap">{result.cta_block}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Affiliate Block</h3>
            <pre className="whitespace-pre-wrap">{result.affiliate_block}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Notes</h3>
            <p>{result.notes}</p>
          </section>
        </div>
      )}
    </div>
  );
}
