'use client';

import FontCard from './FontCard';

const FONT_SETS = [
    {
        title: 'Modern Clean',
        heading: 'Poppins',
        body: 'Inter',
    },
    {
        title: 'Elegant Serif',
        heading: 'Playfair Display',
        body: 'Source Serif Pro',
    },
    {
        title: 'Minimal Mono',
        heading: 'JetBrains Mono',
        body: 'Inter',
    },
];

export default function FontLibrary({ fabricCanvas }) {
    return (
        <div className='flex flex-col gap-4'>
            {FONT_SETS.map((set, i) => (
                <FontCard key={i} set={set} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
