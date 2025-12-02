"use client";

import { motion } from "framer-motion";

export default function NamingModal({ open, onClose }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
      >
        <h2 className="text-xl font-semibold text-purple-300">Quick Naming</h2>

        <input
          placeholder="Describe what you want to name..."
          className="mt-4 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none placeholder:text-white/40"
        />

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="text-sm text-white/50 transition hover:text-white"
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-gradient-to-r from-purple-500 to-violet-700 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            type="button"
          >
            Generate
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
