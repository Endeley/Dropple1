'use client';

import * as fabric from 'fabric';
import { motion } from 'framer-motion';

export default function BgTextureItem({ src, fabricCanvas }) {
    const applyTexture = () => {
        if (!fabricCanvas) return;

        fabric.Image.fromURL(src, (img) => {
            const canvasW = fabricCanvas.getWidth();
            const canvasH = fabricCanvas.getHeight();

            img.scaleToWidth(canvasW);
            img.scaleToHeight(canvasH);

            fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
        });
    };

    return (
        <motion.div
            onClick={applyTexture}
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            className='
        h-40 rounded-xl overflow-hidden cursor-pointer
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal bg-white dark:bg-neutral-800
      '>
            <img src={src} className='w-full h-full object-cover' />
        </motion.div>
    );
}
