"use client";

import { useEffect, useState } from 'react';
import { useAnimationStore } from '../useAnimationStore';
import TimelineRow from './TimelineRow';
import Playhead from './Playhead';
import { getCanvasLayers } from '@/layers/layerUtils';

export default function TimelinePanel({ canvas }) {
    const [layers, setLayers] = useState([]);
    const keyframes = useAnimationStore((s) => s.keyframes);

    useEffect(() => {
        if (!canvas) return;

        const refresh = () => setLayers(getCanvasLayers(canvas));

        canvas.on('object:added', refresh);
        canvas.on('object:removed', refresh);
        refresh();

        return () => {
            canvas.off('object:added', refresh);
            canvas.off('object:removed', refresh);
        };
    }, [canvas]);

    return (
        <div className='w-full h-40 bg-zinc-950 border-t border-zinc-800 relative overflow-x-auto'>
            <Playhead />
            {layers.map((layer) => (
                <TimelineRow key={layer.id} layer={layer} keyframes={keyframes[layer.id] || []} />
            ))}
        </div>
    );
}
