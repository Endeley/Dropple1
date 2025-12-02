"use client";

import { useState } from "react";
import { listAssistants, runAssistant } from "@/lib/assistants/engine";

const assistants = listAssistants();

export default function AssistantPanel({ onClose }) {
  const [assistantId, setAssistantId] = useState(assistants[0]?.id || "layout");
  const [instruction, setInstruction] = useState("");
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    setActions([]);
    try {
      const result = await runAssistant(assistantId, instruction, { document: {}, selection: [] });
      setActions(result || []);
    } catch (err) {
      setError(err?.message || "Assistant failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/70 p-4 text-white backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-purple-300">Model Assistant</h3>
        <button onClick={onClose} className="text-sm text-white/60 hover:text-white">
          Close
        </button>
      </div>

      <div className="mt-3 grid gap-2">
        <select
          value={assistantId}
          onChange={(e) => setAssistantId(e.target.value)}
          className="rounded-md border border-white/10 bg-white/5 p-2 text-sm"
        >
          {assistants.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Ask the assistant (e.g., Fix spacing, rewrite headline)..."
          className="min-h-[100px] rounded-md border border-white/10 bg-white/5 p-2 text-sm"
        />

        <button
          onClick={run}
          className="rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          type="button"
        >
          {loading ? "Thinking…" : "Run Assistant"}
        </button>
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-rose-400">{error}</p>}

      {actions.length > 0 && (
        <div className="mt-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs">
          <p className="text-purple-300 mb-1">Suggested actions</p>
          <pre className="whitespace-pre-wrap">{JSON.stringify(actions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
