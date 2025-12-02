"use client";

import KeyframeItem from './KeyframeItem';

export default function TimelineRow({ layer, keyframes }) {
    return (
        <div className='relative h-8 border-b border-zinc-700 flex items-center'>
            <div className='w-32 px-2'>{layer.name}</div>
            <div className='flex-1 relative'>
                {keyframes?.map((kf) => (
                    <KeyframeItem key={kf.id} kf={kf} objectId={layer.id} />
                ))}
            </div>
        </div>
    );
}
