'use client';

import { useEditorStore } from '@/stores/useEditorStore';

function Label({ children }) {
    return <span className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>{children}</span>;
}

export default function ShapeInspector({ selected }) {
    const canvas = useEditorStore((s) => s.fabricCanvas);

    const applyChange = (prop, value) => {
        if (!selected) return;
        selected.set?.(prop, value);
        selected.dirty = true;
        selected.setCoords?.();
        canvas?.requestRenderAll?.();
    };

    return (
        <div className='flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800'>
            <h3 className='text-sm font-bold text-neutral-800 dark:text-neutral-100'>Shape</h3>

            <div className='flex flex-col gap-1'>
                <Label>Fill</Label>
                <input
                    type='color'
                    defaultValue={selected?.fill || '#4f46e5'}
                    onChange={(e) => applyChange('fill', e.target.value)}
                    className='h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                />
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-1'>
                    <Label>Stroke</Label>
                    <input
                        type='color'
                        defaultValue={selected?.stroke || '#111111'}
                        onChange={(e) => applyChange('stroke', e.target.value)}
                        className='h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label>Stroke Width</Label>
                    <input
                        type='number'
                        min='0'
                        max='20'
                        defaultValue={selected?.strokeWidth ?? 1}
                        onChange={(e) => applyChange('strokeWidth', Number(e.target.value))}
                        className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                    />
                </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-1'>
                    <Label>Opacity</Label>
                    <input
                        type='range'
                        min={0}
                        max={1}
                        step={0.05}
                        defaultValue={selected?.opacity ?? 1}
                        onChange={(e) => applyChange('opacity', Number(e.target.value))}
                        className='w-full accent-violet-500'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Label>Corner Radius</Label>
                    <input
                        type='number'
                        min='0'
                        max='300'
                        defaultValue={selected?.rx ?? selected?.ry ?? 0}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            applyChange('rx', val);
                            applyChange('ry', val);
                        }}
                        className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                    />
                </div>
            </div>
        </div>
    );
}
