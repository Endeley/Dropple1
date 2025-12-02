"use client";

import { useState } from "react";

export default function BrandDNAEngine() {
  const [concept, setConcept] = useState("");
  const [tone, setTone] = useState("Modern, Creative, Elegant");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState("");

  const [dna, setDna] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setDna(null);

    try {
      const res = await fetch("/api/naming/branddna", {
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
        throw new Error(data?.error || "Failed to generate brand DNA");
      }
      setDna(data);
    } catch (err) {
      setError(err?.message || "Failed to generate brand DNA");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Brand Values & Personality Engine</h2>

      <div className="grid gap-3">
        <input
          placeholder="Concept (e.g., African Futuristic Creative Studio)"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Tone (e.g., Modern, Creative, Elegant)"
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
          placeholder="Keywords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Brand DNA"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {dna && (
        <div className="mt-6 space-y-4 text-white/80">
          <div>
            <h3 className="text-purple-300">Brand Values</h3>
            <ul className="ml-5 list-disc">
              {dna.values?.map((v, i) => (
                <li key={`value-${i}`}>{v}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-purple-300">Personality</h3>
            <ul className="ml-5 list-disc">
              {dna.personality?.map((v, i) => (
                <li key={`persona-${i}`}>{v}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-purple-300">Voice Principles</h3>
            <ul className="ml-5 list-disc">
              {dna.voice_principles?.map((v, i) => (
                <li key={`vp-${i}`}>{v}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-purple-300">Tone Rules</h3>
            <p>
              <strong>Tone:</strong> {dna.tone_rules?.tone}
            </p>
            <p className="mt-2 font-semibold">Do:</p>
            <ul className="ml-5 list-disc">
              {dna.tone_rules?.do?.map((v, i) => (
                <li key={`do-${i}`}>{v}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Don’t:</p>
            <ul className="ml-5 list-disc">
              {dna.tone_rules?.dont?.map((v, i) => (
                <li key={`dont-${i}`}>{v}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-purple-300">Mission</h3>
            <p>{dna.mission}</p>
          </div>

          <div>
            <h3 className="text-purple-300">Positioning</h3>
            <p>{dna.positioning}</p>
          </div>

          <div>
            <h3 className="text-purple-300">Writing Examples</h3>
            <p>
              <strong>Headline:</strong> {dna.writing_examples?.headline}
            </p>
            <p>
              <strong>Sentence:</strong> {dna.writing_examples?.sentence}
            </p>
            <p>
              <strong>CTA:</strong> {dna.writing_examples?.cta}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
