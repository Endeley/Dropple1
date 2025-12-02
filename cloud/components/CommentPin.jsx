"use client";

export default function CommentPin({ comment }) {
    return (
        <div
            className='absolute z-40'
            style={{ left: comment.x, top: comment.y, transform: 'translate(-50%, -50%)' }}
        >
            <div className='bg-yellow-400 text-black w-6 h-6 rounded-full flex items-center justify-center shadow'>
                💬
            </div>
        </div>
    );
}
