"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { getMode } from "@/modules";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import { Icons } from "./Icons";
import ToolTip from "./ToolTip";

export default function LeftToolbar() {
  const { mode, activeTool, setActiveTool } = useWorkspaceStore();
  const config = getMode(mode);
  const tools = config?.tools || [];
  const [hovered, setHovered] = useState(null);

  const groupOrder = ["core", "create", "edit", "advanced", "ai", "dev"];
  const grouped = groupOrder
    .map((group) => ({ group, items: tools.filter((tool) => tool.group === group) }))
    .filter((entry) => entry.items.length > 0);

  return (
    <div className="w-16 h-full flex flex-col items-center py-4 bg-[#0E0E14]/70 border-r border-white/10 backdrop-blur-xl space-y-4">
      {grouped.length === 0 && <span className="text-[10px] text-white/40">No tools</span>}
      {grouped.map((group, idx) => (
        <div key={group.group} className="flex flex-col items-center gap-2 relative">
          {group.items.map((tool) => {
            const active = activeTool === tool.id;
            return (
              <motion.button
                key={tool.id}
                onMouseEnter={() => setHovered(tool.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActiveTool(tool.id)}
                className={`relative w-11 h-11 flex items-center justify-center rounded-xl transition-all ${
                  active
                    ? "bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-[0_0_16px_rgba(122,92,255,0.4)]"
                    : "bg-white/5 hover:bg-white/10 text-white/70"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                <Icons name={tool.icon} size={20} />
                <AnimatePresence>
                  {hovered === tool.id && <ToolTip text={tool.label} />}
                </AnimatePresence>
              </motion.button>
            );
          })}
          {idx !== grouped.length - 1 && <div className="w-8 h-px bg-white/10" />}
        </div>
      ))}
    </div>
  );
}
