"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ModeHero({ hero }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="w-[600px] max-w-full rounded-xl overflow-hidden shadow-2xl"
    >
      <Image src={hero} alt="" className="w-full h-auto object-cover" fill />
    </motion.div>
  );
}
