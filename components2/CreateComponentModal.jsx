"use client";

import { useState } from 'react';
import { createComponent } from '@/smartobjects/createComponent';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function CreateComponentModal({ selectedObjects }) {
    const [name, setName] = useState('');
    const canvas = useCanvasStore((s) => s.canvas);

    const create = () => {
        if (!canvas || !selectedObjects?.length) return;
        const id = createComponent(canvas, selectedObjects);
    };

    return (
        <div className='p-4 bg-zinc-900 text-white'>
            <h2 className='font-bold mb-2'>Create Component</h2>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='bg-zinc-800 p-2 rounded w-full'
                placeholder='Component name'
            />

            <button onClick={create} className='mt-3 bg-purple-600 p-2 rounded w-full'>
                Create
            </button>
        </div>
    );
}
