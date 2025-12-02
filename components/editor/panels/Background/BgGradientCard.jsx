'use client';

import * as fabric from 'fabric';
import { motion } from 'framer-motion';

export default function BgGradientCard({ colors, fabricCanvas }) {
    const applyGradient = () => {
        if (!fabricCanvas) return;

        const canvasW = fabricCanvas.getWidth();
        const canvasH = fabricCanvas.getHeight();

        const gradient = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'pixels',
            coords: { x1: 0, y1: 0, x2: canvasW, y2: canvasH },
            colorStops: [
                { offset: 0, color: colors[0] },
                { offset: 1, color: colors[1] },
            ],
        });

        fabricCanvas.setBackgroundColor(gradient, fabricCanvas.renderAll.bind(fabricCanvas));
    };

    return (
        <motion.div
            onClick={applyGradient}
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            className='h-32 rounded-xl shadow-brutal border-2 border-neutral-300 dark:border-neutral-700 cursor-pointer'
            style={{
                backgroundImage: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            }}
        />
    );
}
