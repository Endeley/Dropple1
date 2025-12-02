'use client';

import GradientCard from './GradientCard';

const GRADIENTS = [
    ['#7C3AED', '#A855F7'],
    ['#06B6D4', '#3B82F6'],
    ['#F43F5E', '#FB923C'],
    ['#10B981', '#3B82F6'],
];

export default function GradientLibrary({ fabricCanvas }) {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {GRADIENTS.map((g, i) => (
                <GradientCard key={i} colors={g} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
