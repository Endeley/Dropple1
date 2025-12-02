"use client";

import { motion } from "framer-motion";
import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

export default function AIResultsGrid() {
  const { history, setSelectedResult } = useAIStudioStore();

  if (history.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm py-6">
        No results yet — generate something!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {history.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setSelectedResult(item.result)}
          className="relative rounded-lg overflow-hidden cursor-pointer border border-white/10 bg-white/5"
        >
          <img src={item.result} className="w-full h-full object-cover" />

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 text-xs text-white"
          >
            <button className="px-3 py-1 bg-violet-600 rounded-lg">Use</button>
            <button className="px-3 py-1 bg-white/20 rounded-lg">Save</button>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
