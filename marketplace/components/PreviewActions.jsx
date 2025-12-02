"use client";

import BuyButton from './BuyButton';
export default function PreviewActions({ templateId }) {
    const handleTry = () => {
        window.location.href = `/editor?template=${templateId}`;
    };

    const handleSave = async () => {
        await fetch('/api/marketplace/save', {
            method: 'POST',
            body: JSON.stringify({ templateId }),
        });
        alert('Template saved to your library');
    };

    return (
        <div className='flex flex-wrap gap-3 p-6 bg-zinc-900 border-t border-zinc-800'>
            <button onClick={handleTry} className='px-4 py-2 bg-purple-600 rounded text-white'>
                Try Template
            </button>
            <BuyButton templateId={templateId} />
            <button onClick={handleSave} className='px-4 py-2 bg-zinc-800 rounded text-white'>
                Save to Library
            </button>
        </div>
    );
}
