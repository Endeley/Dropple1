'use client';
import { motion } from 'framer-motion';
import * as fabric from 'fabric';

export default function FontCard({ set, fabricCanvas }) {
    const applyFonts = () => {
        if (!fabricCanvas) return;

        const heading = new fabric.IText('Heading', {
            fontFamily: set.heading,
            fontSize: 48,
            left: 150,
            top: 150,
            fill: '#000',
        });

        const body = new fabric.IText('Body text example', {
            fontFamily: set.body,
            fontSize: 24,
            left: 150,
            top: 230,
            fill: '#000',
        });

        fabricCanvas.add(heading);
        fabricCanvas.add(body);
    };

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            onClick={applyFonts}
            className='
        p-4 rounded-xl cursor-pointer
        bg-white dark:bg-neutral-800
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal
        flex flex-col gap-3
      '>
            <div className='font-bold text-lg'>{set.title}</div>
            <div className='text-xl' style={{ fontFamily: set.heading }}>
                Heading Example
            </div>
            <div className='text-sm opacity-70' style={{ fontFamily: set.body }}>
                Body text example
            </div>
        </motion.div>
    );
}
