"use client";

import { usePresenceStore } from './usePresenceStore';

export default function CollaboratorCursor({ userId }) {
    const user = usePresenceStore((s) => s.users[userId]);
    if (!user?.cursor) return null;

    return (
        <div
            className='absolute pointer-events-none transition-all'
            style={{
                left: user.cursor.x,
                top: user.cursor.y,
                transform: 'translate(-50%, -50%)',
            }}>
            <div className='w-3 h-3 rounded-full' style={{ background: user.color }}></div>
            <span className='text-xs px-2 py-1 rounded bg-black/70 text-white mt-1 inline-block'>{user.name}</span>
        </div>
    );
}
