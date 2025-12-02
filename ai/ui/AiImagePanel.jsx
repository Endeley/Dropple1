"use client";

import { useState } from 'react';
import { generateImage } from '@/ai/multimodal/image/generateImage';
import { upscaleImage } from '@/ai/multimodal/image/upscaleImage';
import { replaceBackground } from '@/ai/multimodal/image/replaceBackground';

const insertImage = (canvas, url) => {
    const fabric = typeof window !== 'undefined' ? window.fabric : null;
    if (!fabric || !canvas) return;

    fabric.Image.fromURL(url, (img) => {
        img.set({
            left: canvas.getWidth() / 2 - (img.width || 0) / 2,
            top: canvas.getHeight() / 2 - (img.height || 0) / 2,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.requestRenderAll();
    }, { crossOrigin: 'anonymous' });
};

export default function AiImagePanel({ canvas }) {
    const [prompt, setPrompt] = useState('');
    const [busy, setBusy] = useState(false);

    const handleGenerate = async () => {
        setBusy(true);
        try {
            const url = await generateImage(prompt);
            insertImage(canvas, url);
        } finally {
            setBusy(false);
        }
    };

    const handleUpscale = async () => {
        const active = canvas?.getActiveObject();
        if (!active || active.type !== 'image') return;
        setBusy(true);
        try {
            const url = await upscaleImage(active.getSrc());
            insertImage(canvas, url);
        } finally {
            setBusy(false);
        }
    };

    const handleBackground = async () => {
        const active = canvas?.getActiveObject();
        if (!active || active.type !== 'image') return;
        setBusy(true);
        try {
            const url = await replaceBackground(active.getSrc(), prompt);
            insertImage(canvas, url);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className='p-4 text-white space-y-3'>
            <textarea
                className='w-full bg-zinc-800 rounded p-3 min-h-[120px]'
                placeholder='Describe the image you want to generate...'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                onClick={handleGenerate}
                disabled={busy || !prompt.trim()}
                className='w-full bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 rounded py-2'
            >
                {busy ? 'Working…' : 'Generate Image'}
            </button>
            <div className='grid grid-cols-2 gap-2 text-sm'>
                <button onClick={handleUpscale} className='bg-zinc-800 rounded px-3 py-2'>Upscale Selection</button>
                <button onClick={handleBackground} className='bg-zinc-800 rounded px-3 py-2'>Replace Background</button>
            </div>
        </div>
    );
}
