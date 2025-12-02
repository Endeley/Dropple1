"use client";

import { useState } from "react";

export default function ScriptGenerator() {
  const [type, setType] = useState("YouTube Tutorial");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Modern, Energetic");
  const [audience, setAudience] = useState("General viewers");
  const [length, setLength] = useState(120);
  const [characters, setCharacters] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseCharacters = () => {
    if (!characters.trim()) return [];
    try {
      return JSON.parse(characters);
    } catch {
      return [];
    }
  };

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          topic,
          tone,
          audience,
          length: Number(length) || 120,
          characters: parseCharacters(),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate script");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate script");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Script Writing Engine</h2>

      <div className="grid gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        >
          <option>YouTube Tutorial</option>
          <option>YouTube Review</option>
          <option>Shortform Ad (15s)</option>
          <option>Animation Episode</option>
          <option>Explainer Video</option>
          <option>Voiceover Narration</option>
        </select>

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
          placeholder="Length (seconds or words)"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2"
        />

        <textarea
          placeholder='Characters (JSON array), e.g. [{"name": "Aisha"}, {"name": "Milo"}]'
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          className="min-h-[100px] rounded-md border border-white/10 bg-white/5 p-2"
        />
      </div>

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Script"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <h3 className="text-purple-300">Titles</h3>
          <ul className="ml-5 list-disc">
            {result.title_options?.map((t, i) => (
              <li key={`title-${i}`}>{t}</li>
            ))}
          </ul>

          <h3 className="text-purple-300">Logline</h3>
          <p>{result.logline}</p>

          <h3 className="text-purple-300">Hook</h3>
          <p>{result.hook}</p>

          <h3 className="text-purple-300">Outline</h3>
          <ul className="ml-5 list-disc">
            {result.outline?.map((o, i) => (
              <li key={`outline-${i}`}>{o}</li>
            ))}
          </ul>

          <h3 className="text-purple-300">Script</h3>
          <pre className="whitespace-pre-wrap">{result.script}</pre>

          <h3 className="text-purple-300">Short Version</h3>
          <pre className="whitespace-pre-wrap">{result.short_version}</pre>

          <h3 className="text-purple-300">CTA</h3>
          <p>{result.cta}</p>

          <h3 className="text-purple-300">Notes</h3>
          <p>{result.notes}</p>
        </div>
      )}
    </div>
  );
}
