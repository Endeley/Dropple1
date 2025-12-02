'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AiGenerateForm({ onResult }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim() || isGenerating) return;
        setIsGenerating(true);

        // Simulate API latency then return placeholder result
        await new Promise((resolve) => setTimeout(resolve, 600));
        const placeholder = `/photos/ai-generated-${Math.ceil(Math.random() * 4)}.jpg`;
        onResult?.(placeholder);
        setPrompt('');
        setIsGenerating(false);
    };

    return (
        <div className='flex gap-2'>
            <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Describe an image...'
                className='flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm'
            />
            <motion.button
                onClick={handleGenerate}
                disabled={isGenerating}
                whileHover={{ y: -2 }}
                className='px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-semibold flex items-center gap-2 disabled:opacity-50'>
                <Sparkles className='w-4 h-4' />
                {isGenerating ? 'Generating…' : 'Generate'}
            </motion.button>
        </div>
    );
}

