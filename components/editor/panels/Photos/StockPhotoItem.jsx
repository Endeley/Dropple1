'use client';

import { motion } from 'framer-motion';
import * as fabric from 'fabric';
import { useEditorStore } from '@/stores/useEditorStore';

export default function StockPhotoItem({ src }) {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);

    const addToCanvas = () => {
        if (!fabricCanvas) return;

        fabric.Image.fromURL(src, (img) => {
            img.scaleToWidth(380);
            fabricCanvas.add(img).setActiveObject(img);
        });
    };

    return (
        <motion.div
            onClick={addToCanvas}
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            className='
        h-40 rounded-xl overflow-hidden cursor-pointer
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal bg-white dark:bg-neutral-800
      '>
            <img src={src} alt='' className='w-full h-full object-cover' />
        </motion.div>
    );
}
