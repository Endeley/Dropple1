"use client";

import { useState } from "react";
import NamingInput from "./NamingInput";
import NamingToneSelector from "./NamingToneSelector";
import NamingResultCard from "./NamingResultCard";

const parseKeywords = (keywords = "") =>
  `${keywords}`
    .split(/[,|]/)
    .map((k) => k.trim())
    .filter(Boolean);

export default function SidebarNamingAssistant() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Brand");
  const [keywords, setKeywords] = useState("");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Luxury");

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/naming/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          tone,
          keywords: parseKeywords(keywords),
          language,
          count: 12,
        }),
      });
      const data = await res.json();
      setResults(Array.isArray(data?.results) ? data.results : []);
    } catch (error) {
      console.error("Naming generate failed", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="flex h-full w-80 flex-col gap-4 overflow-y-auto border-l border-white/10 bg-black/30 p-4 backdrop-blur-xl">
      <h2 className="bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-xl font-semibold text-transparent">
        Naming Assistant
      </h2>

      <NamingInput
        typeValue={type}
        keywordsValue={keywords}
        languageValue={language}
        onTypeChange={setType}
        onKeywordsChange={setKeywords}
        onLanguageChange={setLanguage}
      />

      <NamingToneSelector value={tone} onChange={setTone} />

      <button
        onClick={handleGenerate}
        className="rounded-xl bg-gradient-to-r from-purple-500 to-violet-700 py-2 text-white shadow-lg transition hover:opacity-90"
        type="button"
      >
        {loading ? "Generating..." : "Generate Names"}
      </button>

      <div className="mt-2 flex flex-col gap-3">
        {results.map((item, i) => (
          <NamingResultCard key={`${item.name}-${i}`} data={item} />
        ))}
      </div>
    </aside>
  );
}
