"use client";

import { usePresenceStore } from '../store/usePresenceStore';

export default function PresenceAvatars() {
    const users = usePresenceStore((s) => s.users);

    return (
        <div className='flex -space-x-2'>
            {Object.values(users).map((user) => (
                <img
                    key={user.id}
                    src={user.avatar}
                    title={user.name}
                    className='w-8 h-8 rounded-full border-2 border-zinc-900'
                    alt={user.name}
                />
            ))}
        </div>
    );
}
