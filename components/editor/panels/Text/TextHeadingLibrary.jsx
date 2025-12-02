'use client';
import * as fabric from 'fabric';
import { motion } from 'framer-motion';

export default function TextHeadingLibrary({ fabricCanvas }) {
    const addText = (text, fontSize) => {
        if (!fabricCanvas) return;

        const obj = new fabric.IText(text, {
            fontSize,
            fontFamily: 'Poppins',
            left: 200,
            top: 200,
            fill: '#000',
        });

        fabricCanvas.add(obj).setActiveObject(obj);
    };

    const blocks = [
        { label: 'Add Heading', size: 48 },
        { label: 'Add Subheading', size: 32 },
        { label: 'Add Body Text', size: 20 },
    ];

    return (
        <div className='flex flex-col gap-4'>
            {blocks.map((b) => (
                <motion.button
                    key={b.label}
                    whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
                    onClick={() => addText(b.label, b.size)}
                    className='
            w-full p-4 text-left rounded-xl
            bg-white dark:bg-neutral-800
            border-2 border-neutral-300 dark:border-neutral-700
            shadow-brutal hover:shadow-brutalHover
            font-semibold
          '>
                    {b.label}
                </motion.button>
            ))}
        </div>
    );
}
