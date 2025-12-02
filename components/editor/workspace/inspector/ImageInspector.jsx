'use client';

import { useEditorStore } from '@/stores/useEditorStore';

function Label({ children }) {
    return <span className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>{children}</span>;
}

export default function ImageInspector({ selected }) {
    const canvas = useEditorStore((s) => s.fabricCanvas);

    const applyChange = (prop, value) => {
        if (!selected) return;
        selected.set?.(prop, value);
        selected.dirty = true;
        selected.setCoords?.();
        canvas?.requestRenderAll?.();
    };

    const replaceImage = () => {
        if (!selected || !canvas) return;
        selected.set('fill', '#e2e8f0');
        canvas.requestRenderAll();
    };

    return (
        <div className='flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800'>
            <h3 className='text-sm font-bold text-neutral-800 dark:text-neutral-100'>Image</h3>

            <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col gap-1'>
                    <Label>Scale</Label>
                    <input
                        type='range'
                        min='0.1'
                        max='3'
                        step='0.05'
                        defaultValue={selected?.scaleX || 1}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            applyChange('scaleX', val);
                            applyChange('scaleY', val);
                        }}
                        className='w-full accent-violet-500'
                    />
                </div>
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
            </div>

            <div className='flex flex-col gap-1'>
                <Label>Border Radius</Label>
                <input
                    type='number'
                    min='0'
                    max='200'
                    defaultValue={selected?.rx ?? selected?.ry ?? 0}
                    onChange={(e) => {
                        const val = Number(e.target.value);
                        applyChange('rx', val);
                        applyChange('ry', val);
                    }}
                    className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                />
            </div>

            <button
                type='button'
                onClick={replaceImage}
                className='rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400'>
                Replace Image (placeholder)
            </button>
        </div>
    );
}
