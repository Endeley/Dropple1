"use client";

import { useHistoryStore } from '@/stores/useHistoryStore';

export default function MobileTopBar() {
    const undo = useHistoryStore((s) => s.undo);
    const redo = useHistoryStore((s) => s.redo);

    return (
        <div className='h-12 bg-black/40 backdrop-blur flex items-center justify-between px-4 text-white border-b border-black/30'>
            <button className='text-lg'>←</button>
            <div className='text-sm font-semibold tracking-wide'>Dropple</div>
            <div className='flex gap-3 text-sm'>
                <button onClick={undo}>↺</button>
                <button onClick={redo}>↻</button>
                <button>⇪</button>
            </div>
        </div>
    );
}
