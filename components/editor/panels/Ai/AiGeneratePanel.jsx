'use client';

import { useState } from 'react';
import { Sparkles, ImageDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTemplateStore } from '@/stores/useTemplateStore';

const STYLE_PRESETS = ['Photo', '3D Render', 'Watercolor', 'Cyberpunk', 'Vector'];

export default function AiGeneratePanel() {
    const generate = useTemplateStore((s) => s.generateAIAsset);
    const aiGenerating = useTemplateStore((s) => s.aiGenerating);
    const [prompt, setPrompt] = useState('');
    const [style, setStyle] = useState(STYLE_PRESETS[0]);
    const [error, setError] = useState('');

    const generateImages = async () => {
        if (!prompt.trim()) {
            setError('Enter a prompt to generate.');
            return;
        }
        setError('');
        await generate({ prompt, type: style.toLowerCase().includes('icon') ? 'icon' : 'photo', style });
    };

    return (
        <div className='flex flex-col gap-5 items-stretch'>
            <div className='space-y-3 w-full'>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='Ultra wide photo of neon desert dunes...'
                    className='w-full min-h-[120px] rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-4 text-sm'
                />

                <div className='flex flex-wrap gap-2'>
                    {STYLE_PRESETS.map((preset) => (
                        <button
                            key={preset}
                            onClick={() => setStyle(preset)}
                            className={`px-4 py-2 rounded-full border text-xs font-semibold transition ${
                                style === preset
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                                    : 'border-neutral-300 dark:border-neutral-700'
                            }`}>
                            {preset}
                        </button>
                    ))}
                </div>

                <motion.button
                    onClick={generateImages}
                    whileHover={{ scale: 1.01 }}
                    className='w-full h-12 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg'>
                    {aiGenerating ? (
                        <>
                            <Loader2 className='w-4 h-4 animate-spin' />
                            Generating…
                        </>
                    ) : (
                        <>
                            <Sparkles className='w-4 h-4' />
                            Generate with {style}
                        </>
                    )}
                </motion.button>

                {error && <p className='text-xs text-red-500'>{error}</p>}
            </div>
        </div>
    );
}
