"use client";

import { useState } from "react";

export default function CharacterPersonaGenerator() {
  const [concept, setConcept] = useState("");
  const [role, setRole] = useState("Main character");
  const [tone, setTone] = useState("Warm, Creative");
  const [world, setWorld] = useState("Modern");
  const [keywords, setKeywords] = useState("");
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setPersona(null);

    try {
      const res = await fetch("/api/naming/characters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept,
          role,
          tone,
          world,
          keywords: keywords.split(/[,|]/).map((k) => k.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate character persona");
      }
      setPersona(data);
    } catch (err) {
      setError(err?.message || "Failed to generate character persona");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h2 className="mb-4 text-xl text-purple-300">Character Persona Engine</h2>

      <input
        placeholder="Character Concept"
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Role (e.g., Hero, Sidekick)"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Tone (e.g., Funny, Dramatic)"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="World/Setting (e.g., Futuristic City, Fantasy Kingdom)"
        value={world}
        onChange={(e) => setWorld(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <input
        placeholder="Keywords"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
      />

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Character"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {persona && (
        <div className="mt-6 max-h-[600px] space-y-4 overflow-y-scroll text-white/80">
          <h3 className="text-lg text-purple-300">{persona.name}</h3>
          <p>
            <strong>Age:</strong> {persona.age}
          </p>
          <p>{persona.summary}</p>

          <section>
            <h4 className="mt-3 text-purple-300">Personality Traits</h4>
            <ul className="ml-5 list-disc">
              {persona.personality_traits?.map((t, i) => (
                <li key={`trait-${i}`}>{t}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Backstory</h4>
            <p>{persona.backstory}</p>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Motivation</h4>
            <p>{persona.motivation}</p>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Strengths</h4>
            <ul className="ml-5 list-disc">
              {persona.strengths?.map((s, i) => (
                <li key={`strength-${i}`}>{s}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Weaknesses</h4>
            <ul className="ml-5 list-disc">
              {persona.weaknesses?.map((w, i) => (
                <li key={`weak-${i}`}>{w}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Speech Style</h4>
            <p>{persona.speech_style}</p>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Signature Phrases</h4>
            <ul className="ml-5 list-disc">
              {persona.signature_phrases?.map((p, i) => (
                <li key={`phrase-${i}`}>{p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Dialogue Samples</h4>
            <ul className="ml-5 list-disc">
              {persona.dialogue_samples?.map((d, i) => (
                <li key={`dialogue-${i}`}>{d}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Emotional Arc</h4>
            <p>{persona.emotional_arc}</p>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Visual Style</h4>
            <ul className="ml-5 list-disc">
              {persona.visual_style?.map((v, i) => (
                <li key={`visual-${i}`}>{v}</li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mt-3 text-purple-300">Relationships</h4>
            <ul className="ml-5 list-disc">
              {persona.relationships?.map((r, i) => (
                <li key={`rel-${i}`}>{r}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}
