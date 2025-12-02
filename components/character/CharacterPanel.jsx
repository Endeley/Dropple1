"use client";

import { useState } from "react";
import { build2DCharacter } from "@/lib/character/creator/characterBuilder2D";
import { createRig2D } from "@/lib/character/skeleton/rig2D";
import { generateBodyMotion } from "@/lib/character/motion/bodyMotionAI";
import { generateExpressionTimeline } from "@/lib/character/facial/expressionAI";

export default function CharacterPanel() {
  const [style, setStyle] = useState("cartoon");
  const [name, setName] = useState("Hero");
  const [character, setCharacter] = useState(null);
  const [motion, setMotion] = useState(null);
  const [expressions, setExpressions] = useState([]);

  const create = () => {
    const rig = createRig2D();
    const c = build2DCharacter({ style, name });
    c.rig = rig;
    setCharacter(c);
    setMotion(generateBodyMotion({ intent: "idle", duration: 3 }));
    setExpressions(generateExpressionTimeline({ emotion: "confident", duration: 2 }));
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Character Engine</h3>
        <button
          onClick={create}
          className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
          type="button"
        >
          Create
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          placeholder="Name"
        />
        <input
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          placeholder="Style (cartoon, anime, corporate...)"
        />
      </div>

      {character && (
        <div className="mt-4 space-y-2 text-xs">
          <p className="text-purple-300 font-semibold">Character</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(character, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Motion (idle)</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(motion, null, 2)}</pre>

          <p className="text-purple-300 font-semibold">Expressions</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(expressions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
