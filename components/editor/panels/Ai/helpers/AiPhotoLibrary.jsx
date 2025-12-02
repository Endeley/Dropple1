'use client';

import { useState } from 'react';
import AiGenerateForm from './AiGenerateForm';
import AiPhotoItem from './AiPhotoItem';

export default function AiPhotoLibrary() {
    const [generated, setGenerated] = useState([]);

    const addGeneratedImage = (img) => {
        setGenerated((prev) => [...prev, img]);
    };

    return (
        <div className='flex flex-col gap-5'>
            <AiGenerateForm onResult={addGeneratedImage} />

            {generated.length === 0 && <p className='text-sm opacity-60'>Generate AI images to use them in your design.</p>}

            <div className='grid grid-cols-2 gap-4'>
                {generated.map((src, i) => (
                    <AiPhotoItem key={i} src={src} />
                ))}
            </div>
        </div>
    );
}
