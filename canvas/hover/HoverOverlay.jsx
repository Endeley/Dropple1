"use client";

import { motion } from "framer-motion";

export default function HoverOverlay({ layer }) {
  if (!layer) return null;
  const { x, y, width, height, rotation = 0 } = layer;

  return (
    <motion.div
      className="absolute pointer-events-none border border-blue-400/70 rounded-sm shadow-[0_0_0_1px_rgba(59,130,246,0.2)]"
      style={{
        left: x,
        top: y,
        width,
        height,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "top left",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  );
}
