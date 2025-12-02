'use client';

import ShapeItem from './ShapeItem';

const SHAPES = [
    { id: 'square', type: 'rect', w: 120, h: 120, color: '#000' },
    { id: 'circle', type: 'circle', r: 60, color: '#000' },
    { id: 'triangle', type: 'triangle', w: 120, h: 120, color: '#000' },
    { id: 'rounded', type: 'rounded', w: 120, h: 120, color: '#000' },
];

export default function ShapeLibrary({ fabricCanvas }) {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {SHAPES.map((s) => (
                <ShapeItem key={s.id} shape={s} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
