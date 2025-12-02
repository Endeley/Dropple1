"use client";

import { useAnimationStore } from '../useAnimationStore';

export default function KeyframeItem({ kf, objectId }) {
    const removeKeyframe = useAnimationStore((s) => s.removeKeyframe);

    return (
        <div
            className='absolute w-3 h-3 bg-yellow-400 rounded-sm cursor-pointer'
            style={{ left: `${kf.time}px`, top: '12px' }}
            onDoubleClick={() => removeKeyframe(objectId, kf.id)}
        />
    );
}
