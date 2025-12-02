"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSnapState } from "./snapState";

export default function GuideOverlay({ guides }) {
  const show = useSnapState((state) => state.showGuides);
  if (!show || !guides) return null;

  return (
    <AnimatePresence>
      {guides.vertical?.map((x, index) => (
        <motion.div
          key={`guide-v-${index}`}
          className="absolute top-0 bottom-0 w-px pointer-events-none"
          style={{ left: x, background: "linear-gradient(180deg,#a855f7,#3b82f6)" }}
          initial={{ opacity: 0, scaleY: 0.85 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.85 }}
          transition={{ duration: 0.14 }}
        />
      ))}
      {guides.horizontal?.map((y, index) => (
        <motion.div
          key={`guide-h-${index}`}
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{ top: y, background: "linear-gradient(90deg,#a855f7,#3b82f6)" }}
          initial={{ opacity: 0, scaleX: 0.85 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0.85 }}
          transition={{ duration: 0.14 }}
        />
      ))}
    </AnimatePresence>
  );
}
