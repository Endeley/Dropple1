'use client';

import { useTemplateStore } from '@/stores/useTemplateStore';

export default function ShapeInspector() {
    const selected = useTemplateStore((s) => s.selectedObject);
    const update = useTemplateStore((s) => s.updateSelectedObject);

    if (!selected || (selected.type !== 'rect' && selected.type !== 'circle' && selected.type !== 'triangle')) return null;

    return (
        <div className='flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800'>
            {/* FILL COLOR */}
            <label className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Fill</label>
            <input
                type='color'
                className='h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.fill || '#000000'}
                onChange={(e) => update('fill', e.target.value)}
            />

            {/* STROKE COLOR */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Stroke Color</label>
            <input
                type='color'
                className='h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.stroke || '#000000'}
                onChange={(e) => update('stroke', e.target.value)}
            />

            {/* STROKE WIDTH */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Stroke Width</label>
            <input
                type='number'
                min={0}
                max={40}
                className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.strokeWidth || 0}
                onChange={(e) => update('strokeWidth', Number(e.target.value))}
            />

            {/* ROUNDED CORNERS (RECT ONLY) */}
            {selected.type === 'rect' && (
                <>
                    <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Corner Radius</label>
                    <input
                        type='number'
                        min={0}
                        max={200}
                        className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                        value={selected.rx || 0}
                        onChange={(e) => {
                            update('rx', Number(e.target.value));
                            update('ry', Number(e.target.value));
                        }}
                    />
                </>
            )}

            {/* OPACITY */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Opacity</label>
            <input
                type='range'
                min={0}
                max={1}
                step={0.05}
                className='w-full accent-violet-500'
                value={selected.opacity ?? 1}
                onChange={(e) => update('opacity', Number(e.target.value))}
            />
        </div>
    );
}
