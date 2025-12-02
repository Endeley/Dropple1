'use client';
import { motion } from 'framer-motion';
import * as fabric from 'fabric';

export default function GradientCard({ colors, fabricCanvas }) {
    const applyGradient = () => {
        if (!fabricCanvas) return;

        const rect = new fabric.Rect({
            width: 400,
            height: 250,
            left: 150,
            top: 150,
        });

        rect.setGradient('fill', {
            type: 'linear',
            gradientUnits: 'pixels',
            coords: { x1: 0, y1: 0, x2: 400, y2: 250 },
            colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] },
            ],
        });

        fabricCanvas.add(rect).setActiveObject(rect);
    };

    return (
        <motion.div
            onClick={applyGradient}
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            className='
        h-32 rounded-xl shadow-brutal cursor-pointer
        border-2 border-neutral-300 dark:border-neutral-700
      '
            style={{
                backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            }}
        />
    );
}
