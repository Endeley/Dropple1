"use client";

import { useState } from "react";
import { generateText } from "@/ai/text/generateText";

export default function AIAssistantPanel({ canvas }) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState(null);

  const askAI = async () => {
    const r = await generateText(input);
    setReply(r);
  };

  return (
    <div className="absolute right-0 top-0 h-full w-96 bg-zinc-900 border-l border-zinc-700 p-4 text-white flex flex-col">
      <h2 className="text-lg font-bold">AI Assistant</h2>

      <textarea
        className="mt-4 bg-zinc-800 p-2 rounded h-24"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Dropple AI anything..."
      />

      <button
        onClick={askAI}
        className="mt-2 bg-purple-600 p-2 rounded"
      >
        Ask AI
      </button>

      {reply && (
        <div className="mt-4 bg-zinc-800 p-3 rounded whitespace-pre-wrap">
          {reply}
        </div>
      )}
    </div>
  );
}
