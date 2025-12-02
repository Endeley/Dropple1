'use client';
import { motion } from 'framer-motion';

export default function AiToolCard({ tool, isActive, onSelect }) {
    return (
        <motion.button
            onClick={() => onSelect(tool.id)}
            whileHover={{ y: -4 }}
            className={`h-12 px-4 rounded-2xl text-center w-full border transition font-semibold tracking-wide flex items-center justify-center ${
                isActive ? 'bg-linear-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-[0_20px_45px_rgba(124,58,237,0.25)] border-transparent' : 'bg-[#EDE9FE] text-[#0F0F12] dark:bg-[#1C1C1F] dark:text-white/80 border-[#27272A] shadow-[0_6px_14px_rgba(15,15,18,0.1)]'
            }`}>
            {tool.label}
        </motion.button>
    );
}
