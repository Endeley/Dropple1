'use client';
import { motion } from 'framer-motion';
import * as fabric from 'fabric';

export default function TextPresetCard({ preset, fabricCanvas }) {
    const applyPreset = () => {
        if (!fabricCanvas) return;

        let text = new fabric.IText(preset.label, {
            left: 180,
            top: 200,
            fontFamily: 'Poppins',
            fontSize: 40,
            fill: '#000',
        });

        if (preset.style === 'gradient') {
            text.set('fill', {
                type: 'linear',
                gradientUnits: 'pixels',
                coords: { x1: 0, y1: 0, x2: 200, y2: 0 },
                colorStops: [
                    { offset: 0, color: '#7C3AED' },
                    { offset: 1, color: '#A855F7' },
                ],
            });
        }

        if (preset.style === 'outline') {
            text.set({
                stroke: '#000',
                strokeWidth: 2,
                fill: 'transparent',
            });
        }

        if (preset.style === 'shadow') {
            text.set({
                fill: '#000',
                shadow: '4px 4px 0px #000',
            });
        }

        if (preset.style === 'bold') {
            text.set({
                fill: '#000',
                fontWeight: '900',
            });
        }

        fabricCanvas.add(text).setActiveObject(text);
    };

    return (
        <motion.div
            onClick={applyPreset}
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            className='
        p-4 rounded-xl cursor-pointer
        bg-white dark:bg-neutral-800
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal
        font-semibold
      '>
            {preset.label}
        </motion.div>
    );
}
