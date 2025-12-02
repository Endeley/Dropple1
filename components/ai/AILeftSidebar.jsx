"use client";

import { motion } from "framer-motion";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const tools = [
  { id: "image", label: "Image Generator", icon: "🖼️" },
  { id: "edit", label: "Smart Edit", icon: "✨" },
  { id: "bg", label: "Background Tools", icon: "🌄" },
  { id: "mockup", label: "Mockups", icon: "📦" },
  { id: "text", label: "Text AI", icon: "✍️" },
  { id: "template", label: "Template AI", icon: "📐" },
  { id: "audio", label: "Audio AI", icon: "🎧" },
  { id: "video", label: "Video AI", icon: "🎥" },
  { id: "assistant", label: "Assistant", icon: "🤖" },
];

export default function AILeftSidebar() {
  const { mode, setMode } = useAIStudioStore();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl p-4 space-y-2"
    >
      {tools.map((t) => {
        const active = mode === t.id;
        return (
          <motion.button
            key={t.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setMode(t.id)}
            className={`w-full px-3 py-2 rounded-xl flex items-center gap-3 transition ${
              active
                ? "bg-violet-600/40 border border-violet-600/50 shadow-inner"
                : "bg-white/[0.02] hover:bg-white/[0.06]"
            }`}
          >
            <span className="text-xl">{t.icon}</span>
            <span className="text-sm">{t.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
