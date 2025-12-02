"use client";

import { useState } from "react";
import { createCanonDB, addCharacter, addEvent } from "@/lib/continuity/core/canonDB";
import { createTimeline, addTimelineEvent } from "@/lib/continuity/core/timelineEngine";
import { checkContinuity } from "@/lib/continuity/core/continuityChecker";
import { createRelationshipMap, addRelationship } from "@/lib/continuity/characters/relationshipMap";

export default function ContinuityPanel() {
  const [canon, setCanon] = useState(createCanonDB());
  const [timeline, setTimeline] = useState(createTimeline());
  const [relations, setRelations] = useState(createRelationshipMap());
  const [result, setResult] = useState(null);

  const seed = () => {
    const c1 = addCharacter(canon, { id: "Lara", origin: "Nova City", status: "alive" });
    const c2 = addCharacter(c1, { id: "Milo", origin: "Glass Bridge", status: "alive" });
    setCanon(c2);

    const t = addTimelineEvent(timeline, { id: "evt1", time: 1, desc: "Lara meets Milo" });
    const t2 = addTimelineEvent(t, { id: "evt2", time: 3, desc: "Storm rises" });
    setTimeline(t2);

    const r = addRelationship(relations, "Lara", "Milo", "trust", 0.8);
    setRelations(r);
  };

  const runCheck = () => {
    const res = checkContinuity({ canon, timeline });
    setResult(res);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Continuity Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={seed}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Seed
          </button>
          <button
            onClick={runCheck}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Check
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <p className="text-purple-300 font-semibold">Canon</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(canon, null, 2)}</pre>

        <p className="text-purple-300 font-semibold">Timeline</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(timeline, null, 2)}</pre>

        <p className="text-purple-300 font-semibold">Relationships</p>
        <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(relations, null, 2)}</pre>

        {result && (
          <>
            <p className="text-purple-300 font-semibold">Continuity Check</p>
            <pre className="whitespace-pre-wrap rounded-lg bg-black/30 p-3">{JSON.stringify(result, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
}
