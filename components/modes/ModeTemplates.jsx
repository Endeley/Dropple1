"use client";

import { motion } from "framer-motion";

export default function ModeTemplates({ templates = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-4"
    >
      {templates.map((item, i) => (
        <motion.img
          key={i}
          src={item}
          className="w-36 h-48 rounded-xl shadow-lg object-cover"
          alt=""
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </motion.div>
  );
}
