"use client";

import { useState } from 'react';
import AiImagePanel from './AiImagePanel';
import AiVideoPanel from './AiVideoPanel';
import AiAudioPanel from './AiAudioPanel';
import Ai3DPanel from './Ai3DPanel';

const tabs = [
    { id: 'image', label: 'Image' },
    { id: 'video', label: 'Video' },
    { id: 'audio', label: 'Audio' },
    { id: '3d', label: '3D' },
];

export default function AiModal({ canvas, onClose }) {
    const [tab, setTab] = useState('image');

    const renderPanel = () => {
        switch (tab) {
            case 'video':
                return <AiVideoPanel canvas={canvas} />;
            case 'audio':
                return <AiAudioPanel canvas={canvas} />;
            case '3d':
                return <Ai3DPanel canvas={canvas} />;
            case 'image':
            default:
                return <AiImagePanel canvas={canvas} />;
        }
    };

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
            <div className='w-[640px] max-w-full bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800'>
                <div className='flex items-center justify-between px-4 py-3 border-b border-zinc-800'>
                    <div className='flex items-center gap-2 text-sm text-zinc-400'>
                        {tabs.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setTab(item.id)}
                                className={`px-3 py-1 rounded-full ${tab === item.id ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={onClose} className='text-white text-xl'>×</button>
                </div>
                <div className='max-h-[70vh] overflow-y-auto'>{renderPanel()}</div>
            </div>
        </div>
    );
}
