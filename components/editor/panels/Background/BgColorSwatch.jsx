'use client';
import { motion } from 'framer-motion';

export default function BgColorSwatch({ color, fabricCanvas }) {
    const applyColor = () => {
        if (!fabricCanvas) return;

        fabricCanvas.setBackgroundColor(color, fabricCanvas.renderAll.bind(fabricCanvas));
    };

    return (
        <motion.div
            onClick={applyColor}
            whileHover={{ y: -4, boxShadow: '6px 6px 0px #000' }}
            className='
        w-full h-16 rounded-lg cursor-pointer
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal
      '
            style={{ backgroundColor: color }}
        />
    );
}
