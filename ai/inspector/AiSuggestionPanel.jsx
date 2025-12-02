"use client";

const SUGGESTIONS = [
    'Center everything on this page',
    'Make a 3 column layout',
    'Fix the colors using a bold palette',
    'Replace image with a city skyline',
    'Create a flyer template using purple and black',
];

export default function AiSuggestionPanel({ onSelect, disabled }) {
    return (
        <div className='flex flex-wrap gap-2 mt-4'>
            {SUGGESTIONS.map((suggestion) => (
                <button
                    key={suggestion}
                    disabled={disabled}
                    className='text-xs px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:text-zinc-500'
                    onClick={() => onSelect(suggestion)}
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}
