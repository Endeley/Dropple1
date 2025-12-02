"use client";

export default function AiCommandInput({ value, onChange, onSubmit, loading }) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className='flex gap-2 mt-4'>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className='flex-1 bg-zinc-800 rounded p-2 text-sm resize-none h-16'
                placeholder='Ask Dropple AI for help...'
                disabled={loading}
            />
            <button
                onClick={onSubmit}
                disabled={loading || !value.trim()}
                className='bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 disabled:text-zinc-400 px-4 rounded text-sm'
            >
                {loading ? '...' : 'Send'}
            </button>
        </div>
    );
}
