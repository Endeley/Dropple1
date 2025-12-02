'use client';

import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import * as fabric from 'fabric';

const ICON_NAMES = ['Heart', 'Star', 'Camera', 'Bolt', 'Bell', 'Music', 'Smile', 'ArrowBigUp'];

export default function IconLibrary({ fabricCanvas }) {
    const addIcon = (name) => {
        if (!fabricCanvas) return;

        const Icon = Icons[name];
        const svg = new Icon().props.children[0].props.d;

        fabric.loadSVGFromString(`<svg viewBox="0 0 24 24"><path d="${svg}" /></svg>`, (objects) => {
            const iconObj = fabric.util.groupSVGElements(objects, {
                left: 200,
                top: 200,
                fill: '#000',
            });
            fabricCanvas.add(iconObj).setActiveObject(iconObj);
        });
    };

    return (
        <div className='grid grid-cols-3 gap-4'>
            {ICON_NAMES.map((name) => {
                const Icon = Icons[name];
                return (
                    <motion.button
                        key={name}
                        onClick={() => addIcon(name)}
                        whileHover={{ y: -4, boxShadow: '8px 8px 0px #000' }}
                        className='
              w-full h-24 flex items-center justify-center
              border-2 border-neutral-300 dark:border-neutral-700
              bg-white dark:bg-neutral-800
              shadow-brutal rounded-xl
            '>
                        <Icon className='w-8 h-8' />
                    </motion.button>
                );
            })}
        </div>
    );
}
