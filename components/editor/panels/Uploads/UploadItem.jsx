'use client';
import * as fabric from 'fabric';
import { motion } from 'framer-motion';

export default function UploadItem({ item, fabricCanvas }) {
    const addToCanvas = () => {
        if (!fabricCanvas) return;

        fabric.Image.fromURL(item.src, (img) => {
            img.scaleToWidth(350);
            fabricCanvas.add(img).setActiveObject(img);
        });
    };

    return (
        <motion.div
            onClick={addToCanvas}
            whileHover={{ y: -4, boxShadow: '8px_8px_0px_#000' }}
            className='
        h-40 rounded-xl overflow-hidden cursor-pointer
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal bg-white dark:bg-neutral-800
        flex items-center justify-center
      '>
            <img src={item.src} alt='' className='w-full h-full object-cover' />
        </motion.div>
    );
}
