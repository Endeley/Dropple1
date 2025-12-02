"use client";

import { useCommentsStore } from './useCommentsStore';

export default function CommentThread({ comment }) {
    const replyToComment = useCommentsStore((s) => s.replyToComment);
    const resolveComment = useCommentsStore((s) => s.resolveComment);

    return (
        <div className='p-4 bg-zinc-900 text-white h-full overflow-y-auto'>
            <h3 className='font-bold text-lg mb-2'>Comment</h3>

            <p className='bg-zinc-800 p-3 rounded'>{comment.message}</p>

            <div className='mt-4 space-y-3'>
                {(comment.replies || []).map((r) => (
                    <div key={r.id} className='bg-zinc-800 p-2 rounded'>
                        <strong>{r.author}: </strong>
                        {r.message}
                    </div>
                ))}
            </div>

            <textarea
                placeholder='Reply...'
                className='mt-3 w-full bg-zinc-800 p-2 rounded'
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        replyToComment(comment.id, {
                            id: crypto.randomUUID(),
                            author: 'Me',
                            message: e.target.value,
                        });
                        e.target.value = '';
                    }
                }}
            />

            {!comment.resolved && (
                <button className='mt-3 bg-green-600 p-2 rounded w-full' onClick={() => resolveComment(comment.id)}>
                    Resolve
                </button>
            )}
        </div>
    );
}
