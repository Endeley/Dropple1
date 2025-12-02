"use client";

export default function CommentPin({ comment, onClick }) {
    return (
        <div
            className='absolute cursor-pointer'
            style={{ left: comment.x, top: comment.y, transform: 'translate(-50%, -50%)' }}
            onClick={onClick}>
            {!comment.resolved ? (
                <div className='w-5 h-5 bg-yellow-400 rounded-full'></div>
            ) : (
                <div className='w-5 h-5 bg-green-500 rounded-full'></div>
            )}
        </div>
    );
}
