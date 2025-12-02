"use client";

import { useState } from 'react';

export default function UploadTemplatePage() {
    const [data, setData] = useState({ title: '', category: '', price: 0, description: '' });
    const [submitting, setSubmitting] = useState(false);

    const submit = async () => {
        const templateFile = document.getElementById('template-file').files[0];
        const thumbnailFile = document.getElementById('thumbnail-file').files[0];
        if (!templateFile || !thumbnailFile) {
            alert('Please add template and thumbnail files.');
            return;
        }

        const form = new FormData();
        Object.entries(data).forEach(([key, value]) => form.append(key, value));
        form.append('template', templateFile);
        form.append('thumbnail', thumbnailFile);

        setSubmitting(true);
        try {
            const res = await fetch('/api/marketplace/create', {
                method: 'POST',
                body: form,
            });
            if (res.ok) {
                alert('Template uploaded!');
            } else {
                alert('Upload failed.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='p-6 text-white space-y-6 w-full max-w-2xl'>
            <div>
                <h1 className='text-3xl font-bold'>Upload Template</h1>
                <p className='text-zinc-400 mt-2'>Share your best work with millions of creators.</p>
            </div>

            <input
                className='p-3 bg-zinc-900 rounded border border-zinc-800'
                placeholder='Template title'
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <input
                className='p-3 bg-zinc-900 rounded border border-zinc-800'
                placeholder='Category'
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
            />
            <input
                type='number'
                className='p-3 bg-zinc-900 rounded border border-zinc-800'
                placeholder='Price'
                value={data.price}
                onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
            />
            <textarea
                rows={4}
                className='p-3 bg-zinc-900 rounded border border-zinc-800'
                placeholder='Description'
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
            />
            <div className='space-y-2'>
                <label className='text-sm text-zinc-400'>Template File (.dpp)</label>
                <input id='template-file' type='file' accept='.dpp' className='text-sm text-white' />
            </div>
            <div className='space-y-2'>
                <label className='text-sm text-zinc-400'>Thumbnail</label>
                <input id='thumbnail-file' type='file' accept='image/*' className='text-sm text-white' />
            </div>
            <button
                onClick={submit}
                disabled={submitting}
                className='bg-purple-600 rounded px-4 py-2 hover:bg-purple-500 disabled:bg-zinc-800'
            >
                {submitting ? 'Uploading…' : 'Upload & Publish'}
            </button>
        </div>
    );
}
