"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Section({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-4 bg-white/[0.02] rounded-xl border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/5"
      >
        {title}
        <span className="text-xs text-white/50">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-3 py-3 space-y-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
