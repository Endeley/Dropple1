"use client";

import { useComponentsStore } from '@/smartobjects/useComponentsStore';
import { createInstance } from '@/smartobjects/createInstance';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function ComponentLibraryPanel() {
    const masters = useComponentsStore((s) => s.masters);
    const canvas = useCanvasStore((s) => s.canvas);

    return (
        <div className='p-4 text-white space-y-3'>
            <h2 className='font-bold text-lg'>Components</h2>

            {Object.values(masters).length === 0 && (
                <p className='text-sm text-zinc-400'>No components yet.</p>
            )}

            {Object.values(masters).map((comp) => (
                <div
                    key={comp.id}
                    className='p-2 bg-zinc-800 rounded hover:bg-zinc-700 cursor-pointer'
                    onClick={() => canvas && createInstance(canvas, comp.id)}>
                    {comp.name}
                </div>
            ))}
        </div>
    );
}
