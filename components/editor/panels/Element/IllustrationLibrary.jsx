'use client';

import { motion } from 'framer-motion';

const ILLUSTRATIONS = ['/illustrations/flat1.png', '/illustrations/flat2.png', '/illustrations/doodle1.png', '/illustrations/3d1.png'];

export default function IllustrationLibrary({ fabricCanvas }) {
    const add = (src) => {
        if (!fabricCanvas) return;

        fabric.Image.fromURL(src, (img) => {
            img.scaleToWidth(280);
            fabricCanvas.add(img).setActiveObject(img);
        });
    };

    return (
        <div className='grid grid-cols-2 gap-4'>
            {ILLUSTRATIONS.map((src, i) => (
                <motion.div
                    key={i}
                    onClick={() => add(src)}
                    whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
                    className='
            h-40 rounded-xl overflow-hidden
            border-2 border-neutral-300 dark:border-neutral-700
            shadow-brutal bg-white dark:bg-neutral-800
            cursor-pointer
          '>
                    <img src={src} className='w-full h-full object-cover' />
                </motion.div>
            ))}
        </div>
    );
}
