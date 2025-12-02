"use client";

import { useState } from "react";

export default function SocialEngine() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Bold, Modern");
  const [platform, setPlatform] = useState("Instagram");
  const [target, setTarget] = useState("General Audience");
  const [keywords, setKeywords] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/social", {
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
        throw new Error(data?.error || "Failed to generate social content");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate social content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Social Caption & Hashtag Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Tone (e.g., Bold, Minimal)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        >
          <option>Instagram</option>
          <option>TikTok</option>
          <option>X</option>
          <option>YouTube</option>
          <option>Facebook</option>
          <option>Pinterest</option>
          <option>LinkedIn</option>
        </select>

        <input
          placeholder="Target Audience"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Keywords (comma-separated)"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Social Copy"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <div>
            <h3 className="text-purple-300">Hooks</h3>
            <ul className="ml-5 list-disc">
              {result.hooks?.map((h, i) => (
                <li key={`hook-${i}`}>{h}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-purple-300">Short Caption</h3>
            <p>{result.short_caption}</p>
          </div>

          <div>
            <h3 className="text-purple-300">Long Caption</h3>
            <p className="whitespace-pre-line">{result.long_caption}</p>
          </div>

          <div>
            <h3 className="text-purple-300">Hashtags</h3>
            <p>{(result.hashtags || []).join(" ")}</p>
          </div>

          <div>
            <h3 className="text-purple-300">Emoji Pack</h3>
            <p>{(result.emoji_pack || []).join(" ")}</p>
          </div>

          <div>
            <h3 className="text-purple-300">CTA</h3>
            <p>{result.cta}</p>
          </div>
        </div>
      )}
    </div>
  );
}
