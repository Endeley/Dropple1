"use client";

import { useState } from "react";
import { generateMotionInstructions } from "@/lib/motion/inference/motionLLM";
import { addLayerMotion, createMotionTimeline } from "@/lib/motion/choreography/motionTimeline";

export default function MotionAssistantPanel() {
  const [instruction, setInstruction] = useState("");
  const [timeline, setTimeline] = useState(createMotionTimeline());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await generateMotionInstructions({ context: {}, instruction });
      // placeholder: push actions into timeline
      const updated = addLayerMotion(timeline, "layer_demo", res.actions || []);
      setTimeline(updated);
    } catch (err) {
      setError(err?.message || "Failed to generate motion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">AI Motion Assistant</h3>
        <button
          onClick={run}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          {loading ? "Thinking…" : "Generate Motion"}
        </button>
      </div>
      <textarea
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="e.g., Make this logo bounce with cinematic camera pan."
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm"
      />
      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}
      <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 text-xs">
        <p className="text-purple-300 mb-1">Timeline (demo)</p>
        <pre className="whitespace-pre-wrap">{JSON.stringify(timeline, null, 2)}</pre>
      </div>
    </div>
  );
}
