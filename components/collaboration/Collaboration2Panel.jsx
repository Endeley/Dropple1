"use client";

import { useState } from "react";
import { mergeState, newCRDTNode } from "@/lib/collaboration-engine2/core/crdt2";
import { recordChange, getChanges } from "@/lib/collaboration-engine2/core/changeRecorder";
import { setCursor, getCursors } from "@/lib/collaboration-engine2/presence/ghostCursors";
import { updatePresence, getPresence } from "@/lib/collaboration-engine2/presence/presenceManager";
import { syncScene } from "@/lib/collaboration-engine2/realtime/multiUserScene";
import { recordEvent, getRecording, clearRecording } from "@/lib/collaboration-engine2/replay/sessionRecorder";
import { diffStates } from "@/lib/collaboration-engine2/replay/diffViewer";
import { resolveConflict } from "@/lib/collaboration-engine2/ai/conflictResolverAI";

export default function Collaboration2Panel() {
  const [log, setLog] = useState([]);

  const demo = () => {
    const node = newCRDTNode({ layer: "rect" });
    const merged = mergeState({ a: 1 }, { b: 2 });
    recordChange({ change: "move", node: node.id });
    updatePresence("u1", { name: "Alex", tool: "select" });
    setCursor("u1", { x: Math.random() * 400, y: Math.random() * 300 });
    recordEvent({ type: "edit", user: "u1" });
    const scene = syncScene({ layers: [node] });
    const diff = diffStates({ a: 1 }, { a: 2 });
    const conflict = resolveConflict("local", "remote");

    setLog((l) => [
      ...l,
      `CRDT node: ${node.id}`,
      `Merged keys: ${Object.keys(merged).join(",")}`,
      `Changes: ${getChanges().length}`,
      `Presence: ${getPresence().length}`,
      `Cursors: ${getCursors().length}`,
      `Scene synced: ${scene.synced}`,
      `Recording events: ${getRecording().length}`,
      `Diff keys: ${Object.keys(diff).join(",") || "none"}`,
      `Conflict strategy: ${conflict.strategy}`,
    ]);
  };

  const reset = () => {
    clearRecording();
    setLog([]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Collaboration 2.0</h3>
        <div className="flex gap-2">
          <button
            onClick={demo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Demo
          </button>
          <button
            onClick={reset}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Reset
          </button>
        </div>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
