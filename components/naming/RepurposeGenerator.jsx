"use client";

import { useState } from "react";

export default function RepurposeGenerator() {
  const [source, setSource] = useState("");
  const [type, setType] = useState("Video");
  const [tone, setTone] = useState("Friendly, Informative");
  const [audience, setAudience] = useState("Creators & Designers");
  const [amount, setAmount] = useState("High");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source,
          type,
          tone,
          audience,
          amount,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to repurpose content");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to repurpose content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Multi-Channel Content Repurposer</h2>

      <textarea
        placeholder="Paste source content (script, article, summary)..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="min-h-[140px] w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>Video</option>
        <option>Podcast</option>
        <option>Blog</option>
        <option>Livestream</option>
        <option>Course Module</option>
        <option>Voice Note</option>
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

      <select
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Repurposed Content"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Short Videos</h3>
            <ul className="ml-5 list-disc">
              {result.short_videos?.map((v, i) => (
                <li key={`sv-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Reels/TikToks</h3>
            <ul className="ml-5 list-disc">
              {result.reels_tiktoks?.map((v, i) => (
                <li key={`rt-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Threads</h3>
            <ul className="ml-5 list-disc">
              {result.threads?.map((t, i) => (
                <li key={`th-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">LinkedIn Posts</h3>
            <ul className="ml-5 list-disc">
              {result.linkedIn_posts?.map((p, i) => (
                <li key={`li-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Facebook Posts</h3>
            <ul className="ml-5 list-disc">
              {result.facebook_posts?.map((p, i) => (
                <li key={`fb-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Carousels</h3>
            <ul className="ml-5 list-disc">
              {result.carousels?.map((c, i) => (
                <li key={`car-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Quotes</h3>
            <ul className="ml-5 list-disc">
              {result.quotes?.map((q, i) => (
                <li key={`quote-${i}`}>{q}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Blog Articles</h3>
            <ul className="ml-5 list-disc">
              {result.blog_articles?.map((b, i) => (
                <li key={`blog-${i}`}>{b}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Email Newsletters</h3>
            <ul className="ml-5 list-disc">
              {result.email_newsletters?.map((e, i) => (
                <li key={`email-${i}`}>{e}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">CTA Snippets</h3>
            <ul className="ml-5 list-disc">
              {result.cta_snippets?.map((c, i) => (
                <li key={`cta-${i}`}>{c}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">SEO Titles</h3>
            <ul className="ml-5 list-disc">
              {result.seo_titles?.map((s, i) => (
                <li key={`seo-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Hashtags</h3>
            <p>
              <strong>Trending:</strong> {(result.hashtags?.trending || []).join(" ")}
            </p>
            <p>
              <strong>Niche:</strong> {(result.hashtags?.niche || []).join(" ")}
            </p>
            <p>
              <strong>Mixed:</strong> {(result.hashtags?.mixed || []).join(" ")}
            </p>
          </section>

          <section>
            <h3 className="text-purple-300">Thumbnail Titles</h3>
            <ul className="ml-5 list-disc">
              {result.thumbnail_titles?.map((t, i) => (
                <li key={`thumb-${i}`}>{t}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
