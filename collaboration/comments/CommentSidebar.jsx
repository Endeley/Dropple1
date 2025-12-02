"use client";

import { useCommentsStore } from './useCommentsStore';

export default function CommentSidebar({ onSelectThread }) {
    const comments = useCommentsStore((s) => s.comments);

    return (
        <div className='p-4 bg-zinc-900 text-white h-full overflow-y-auto'>
            <h3 className='font-bold text-sm mb-4'>Comments</h3>

            {Object.values(comments).map((c) => (
                <button
                    key={c.id}
                    className='w-full text-left p-2 rounded bg-zinc-800 hover:bg-zinc-700 mb-2'
                    onClick={() => onSelectThread(c)}>
                    <strong>{c.author}</strong>: {c.message}
                </button>
            ))}
        </div>
    );
}
