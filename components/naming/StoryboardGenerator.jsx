"use client";

import { useState } from "react";

export default function StoryboardGenerator() {
  const [script, setScript] = useState("");
  const [style, setStyle] = useState("Clean Minimal Animation");
  const [aspect, setAspect] = useState("16:9");
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
      const res = await fetch("/api/naming/storyboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          script,
          style,
          aspect,
          characters: parseCharacters(),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate storyboard");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate storyboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Storyboard Engine</h2>

      <textarea
        placeholder="Paste script here..."
        value={script}
        onChange={(e) => setScript(e.target.value)}
        className="min-h-[150px] w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Art Style"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Aspect Ratio (e.g., 16:9)"
        value={aspect}
        onChange={(e) => setAspect(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <textarea
        placeholder='Characters (JSON), e.g. [{"name":"Aisha"},{"name":"Milo"}]'
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
        className="mt-3 min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Storyboard"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <h3 className="text-purple-300">Scenes</h3>
          {result.scenes?.map((scene, i) => (
            <div key={`scene-${i}`} className="rounded-md bg-white/10 p-3">
              <h4 className="font-bold text-purple-200">
                Scene {scene.scene_number}: {scene.title}
              </h4>
              <p className="mb-2 text-white/70">{scene.description}</p>

              {scene.shots?.map((shot, j) => (
                <div key={`shot-${i}-${j}`} className="mb-3 ml-5">
                  <div>
                    <strong>Shot {shot.shot_number} — {shot.shot_type}</strong>
                  </div>
                  <div>
                    <strong>Camera:</strong> {shot.camera_angle}, {shot.camera_motion}
                  </div>
                  <div>
                    <strong>Visual:</strong> {shot.visual}
                  </div>
                  <div>
                    <strong>Characters:</strong> {(shot.characters || []).join(", ")}
                  </div>
                  <div>
                    <strong>Lighting:</strong> {shot.lighting}
                  </div>
                  <div>
                    <strong>Notes:</strong> {shot.notes}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <h3 className="text-purple-300">Style Guide</h3>
          <pre className="whitespace-pre-wrap">{JSON.stringify(result.style_guide, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
