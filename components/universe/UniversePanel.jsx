"use client";

import { useState } from "react";
import { createUniverse, listUniverses } from "@/lib/universe-mode/core/universeManager";
import { createWorld, listWorlds } from "@/lib/universe-mode/worlds/worldManager";
import { createTimeline, addBranch } from "@/lib/universe-mode/core/timelineEngine";
import { createCharacter } from "@/lib/universe-mode/characters/characterProfiles";
import { addRelationship } from "@/lib/universe-mode/characters/relationshipGraph";
import { injectWorld } from "@/lib/universe-mode/integration/worldEngine";

export default function UniversePanel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const uni = createUniverse("Dropple Verse");
    const world = createWorld("Neon City");
    injectWorld(uni, world);
    const timeline = createTimeline([]);
    addBranch(timeline, "Alt Future");
    const char = createCharacter("Lara Vex", { role: "hero" });
    addRelationship(char.id, "villain_1", "rival");

    setLog((l) => [
      ...l,
      `Universe: ${uni.id}`,
      `Worlds: ${listWorlds().length}`,
      `Universes total: ${listUniverses().length}`,
      `Timeline branches: ${timeline.branches.length}`,
      `Character: ${char.name}`,
    ]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Universe Mode</h3>
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
