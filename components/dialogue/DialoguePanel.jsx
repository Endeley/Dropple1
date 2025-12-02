"use client";

import { useState } from "react";
import { generateDialogue } from "@/lib/dialogue/generation/dialogueAI";
import { definePersonality } from "@/lib/dialogue/generation/characterPersonality";
import { generateTiming } from "@/lib/dialogue/structure/timingGenerator";
import { extractPhonemesFromLine } from "@/lib/dialogue/lipsync/phonemeExtractor";

export default function DialoguePanel() {
  const [concept, setConcept] = useState("Two friends planning a bold mission");
  const [tone, setTone] = useState("cinematic");
  const [dialogue, setDialogue] = useState(null);

  const run = async () => {
    const personas = [
      definePersonality({ name: "Alex", traits: ["bold", "strategic"], speechStyle: "direct" }),
      definePersonality({ name: "Mia", traits: ["calm", "supportive"], speechStyle: "warm" }),
    ];
    const res = await generateDialogue({ scene: concept, characters: personas, tone });
    const timed = generateTiming(res.lines);
    const lip = timed.map((line) => ({ ...line, phonemes: extractPhonemesFromLine(line.line) }));
    setDialogue(lip);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Dialogue Engine</h3>
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
          placeholder="Scene / concept"
        />
        <input
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
          placeholder="Tone (e.g., cinematic, comedic)"
        />
      </div>

      {dialogue && (
        <div className="mt-4 space-y-2 text-xs">
          <p className="text-purple-300 font-semibold">Dialogue</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(dialogue, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
