"use client";

import { useState } from 'react';
import { generateVideo } from '@/ai/multimodal/video/generateVideo';
import { imageToVideo } from '@/ai/multimodal/video/imageToVideo';

export default function AiVideoPanel({ canvas }) {
    const [prompt, setPrompt] = useState('');
    const [duration, setDuration] = useState(4);
    const [result, setResult] = useState(null);
    const [busy, setBusy] = useState(false);

    const createVideo = async () => {
        setBusy(true);
        try {
            const url = await generateVideo(prompt, duration);
            setResult(url);
        } finally {
            setBusy(false);
        }
    };

    const animateSelection = async () => {
        const active = canvas?.getActiveObject();
        if (!active || active.type !== 'image') return;
        setBusy(true);
        try {
            const url = await imageToVideo(active.getSrc(), prompt, duration);
            setResult(url);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className='p-4 text-white space-y-3'>
            <textarea
                className='w-full bg-zinc-800 rounded p-3 min-h-[120px]'
                placeholder='Describe the motion or video you want...'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <label className='text-xs text-zinc-400 uppercase'>Duration (seconds)</label>
            <input
                type='number'
                min={2}
                max={12}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className='w-full bg-zinc-800 rounded p-2'
            />
            <div className='grid grid-cols-2 gap-2'>
                <button onClick={createVideo} className='bg-purple-600 rounded py-2'>
                    {busy ? 'Generating…' : 'Text → Video'}
                </button>
                <button onClick={animateSelection} className='bg-zinc-800 rounded py-2'>Animate Selection</button>
            </div>
            {result && (
                <video src={result} controls className='w-full rounded border border-zinc-800' />
            )}
        </div>
    );
}
