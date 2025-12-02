"use client";

import { motion } from "framer-motion";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const modes = [
  { id: "image", label: "Image" },
  { id: "edit", label: "Edit" },
  { id: "mockup", label: "Mockups" },
  { id: "text", label: "Text" },
  { id: "audio", label: "Audio" },
  { id: "video", label: "Video" },
];

export default function AIModeSwitcher() {
  const { mode, setMode } = useAIStudioStore();

  return (
    <div className="flex items-center gap-3">
      {modes.map((m) => {
        const active = m.id === mode;
        return (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => setMode(m.id)}
            className={`px-4 py-1 rounded-full border transition ${
              active
                ? "bg-violet-600 border-violet-500"
                : "bg-violet-600/20 border-violet-500/20 hover:bg-violet-600/40"
            }`}
          >
            {m.label}
          </motion.button>
        );
      })}
    </div>
  );
}
