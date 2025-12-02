"use client";

import { useEffect, useState } from 'react';

export default function PreviewHero({ templateId }) {
    const [template, setTemplate] = useState(null);

    useEffect(() => {
        let mounted = true;
        fetch(`/api/marketplace/get?id=${templateId}`)
            .then((res) => res.json())
            .then((data) => mounted && setTemplate(data));
        return () => {
            mounted = false;
        };
    }, [templateId]);

    if (!template) return <div className='p-8 text-white'>Loading…</div>;

    return (
        <div className='w-full bg-zinc-950 p-8 flex flex-col md:flex-row gap-6'>
            <img
                src={template.thumbnail}
                className='w-full md:w-2/3 rounded-xl border border-zinc-800'
                alt={template.title}
            />

            <div className='flex-1 text-white'>
                <h1 className='text-3xl font-bold'>{template.title}</h1>
                <p className='text-zinc-400 mt-2'>{template.description}</p>
                <p className='mt-4 font-semibold text-xl'>
                    {template.price === 0 ? 'Free' : `$${template.price}`}
                </p>
                <p className='text-xs text-zinc-500 mt-1'>Category: {template.category}</p>
            </div>
        </div>
    );
}
