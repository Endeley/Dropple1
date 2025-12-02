"use client";

import { useState } from "react";
import { generateEnvironment } from "@/lib/world/generator/environmentAI";
import { worldThemes } from "@/lib/world/styles/worldThemes";
import { placeObjects } from "@/lib/world/layout/objectPlacement";

export default function WorldEnginePanel() {
  const [style, setStyle] = useState("cyberpunk-neon");
  const [world, setWorld] = useState(null);

  const generate = () => {
    const theme = worldThemes[style] || {};
    const env = generateEnvironment({ type: theme.type || "3D", style, mood: theme.mood || "neutral" });
    env.props = placeObjects([], theme.props || ["sign", "light", "panel"]);
    env.fx = theme.fx || [];
    env.palette = theme.palette || [];
    env.lighting = theme.lighting || "cinematic";
    setWorld(env);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">World Engine</h3>
        <button
          onClick={generate}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Generate
        </button>
      </div>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm"
      >
        {Object.keys(worldThemes).map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      {world && (
        <div className="mt-4 space-y-2 text-xs">
          <p className="text-purple-300 font-semibold">World</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(world, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
