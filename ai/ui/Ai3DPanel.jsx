"use client";

import { useState } from 'react';
import { textTo3D } from '@/ai/multimodal/threed/textTo3D';
import { imageTo3D } from '@/ai/multimodal/threed/imageTo3D';

export default function Ai3DPanel() {
    const [prompt, setPrompt] = useState('Futuristic chair');
    const [result, setResult] = useState(null);
    const [busy, setBusy] = useState(false);

    const handleTextTo3D = async () => {
        setBusy(true);
        try {
            const url = await textTo3D(prompt);
            setResult(url);
        } finally {
            setBusy(false);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setBusy(true);
        try {
            const buffer = await file.arrayBuffer();
            const base64 = `data:${file.type};base64,${btoa(String.fromCharCode(...new Uint8Array(buffer)))}`;
            const mesh = await imageTo3D(base64);
            setResult(mesh);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className='p-4 text-white space-y-3'>
            <textarea
                className='w-full bg-zinc-800 rounded p-3'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button onClick={handleTextTo3D} className='w-full bg-purple-600 rounded py-2'>
                {busy ? 'Generating…' : 'Generate 3D from text'}
            </button>
            <label className='block text-sm text-zinc-400'>Image → 3D</label>
            <input type='file' accept='image/*' onChange={handleImageUpload} className='w-full text-sm text-white' />
            {result && (
                <div className='text-xs text-zinc-400 break-all border border-zinc-800 rounded p-2'>
                    {typeof result === 'string' ? result : JSON.stringify(result).slice(0, 200)}
                </div>
            )}
        </div>
    );
}
