'use client';

import { useState } from 'react';
import { Brush, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/useEditorStore';
import * as fabric from 'fabric';

export default function AiFillPanel() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [prompt, setPrompt] = useState('');
    const [msg, setMsg] = useState('');

    const applyFill = () => {
        if (!fabricCanvas || !prompt.trim()) return;

        const obj = fabricCanvas.getActiveObject();
        if (!obj) {
            setMsg('Select a shape or area to fill.');
            return;
        }

        const fill = new fabric.Gradient({
            type: 'linear',
            gradientUnits: 'percentage',
            coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
            colorStops: [
                { offset: 0, color: '#c084fc' },
                { offset: 1, color: '#38bdf8' },
            ],
        });

        obj.set('fill', fill);
        fabricCanvas.renderAll();

        setMsg('AI Fill simulated (replace with your API)');
    };

    return (
        <div className='flex flex-col gap-4 items-stretch'>
            <textarea
                placeholder='Describe what you want to fill...'
                className='w-full min-h-[120px] rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 p-4 text-sm'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />

            <motion.button
                onClick={applyFill}
                whileHover={{ y: -4, boxShadow: '6px 6px 0px #000' }}
                className='h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white shadow-brutal flex items-center justify-center gap-3 text-sm font-semibold'>
                <Brush className='w-4 h-4' />
                <Sparkles className='w-4 h-4' />
                AI Fill
            </motion.button>

            {msg && <p className='text-sm opacity-70'>{msg}</p>}
        </div>
    );
}
