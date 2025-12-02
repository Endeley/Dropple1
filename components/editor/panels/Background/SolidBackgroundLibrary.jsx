'use client';

import BgColorSwatch from './BgColorSwatch';

const SOLIDS = ['#000000', '#ffffff', '#7C3AED', '#A855F7', '#F43F5E', '#3B82F6', '#10B981', '#FDBA74', '#1E293B', '#475569', '#D1D5DB', '#FACC15'];

export default function SolidBackgroundLibrary({ fabricCanvas }) {
    return (
        <div className='grid grid-cols-4 gap-4'>
            {SOLIDS.map((c, i) => (
                <BgColorSwatch key={i} color={c} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
