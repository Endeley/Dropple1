"use client";

import { useAnimationStore } from '../useAnimationStore';

export default function Playhead() {
    const playhead = useAnimationStore((s) => s.playhead);

    return <div className='absolute top-0 w-0.5 bg-red-500' style={{ left: playhead + 'px', height: '100%' }} />;
}
