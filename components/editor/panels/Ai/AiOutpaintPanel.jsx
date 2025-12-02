'use client';

import { useState } from 'react';
import { Crop, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/useEditorStore';
import * as fabric from 'fabric';

const OPTIONS = [
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
    { id: 'top', label: 'Top' },
    { id: 'bottom', label: 'Bottom' },
    { id: 'all', label: 'All sides' },
];

export default function AiOutpaintPanel() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [direction, setDirection] = useState('all');
    const [padding, setPadding] = useState(120);
    const [message, setMessage] = useState('');

    const runOutpaint = () => {
        if (!fabricCanvas) return;
        const obj = fabricCanvas.getActiveObject();
        if (!obj) {
            setMessage('Select an image to extend.');
            return;
        }

        const extendsLeft = direction === 'left' || direction === 'all';
        const extendsRight = direction === 'right' || direction === 'all';
        const extendsTop = direction === 'top' || direction === 'all';
        const extendsBottom = direction === 'bottom' || direction === 'all';

        const width = obj.width * obj.scaleX;
        const height = obj.height * obj.scaleY;

        const rect = new fabric.Rect({
            left: obj.left - (extendsLeft ? padding : 0),
            top: obj.top - (extendsTop ? padding : 0),
            width: width + (extendsLeft ? padding : 0) + (extendsRight ? padding : 0),
            height: height + (extendsTop ? padding : 0) + (extendsBottom ? padding : 0),
            fill: '#0f172a',
            selectable: false,
            evented: false,
            rx: 12,
            ry: 12,
        });

        fabricCanvas.add(rect);
        rect.sendToBack();
        fabricCanvas.renderAll();
        setMessage('Outpainted canvas with AI fill (simulated).');
    };

    return (
        <div className='flex flex-col gap-4 items-stretch'>
            <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className='w-full h-12 rounded-2xl px-4 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 text-sm font-medium'>
                {OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div className='rounded-2xl bg-white/40 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-3'>
                <label className='text-xs font-semibold uppercase tracking-wide opacity-70 block mb-2'>Extension Amount ({padding}px)</label>
                <input
                    type='range'
                    min='60'
                    max='240'
                    value={padding}
                    onChange={(e) => setPadding(Number(e.target.value))}
                    className='w-full accent-black dark:accent-white'
                />
            </div>

            <motion.button
                onClick={runOutpaint}
                whileHover={{ y: -2 }}
                className='h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white flex items-center justify-center gap-3 text-sm font-semibold'>
                <Crop className='w-4 h-4' />
                <Sparkles className='w-4 h-4' />
                Outpaint
            </motion.button>

            {message && <p className='text-xs opacity-70'>{message}</p>}
        </div>
    );
}
