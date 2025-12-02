'use client';

import TextPresetCard from './TextPresetCard';

const PRESETS = [
    {
        id: 1,
        label: 'Gradient Title',
        style: 'gradient',
    },
    {
        id: 2,
        label: 'Outlined Text',
        style: 'outline',
    },
    {
        id: 3,
        label: 'Shadow Text',
        style: 'shadow',
    },
    {
        id: 4,
        label: 'Minimal Bold',
        style: 'bold',
    },
];

export default function TextPresetLibrary({ fabricCanvas }) {
    return (
        <div className='flex flex-col gap-4'>
            {PRESETS.map((p) => (
                <TextPresetCard key={p.id} preset={p} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
