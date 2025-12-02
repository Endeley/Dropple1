'use client';

import UploadItem from './UploadItem';

export default function UploadGrid({ items, fabricCanvas }) {
    if (items.length === 0) {
        return <p className='text-sm opacity-60 mt-4'>No uploads yet. Add images to use them in your design.</p>;
    }

    return (
        <div className='grid grid-cols-2 gap-4'>
            {items.map((item, i) => (
                <UploadItem key={i} item={item} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
