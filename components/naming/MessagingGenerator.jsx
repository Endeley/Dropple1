"use client";

import { useState } from "react";

export default function MessagingGenerator() {
  const [brand, setBrand] = useState("");
  const [industry, setIndustry] = useState("General");
  const [audience, setAudience] = useState("General Audience");
  const [tone, setTone] = useState("Modern, bold, inspiring");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/messaging", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand,
          industry,
          audience,
          tone,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate brand messaging");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate brand messaging");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Brand Messaging Generator</h2>

      <div className="grid gap-3">
        <input
          placeholder="Brand Name"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Audience"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <input
          placeholder="Tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <button
          onClick={generate}
          className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Generating…" : "Generate Messaging"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <section>
            <h3 className="text-purple-300">Mission</h3>
            <p>{result.mission}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Vision</h3>
            <p>{result.vision}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Promise</h3>
            <p>{result.promise}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Value Proposition</h3>
            <p>{result.value_proposition}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Elevator Pitches</h3>
            <p>
              <strong>Short:</strong> {result.elevator_pitch_short}
            </p>
            <p>
              <strong>Long:</strong> {result.elevator_pitch_long}
            </p>
          </section>

          <section>
            <h3 className="text-purple-300">Values</h3>
            <ul className="ml-5 list-disc">
              {result.values?.map((v, i) => (
                <li key={`val-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Messaging Pillars</h3>
            <ul className="ml-5 list-disc">
              {result.messaging_pillars?.map((p, i) => (
                <li key={`pillar-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Personality</h3>
            <ul className="ml-5 list-disc">
              {result.personality?.map((p, i) => (
                <li key={`personality-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Tone Guide</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.tone_guide, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Taglines</h3>
            <ul className="ml-5 list-disc">
              {result.taglines?.map((t, i) => (
                <li key={`tag-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-purple-300">Audience Breakdown</h3>
            <p>
              <strong>Primary:</strong> {(result.audience_breakdown?.primary || []).join(", ")}
            </p>
            <p>
              <strong>Secondary:</strong> {(result.audience_breakdown?.secondary || []).join(", ")}
            </p>
          </section>

          <section>
            <h3 className="text-purple-300">Brand Story</h3>
            <p className="whitespace-pre-line">{result.brand_story}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Origin Story</h3>
            <p className="whitespace-pre-line">{result.origin_story}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Positioning</h3>
            <p className="whitespace-pre-line">{result.positioning}</p>
          </section>

          <section>
            <h3 className="text-purple-300">Social Bios</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.social_bios, null, 2)}</pre>
          </section>

          <section>
            <h3 className="text-purple-300">Message Templates</h3>
            <pre className="whitespace-pre-wrap">{JSON.stringify(result.message_templates, null, 2)}</pre>
          </section>
        </div>
      )}
    </div>
  );
}
