"use client";

import { useState } from "react";
import { analyzeStyle } from "@/lib/neural-style-engine/core/styleAnalyzer";
import { encodeAesthetic } from "@/lib/neural-style-engine/core/aestheticEncoder";
import { buildStyleEmbedding } from "@/lib/neural-style-engine/core/styleEmbedding";
import { extractColorProfile } from "@/lib/neural-style-engine/features/colorProfile";
import { extractMotionProfile } from "@/lib/neural-style-engine/features/motionProfile";
import { generateStyledOutput } from "@/lib/neural-style-engine/transfer/styleGenerator";
import { applyMotionStyle } from "@/lib/neural-style-engine/integration/animationEngine";
import { shareStyleWithAgents } from "@/lib/neural-style-engine/integration/agentFramework";

export default function StyleEnginePanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const style = analyzeStyle({ type: "image" });
    const aesthetic = encodeAesthetic(style);
    const embedding = buildStyleEmbedding(aesthetic.vector);
    const colors = extractColorProfile(style.palette);
    const motion = extractMotionProfile(["easeOut"]);
    const styled = generateStyledOutput({ target: "poster" }, style);
    const motionApplied = applyMotionStyle({ clip: "intro" }, motion);
    const agents = shareStyleWithAgents(style);

    setLog((l) => [
      ...l,
      `Palette: ${colors.palette.join(", ")}`,
      `Embedding dim: ${embedding.dim}`,
      `Motion curve: ${motion.defaultCurve}`,
      `Styled target: ${styled.target}`,
      `Motion applied: ${motionApplied.motionStyle.defaultCurve}`,
      `Agents shared: ${agents.shared}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Neural Style Engine</h3>
        <button
          onClick={demo}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Demo
        </button>
      </div>
      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
