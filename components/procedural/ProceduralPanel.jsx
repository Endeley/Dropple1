"use client";

import { useState } from "react";
import { generateWorld } from "@/lib/procedural-engine/systems/worldGenerator";
import { generateTemplates } from "@/lib/procedural-engine/systems/templateGenerator";
import { generateCharacter } from "@/lib/procedural-engine/systems/characterGenerator";
import { generateAnimation } from "@/lib/procedural-engine/systems/animationGenerator";
import { generateVFX } from "@/lib/procedural-engine/systems/vfxGenerator";
import { learnPatterns } from "@/lib/procedural-engine/ai/neuralPatternLearner";
import { generateWithStyle } from "@/lib/procedural-engine/ai/styleDrivenGeneration";

export default function ProceduralPanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const world = generateWorld({ theme: "cyberpunk" });
    const templates = generateTemplates({ brand: "Dropple", count: 3 });
    const character = generateCharacter({ style: "anime" });
    const anim = generateAnimation("idle");
    const vfx = generateVFX("spark");
    const patterns = learnPatterns(["img1", "img2"]);
    const styled = generateWithStyle({ mood: "neon" });

    setLog((l) => [
      ...l,
      `World: ${world.id}`,
      `Templates: ${templates.length}`,
      `Character: ${character.id}`,
      `Anim frames: ${anim.frames}`,
      `VFX particles: ${vfx.particles}`,
      `Patterns learned: ${patterns.learned}`,
      `Styled: ${styled.generated}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Procedural Engine</h3>
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
