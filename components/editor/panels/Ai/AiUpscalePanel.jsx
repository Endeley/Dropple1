'use client';

import { useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/useEditorStore';

export default function AiUpscalePanel() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const upscale = async () => {
        if (!fabricCanvas || loading) return;
        const obj = fabricCanvas.getActiveObject();
        if (!obj) {
            setMessage('Select an image to upscale.');
            return;
        }

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));

        obj.scale(obj.scaleX * 1.25);
        obj.set({ dirty: true });
        fabricCanvas.renderAll();
        setMessage('Upscaled 4K (simulated)');
        setLoading(false);
    };

    return (
        <div className='flex flex-col gap-4 items-stretch'>
            <motion.button
                onClick={upscale}
                whileHover={{ scale: 1.01 }}
                className='h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg'>
                {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <ArrowUpRight className='w-4 h-4' />}
                {loading ? 'Enhancing…' : 'Upscale Image'}
            </motion.button>

            {message && <p className='text-xs opacity-70'>{message}</p>}
        </div>
    );
}
