'use client';

import { motion } from 'framer-motion';
import * as fabric from 'fabric';

export default function ShapeItem({ shape, fabricCanvas }) {
    const addShapeToCanvas = () => {
        if (!fabricCanvas) return;

        let obj;

        switch (shape.type) {
            case 'rect':
                obj = new fabric.Rect({
                    width: shape.w,
                    height: shape.h,
                    fill: shape.color,
                    left: 200,
                    top: 200,
                });
                break;

            case 'rounded':
                obj = new fabric.Rect({
                    width: shape.w,
                    height: shape.h,
                    fill: shape.color,
                    rx: 20,
                    ry: 20,
                    left: 200,
                    top: 200,
                });
                break;

            case 'circle':
                obj = new fabric.Circle({
                    radius: shape.r,
                    fill: shape.color,
                    left: 200,
                    top: 200,
                });
                break;

            case 'triangle':
                obj = new fabric.Triangle({
                    width: shape.w,
                    height: shape.h,
                    fill: shape.color,
                    left: 200,
                    top: 200,
                });
                break;
        }

        fabricCanvas.add(obj).setActiveObject(obj);
    };

    return (
        <motion.div
            onClick={addShapeToCanvas}
            whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className='
        bg-white dark:bg-neutral-800
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal
        rounded-xl
        h-32 flex items-center justify-center cursor-pointer
      '>
            <div className='w-16 h-16 flex items-center justify-center'>
                {shape.type === 'rect' && <div className='w-full h-full bg-black dark:bg-white' />}
                {shape.type === 'rounded' && <div className='w-full h-full bg-black dark:bg-white rounded-lg' />}
                {shape.type === 'circle' && <div className='w-14 h-14 bg-black dark:bg-white rounded-full' />}
                {shape.type === 'triangle' && (
                    <div
                        className='
              w-0 h-0 
              border-l-8 border-r-8 border-b-12
              border-l-transparent border-r-transparent 
              border-b-black dark:border-b-white
            '
                    />
                )}
            </div>
        </motion.div>
    );
}
