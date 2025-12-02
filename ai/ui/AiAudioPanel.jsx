"use client";

import { useState } from 'react';
import { textToSpeech } from '@/ai/multimodal/audio/textToSpeech';
import { generateMusic } from '@/ai/multimodal/audio/generateMusic';

export default function AiAudioPanel() {
    const [text, setText] = useState('Welcome to Dropple AI.');
    const [voice, setVoice] = useState('default');
    const [musicPrompt, setMusicPrompt] = useState('ambient cinematic');
    const [audioUrl, setAudioUrl] = useState(null);
    const [busy, setBusy] = useState(false);

    const synthesize = async () => {
        setBusy(true);
        try {
            const dataUrl = await textToSpeech(text, voice);
            setAudioUrl(dataUrl);
        } finally {
            setBusy(false);
        }
    };

    const createMusic = async () => {
        setBusy(true);
        try {
            const url = await generateMusic(musicPrompt, 30);
            setAudioUrl(url);
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className='p-4 text-white space-y-3'>
            <textarea
                className='w-full bg-zinc-800 rounded p-3 min-h-[100px]'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                className='w-full bg-zinc-800 rounded p-2'
                value={voice}
                onChange={(e) => setVoice(e.target.value)}
                placeholder='Voice preset'
            />
            <button onClick={synthesize} className='w-full bg-purple-600 rounded py-2'>
                {busy ? 'Synthesizing…' : 'Text → Speech'}
            </button>
            <input
                className='w-full bg-zinc-800 rounded p-2'
                value={musicPrompt}
                onChange={(e) => setMusicPrompt(e.target.value)}
                placeholder='Describe music style'
            />
            <button onClick={createMusic} className='w-full bg-zinc-800 rounded py-2'>Generate Music</button>
            {audioUrl && (
                <audio controls className='w-full'>
                    <source src={audioUrl} />
                </audio>
            )}
        </div>
    );
}
