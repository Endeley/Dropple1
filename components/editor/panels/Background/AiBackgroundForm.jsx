'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function AiBackgroundForm({ onResult }) {
    const [prompt, setPrompt] = useState('');

    const fakeGenerate = () => {
        if (!prompt.trim()) return;

        const placeholder = '/textures/abstract-ai.jpg';
        onResult(placeholder);
    };

    return (
        <div
            className='
        p-4 border-2 rounded-xl
        bg-white dark:bg-neutral-800
        border-neutral-300 dark:border-neutral-700
        shadow-brutal flex flex-col gap-3
      '>
            <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className='
          w-full p-3 rounded-lg
          bg-neutral-100 dark:bg-neutral-700
          border-2 border-neutral-300 dark:border-neutral-600
          outline-none
        '
                placeholder='Describe the background…'
            />

            <button
                onClick={fakeGenerate}
                className='
          flex items-center justify-center gap-2
          px-4 py-2 font-semibold uppercase rounded-lg
          bg-black text-white dark:bg-white dark:text-black
          border-2 border-black dark:border-white
          shadow-brutal hover:shadow-brutalHover transition-all
        '>
                <Sparkles className='w-4 h-4' />
                Generate Background
            </button>
        </div>
    );
}
