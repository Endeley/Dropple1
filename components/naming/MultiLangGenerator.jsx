"use client";

import { useState } from "react";

export default function MultiLangGenerator() {
  const [text, setText] = useState("");
  const [languages, setLanguages] = useState("French, Arabic, Yoruba");
  const [personality, setPersonality] = useState("Modern Creative");
  const [tone, setTone] = useState("Minimal Elegant");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/naming/multilang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          languages: languages.split(/[,|]/).map((l) => l.trim()).filter(Boolean),
          personality,
          tone,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate multilingual copy");
      }
      setResults(data.translations || []);
    } catch (err) {
      setError(err?.message || "Failed to generate multilingual copy");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-3 text-xl text-purple-300">Multi-Language Copy Engine</h2>

      <div className="grid gap-3">
        <textarea
          placeholder="Enter text to translate"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Languages (comma or | separated)"
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Brand Personality"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <input
          placeholder="Tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <button
          onClick={generate}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Translating…" : "Translate"}
        </button>
      </div>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {results && (
        <div className="mt-6 space-y-4">
          {results.map((t, i) => (
            <div key={`ml-${i}`} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <h3 className="text-purple-300">{t.language}</h3>
              <p className="mt-2 text-white/80">{t.text}</p>
              {t.notes && (
                <p className="mt-3 text-sm italic text-white/40">
                  Notes: {t.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
