"use client";

import { useState } from "react";
import { analyzeSceneEmotion } from "@/lib/emotion/analysis/sceneEmotionAI";
import { createEmotionTimeline, addEmotionBeat } from "@/lib/emotion/states/emotionTimeline";
import { mapEmotionToColor } from "@/lib/emotion/mapping/emotionToColor";
import { mapEmotionToLighting } from "@/lib/emotion/mapping/emotionToLighting";

export default function EmotionPanel() {
  const [scene, setScene] = useState("Hopeful reunion in a neon city at night");
  const [emotion, setEmotion] = useState(null);
  const [timeline, setTimeline] = useState(createEmotionTimeline());

  const run = () => {
    const analysis = analyzeSceneEmotion({ script: scene, world: { mood: "night" }, characters: [] });
    setEmotion(analysis);
    const next = addEmotionBeat(timeline, {
      time: Date.now(),
      emotion: analysis.emotion,
      intensity: analysis.intensity,
    });
    setTimeline(next);
  };

  const colors = mapEmotionToColor(emotion?.emotion);
  const lighting = mapEmotionToLighting(emotion?.emotion);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Emotion Engine</h3>
        <button
          onClick={run}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Analyze
        </button>
      </div>

      <textarea
        value={scene}
        onChange={(e) => setScene(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm"
      />

      {emotion && (
        <div className="mt-4 space-y-2 text-xs">
          <p className="text-purple-300 font-semibold">Emotion</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(emotion, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Color Mapping</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(colors, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Lighting Mapping</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(lighting, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Timeline</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(timeline, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
