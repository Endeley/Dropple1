'use client';

import { useEditorStore } from '@/stores/useEditorStore';

function Label({ children }) {
    return <span className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>{children}</span>;
}

export default function TextInspector({ selected }) {
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
            <h3 className='text-sm font-bold text-neutral-800 dark:text-neutral-100'>Text</h3>

            <div className='flex flex-col gap-1'>
                <Label>Font</Label>
                <input
                    type='text'
                    defaultValue={selected?.fontFamily || 'Inter'}
                    onChange={(e) => applyChange('fontFamily', e.target.value)}
                    className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <Label>Size</Label>
                <input
                    type='range'
                    min={8}
                    max={200}
                    defaultValue={selected?.fontSize || 32}
                    onChange={(e) => applyChange('fontSize', Number(e.target.value))}
                    className='w-full accent-violet-500'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <Label>Color</Label>
                <input
                    type='color'
                    defaultValue={selected?.fill || '#111111'}
                    onChange={(e) => applyChange('fill', e.target.value)}
                    className='h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                />
            </div>

            <div className='flex flex-col gap-1'>
                <Label>Line Height</Label>
                <input
                    type='number'
                    step='0.05'
                    min='0.5'
                    max='3'
                    defaultValue={selected?.lineHeight || 1.2}
                    onChange={(e) => applyChange('lineHeight', Number(e.target.value))}
                    className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                />
            </div>
        </div>
    );
}
