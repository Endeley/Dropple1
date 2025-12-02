'use client';

import { useAutoLayoutDragStore } from '@/stores/useAutoLayoutDragStore';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function AutoLayoutInsertionIndicator() {
    const indicator = useAutoLayoutDragStore((s) => s.indicator);
    const zoom = useCanvasStore((s) => s.zoom);
    const offset = useCanvasStore((s) => s.offset);

    if (!indicator) return null;

    const toScreen = (value) => value * zoom;
    const left = toScreen(indicator.x) + offset.x;
    const top = toScreen(indicator.y) + offset.y;
    const width = toScreen(indicator.width);
    const height = toScreen(indicator.height);

    return (
        <div
            className='pointer-events-none absolute z-50'
            style={{
                left,
                top,
                width: Math.max(width, 2),
                height: Math.max(height, 2),
                backgroundColor: '#8b5cf6',
                borderRadius: 2,
            }}
        />
    );
}
