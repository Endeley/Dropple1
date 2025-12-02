"use client";

import { useState } from "react";
import { generatePlot } from "@/lib/story/generator/plotGenerator";
import { generateScenes } from "@/lib/story/generator/sceneGenerator";
import { buildStoryboard } from "@/lib/story/storyboard/storyboardBuilder";

export default function StoryEnginePanel() {
  const [concept, setConcept] = useState("A creator discovers Dropple’s magic");
  const [tone, setTone] = useState("cinematic");
  const [plot, setPlot] = useState(null);
  const [scenes, setScenes] = useState([]);
  const [storyboard, setStoryboard] = useState([]);

  const run = () => {
    const p = generatePlot({ concept, tone, duration: 60 });
    setPlot(p);
    const beats = p.acts?.flatMap((a) => a.beats) || [];
    const sc = generateScenes({ beats, style: tone });
    setScenes(sc);
    setStoryboard(buildStoryboard(sc));
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Dropple Story Engine</h3>
        <button
          onClick={run}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Generate
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <input
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          placeholder="Concept"
        />
        <input
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          placeholder="Tone (e.g., cinematic, playful)"
        />
      </div>

      {plot && (
        <div className="mt-4 space-y-2 text-sm">
          <p className="text-purple-300 font-semibold">Plot</p>
          <pre className="whitespace-pre-wrap text-xs rounded-lg bg-black/30 p-3">{JSON.stringify(plot, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Scenes</p>
          <pre className="whitespace-pre-wrap text-xs rounded-lg bg-black/30 p-3">{JSON.stringify(scenes, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Storyboard</p>
          <pre className="whitespace-pre-wrap text-xs rounded-lg bg-black/30 p-3">
            {JSON.stringify(storyboard, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
