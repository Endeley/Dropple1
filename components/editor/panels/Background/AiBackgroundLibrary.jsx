'use client';

import { useState } from 'react';
import AiBackgroundForm from './AiBackgroundForm';
import AiBackgroundItem from './AiBackgroundItem';

export default function AiBackgroundLibrary({ fabricCanvas }) {
    const [items, setItems] = useState([]);

    const addGenerated = (src) => {
        setItems((prev) => [...prev, src]);
    };

    return (
        <div className='flex flex-col gap-5'>
            <AiBackgroundForm onResult={addGenerated} />

            <div className='grid grid-cols-2 gap-4'>
                {items.map((src, i) => (
                    <AiBackgroundItem key={i} src={src} fabricCanvas={fabricCanvas} />
                ))}
            </div>
        </div>
    );
}
