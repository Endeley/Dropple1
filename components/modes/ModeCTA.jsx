"use client";

import { motion } from "framer-motion";

export default function ModeCTA({ label }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white text-black px-6 py-3 rounded-xl font-semibold mt-4 shadow-lg"
    >
      {label}
    </motion.button>
  );
}
