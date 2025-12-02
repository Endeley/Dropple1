'use client';

import { useState } from 'react';
import { Image, Sparkles } from 'lucide-react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/stores/useEditorStore';
import * as fabric from 'fabric';

const SAMPLE_BACKGROUNDS = ['/textures/abstract-ai.jpg', '/textures/gradient-1.jpg', '/textures/noise-1.png'];

export default function AiReplaceBgPanel() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(SAMPLE_BACKGROUNDS[0]);
    const [message, setMessage] = useState('');

    const replaceBackground = async () => {
        if (!fabricCanvas || loading) return;
        setLoading(true);
        setMessage('');

        await new Promise((resolve) => setTimeout(resolve, 700));
        const src = preview;
        fabric.Image.fromURL(src, (img) => {
            img.scaleToWidth(fabricCanvas.getWidth());
            img.scaleToHeight(fabricCanvas.getHeight());
            fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
            setMessage('Background replaced (simulated)');
            setLoading(false);
        });
    };

    return (
        <div className='flex flex-col gap-4 items-stretch'>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Describe the background vibe...'
                className='w-full h-28 rounded-2xl p-4 bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-700 text-sm'
            />

            <div className='flex gap-3'>
                {SAMPLE_BACKGROUNDS.map((bg) => (
                    <button
                        key={bg}
                        onClick={() => setPreview(bg)}
                        className={`h-20 flex-1 rounded-2xl border-2 overflow-hidden ${
                            preview === bg ? 'border-purple-500' : 'border-transparent'
                        }`}>
                        <div className='relative w-full h-full'>
                            <NextImage src={bg} alt='' fill className='object-cover' />
                        </div>
                    </button>
                ))}
            </div>

            <motion.button
                onClick={replaceBackground}
                whileHover={{ y: -2 }}
                className='h-12 rounded-2xl bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white flex items-center justify-center gap-3 text-sm font-semibold'>
                {loading ? (
                    'Applying…'
                ) : (
                    <>
                        <Image className='w-4 h-4' alt='' aria-hidden='true' />
                        <Sparkles className='w-4 h-4' />
                        Replace Background
                    </>
                )}
            </motion.button>

            {message && <p className='text-xs opacity-70'>{message}</p>}
        </div>
    );
}
