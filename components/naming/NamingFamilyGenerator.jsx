"use client";

import { useState } from "react";

export default function NamingFamilyGenerator() {
  const [base, setBase] = useState("");
  const [tone, setTone] = useState("Modern");
  const [keywords, setKeywords] = useState("brand, template");
  const [language, setLanguage] = useState("English");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/naming/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          base,
          tone,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate naming family");
      }
      setResults(data);
    } catch (err) {
      setError(err?.message || "Failed to generate naming family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-2 text-xl text-purple-300">Naming Family Generator</h2>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-white/70">Base Name</label>
          <input
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="Base Name (e.g., Titan)"
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70">Tone</label>
          <input
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white/70">Language</label>
          <input
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-white/70">Keywords</label>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="brand, template"
            className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
          />
        </div>
      </div>

      <button
        onClick={generate}
        className="mt-3 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Family"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {results && (
        <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-white/80">
          <section>
            <h3 className="mb-1 text-purple-300">Base Names</h3>
            {results.base_names?.map((n, i) => (
              <p key={`base-${i}`}>{n}</p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Series</h3>
            {results.series?.map((n, i) => (
              <p key={`series-${i}`}>{n}</p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Variants</h3>
            {results.variants?.map((n, i) => (
              <p key={`variant-${i}`}>{n}</p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Editions</h3>
            {results.editions?.map((n, i) => (
              <p key={`edition-${i}`}>{n}</p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">Short Codes</h3>
            {results.short_codes?.map((n, i) => (
              <p key={`code-${i}`}>{n}</p>
            ))}
          </section>

          <section>
            <h3 className="mb-1 text-purple-300">UI Versions</h3>
            {results.ui_versions?.map((n, i) => (
              <p key={`ui-${i}`}>{n}</p>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
