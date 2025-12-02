'use client';

import BgGradientCard from './BgGradientCard';

const GRADIENTS = [
    ['#7C3AED', '#A855F7'],
    ['#06B6D4', '#3B82F6'],
    ['#F43F5E', '#FB923C'],
    ['#10B981', '#3B82F6'],
    ['#0EA5E9', '#22D3EE'],
    ['#FF0080', '#7928CA'],
];

export default function GradientBackgroundLibrary({ fabricCanvas }) {
    return (
        <div className='flex flex-col gap-4'>
            {GRADIENTS.map((g, i) => (
                <BgGradientCard key={i} colors={g} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
