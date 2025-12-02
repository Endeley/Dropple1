"use client";

import { modes } from "@/modules";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import { motion } from "framer-motion";

export default function TopBar() {
  const { mode, setMode } = useWorkspaceStore();

  return (
    <div className="h-14 w-full flex items-center justify-between px-6 bg-[#0E0E14]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_16px_rgba(0,0,0,0.35)]">
      <div className="text-lg font-semibold tracking-tight">
        <span className="bg-gradient-to-r from-violet-400 to-violet-600 text-transparent bg-clip-text">
          Dropple Studio
        </span>
      </div>

      <div className="flex gap-1 bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/10">
        {modes.map((m) => {
          const active = mode === m.id;
          return (
            <motion.button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                active
                  ? "bg-gradient-to-br from-violet-500/80 to-violet-600/80 shadow-[0_0_30px_rgba(122,92,255,0.35)]"
                  : "text-white/70 hover:bg-white/10"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {m.label}
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Save</button>
        <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">Export</button>
      </div>
    </div>
  );
}
