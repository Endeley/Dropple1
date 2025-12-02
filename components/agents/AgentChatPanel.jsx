"use client";

import { useState } from "react";
import { runAgent } from "@/agents/agentEngine";

export default function AgentChatPanel({ activeAgent = "design" }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!text.trim()) return;
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    const response = await runAgent(activeAgent, text);
    const agentMsg = { role: "agent", content: response };
    setMessages((prev) => [...prev, agentMsg]);
    setText("");
  };

  return (
    <div className="w-80 h-full flex flex-col bg-black/30 border-l border-white/10 backdrop-blur-xl">
      <div className="p-4 border-b border-white/10 text-sm font-semibold">
        {activeAgent} Agent
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2 text-xs">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-blue-400" : "text-violet-300"}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="p-3 flex gap-2 border-t border-white/10">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-sm"
          placeholder="Ask the agent..."
        />
        <button onClick={send} className="px-4 py-2 bg-violet-600 rounded-lg text-sm">
          Send
        </button>
      </div>
    </div>
  );
}
