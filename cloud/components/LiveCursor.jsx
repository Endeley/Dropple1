"use client";

import { usePresenceStore } from '../store/usePresenceStore';

export default function LiveCursor() {
    const cursors = usePresenceStore((s) => s.cursors);

    return (
        <>
            {Object.entries(cursors).map(([id, cursor]) => (
                <div
                    key={id}
                    className='fixed pointer-events-none z-50'
                    style={{ left: cursor.x, top: cursor.y }}
                >
                    <div className='flex items-center gap-1 text-xs'>
                        <div className='w-3 h-3 rounded-full bg-purple-500' />
                        <span className='bg-black/70 text-white px-2 py-0.5 rounded'>{cursor.name || id}</span>
                    </div>
                </div>
            ))}
        </>
    );
}
