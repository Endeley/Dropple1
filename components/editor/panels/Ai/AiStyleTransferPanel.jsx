'use client';

import { useState } from 'react';
import { Palette, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/useEditorStore';

const STYLES = ['Van Gogh', 'Anime', 'Cyberpunk', 'Pencil Sketch', 'Oil Painting', 'Realistic Re-Light'];

export default function AiStyleTransferPanel() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [style, setStyle] = useState('');
    const [msg, setMsg] = useState('');

    const applyStyle = () => {
        if (!fabricCanvas || !style) return;

        const obj = fabricCanvas.getActiveObject();
        if (!obj) {
            setMsg('Select an image to apply style.');
            return;
        }

        obj.set('opacity', 0.9); // simulate a filter
        fabricCanvas.renderAll();

        setMsg(`Applied "${style}" style (simulated AI).`);
    };

    return (
        <div className='flex flex-col gap-4 items-stretch'>
            <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className='
          w-full h-12 px-4 rounded-2xl
          bg-neutral-50 dark:bg-neutral-800
          border-2 border-neutral-200 dark:border-neutral-700
          text-sm font-medium
        '>
                <option value=''>Choose style</option>
                {STYLES.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}
            </select>

            <motion.button
                onClick={applyStyle}
                whileHover={{ y: -4, boxShadow: '6px 6px 0px #000' }}
                className='
          h-12 rounded-2xl
          bg-black text-white dark:bg-white dark:text-black
          border-2 border-black dark:border-white
          shadow-brutal flex items-center justify-center gap-3 text-sm font-semibold
        '>
                <Palette className='w-5 h-5' />
                <Sparkles className='w-4 h-4' />
                Apply Style
            </motion.button>

            {msg && <p className='text-sm opacity-70'>{msg}</p>}
        </div>
    );
}
