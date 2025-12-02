"use client";

import { motion } from "framer-motion";

export default function ToolTip({ text }) {
  if (!text) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      className="absolute left-14 px-2 py-1 rounded-md bg-black/90 text-xs text-white border border-white/10 shadow-lg"
    >
      {text}
    </motion.div>
  );
}
