"use client";

import { useComments } from '../hooks/useComments';

export default function CommentsPanel({ projectId }) {
    const { comments, addComment, resolveComment } = useComments(projectId);

    return (
        <aside className='absolute right-0 top-0 w-80 h-full bg-zinc-900 p-4 text-white overflow-y-auto border-l border-zinc-800'>
            <h3 className='font-bold text-lg mb-4'>Comments</h3>
            {comments.map((comment) => (
                <div key={comment.id} className='mb-4 bg-zinc-800 p-3 rounded'>
                    <p className='font-semibold'>{comment.author}</p>
                    <p className='text-sm text-zinc-300'>{comment.text}</p>
                    <button
                        className='text-xs mt-2 text-green-400'
                        onClick={() => resolveComment(comment.id)}
                    >
                        Resolve
                    </button>
                </div>
            ))}
            <button
                className='mt-4 text-sm text-purple-400'
                onClick={() =>
                    addComment({ text: 'New comment', x: 100, y: 100, author: 'Me' })
                }
            >
                + Add comment
            </button>
        </aside>
    );
}
