'use client';

import { useState } from 'react';
import { Eraser, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/useEditorStore';

export default function AiErasePanel() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [brushSize, setBrushSize] = useState(48);
    const [message, setMessage] = useState('');

    const eraseObject = () => {
        if (!fabricCanvas) return;
        const obj = fabricCanvas.getActiveObject();
        if (!obj) {
            setMessage('Select an object or mask area first.');
            return;
        }
        fabricCanvas.remove(obj);
        fabricCanvas.requestRenderAll();
        setMessage('Object erased with AI cleanup (simulated).');
    };

    return (
        <div className='flex flex-col gap-4 items-stretch'>
            <p className='text-sm opacity-70'>Brush over unwanted areas; Dropple will remove subjects and heal the pixels.</p>

            <div className='w-full rounded-2xl bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3'>
                <label className='text-xs font-semibold uppercase tracking-wide opacity-70 block mb-2'>Brush Size ({brushSize}px)</label>
                <input
                    type='range'
                    min='8'
                    max='200'
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className='w-full accent-black dark:accent-white'
                />
            </div>

            <motion.button
                onClick={eraseObject}
                whileHover={{ y: -2 }}
                className='h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white flex items-center justify-center gap-3 text-sm font-semibold'>
                <Eraser className='w-4 h-4' />
                <Sparkles className='w-4 h-4' />
                Apply Magic Erase
            </motion.button>

            <p className='text-xs opacity-60'>Tip: works best on isolated objects.</p>
            {message && <p className='text-xs opacity-80'>{message}</p>}
        </div>
    );
}
