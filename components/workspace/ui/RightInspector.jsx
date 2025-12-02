"use client";

import { motion } from "framer-motion";
import { useWorkspaceStore } from "@/lib/state/workspace/useWorkspaceStore";
import { getMode } from "@/modules";
import dynamic from "next/dynamic";

const BrandKitPanel = dynamic(() => import("@/app/(workspace)/brand/BrandKitPanel"), {
  ssr: false,
});

export default function RightInspector() {
  const mode = useWorkspaceStore((s) => s.mode);
  const config = getMode(mode);
  const Inspector = config?.inspector;

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="w-[340px] h-full p-4 overflow-y-auto bg-[#101018]/80 backdrop-blur-xl border-l border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.04)]"
    >
      <div className="space-y-6">
        {Inspector ? <Inspector /> : <p className="text-white/40">No inspector</p>}
        <BrandKitPanel />
      </div>
    </motion.div>
  );
}
