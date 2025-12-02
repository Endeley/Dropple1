"use client";

import { useState } from "react";
import { runAssistant, listAssistants } from "@/lib/assistants/engine";

const assistantOptions = listAssistants();

export default function InlineAssistant({ selection = [] }) {
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [assistantId, setAssistantId] = useState("copy");
  const [actions, setActions] = useState([]);

  const run = async () => {
    const result = await runAssistant(assistantId, instruction, { document: {}, selection });
    setActions(result || []);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-purple-700"
      >
        AI ✨
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-72 rounded-xl border border-white/10 bg-black/80 p-3 text-white shadow-xl">
          <select
            value={assistantId}
            onChange={(e) => setAssistantId(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 p-2 text-xs"
          >
            {assistantOptions.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Ask the assistant…"
            className="mt-2 w-full rounded-md border border-white/10 bg-white/5 p-2 text-xs"
          />
          <button
            onClick={run}
            className="mt-2 w-full rounded-md bg-purple-600 p-2 text-xs font-semibold text-white hover:bg-purple-700"
            type="button"
          >
            Run
          </button>
          {actions.length > 0 && (
            <pre className="mt-2 max-h-40 overflow-y-auto rounded-md bg-white/5 p-2 text-[11px]">
              {JSON.stringify(actions, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
