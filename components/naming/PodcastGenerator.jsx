"use client";

import { useState } from "react";

export default function PodcastGenerator() {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Warm, Confident");
  const [type, setType] = useState("Solo");
  const [length, setLength] = useState(20);
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
      const res = await fetch("/api/naming/podcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          topic,
          tone,
          type,
          length: Number(length) || 20,
          characters: parseCharacters(),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate podcast script");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate podcast script");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Podcast Script Engine</h2>

      <input
        placeholder="Show Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Episode Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Tone"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>Solo</option>
        <option>Interview</option>
        <option>Co-Host</option>
        <option>Narrative Drama</option>
        <option>Educational Lecture</option>
      </select>

      <input
        type="number"
        placeholder="Length (minutes)"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <textarea
        placeholder="Characters (JSON array for interview/drama)"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
        className="mt-3 min-h-[100px] w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Podcast Script"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <h3 className="text-purple-300">Cold Open</h3>
          <pre className="whitespace-pre-wrap">{result.cold_open}</pre>

          <h3 className="text-purple-300">Intro</h3>
          <pre className="whitespace-pre-wrap">{result.intro}</pre>

          <h3 className="text-purple-300">Segments</h3>
          <ul className="ml-5 list-disc">
            {result.segments?.map((s, i) => (
              <li key={`seg-${i}`}>
                <strong>{s.title}</strong>
                <p className="whitespace-pre-wrap">{s.content}</p>
              </li>
            ))}
          </ul>

          <h3 className="text-purple-300">CTA</h3>
          <p>{result.cta}</p>

          <h3 className="text-purple-300">Outro</h3>
          <p>{result.outro}</p>

          <h3 className="text-purple-300">Show Notes</h3>
          <p>{result.show_notes}</p>

          <h3 className="text-purple-300">Timestamps</h3>
          <ul className="ml-5 list-disc">
            {result.timestamps?.map((t, i) => (
              <li key={`ts-${i}`}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
