'use client';

import { useTemplateStore } from '@/stores/useTemplateStore';

const FONT_OPTIONS = ['Inter', 'Poppins', 'Montserrat', 'Roboto'];

export default function TextInspector() {
    const selected = useTemplateStore((s) => s.selectedObject);
    const updateText = useTemplateStore((s) => s.updateSelectedObject);

    if (!selected || !['text', 'i-text'].includes(selected.type)) return null;

    return (
        <div className='flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800'>
            {/* FONT FAMILY */}
            <label className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Font</label>
            <select
                className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.fontFamily}
                onChange={(e) => updateText('fontFamily', e.target.value)}>
                {FONT_OPTIONS.map((font) => (
                    <option key={font}>{font}</option>
                ))}
            </select>

            {/* SIZE */}
            <label className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Size</label>
            <input
                type='number'
                className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.fontSize}
                min={8}
                max={300}
                onChange={(e) => updateText('fontSize', Number(e.target.value))}
            />

            {/* STYLE BUTTONS */}
            <div className='mt-3 flex gap-2'>
                <button
                    className={`rounded-lg border px-3 py-2 text-sm font-bold ${
                        selected.fontWeight === 'bold'
                            ? 'border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-400 dark:bg-violet-900/30 dark:text-violet-200'
                            : 'border-neutral-300 text-neutral-700 hover:border-violet-300 dark:border-neutral-700 dark:text-neutral-200'
                    }`}
                    onClick={() => updateText('fontWeight', selected.fontWeight === 'bold' ? 'normal' : 'bold')}>
                    B
                </button>

                <button
                    className={`rounded-lg border px-3 py-2 text-sm italic ${
                        selected.fontStyle === 'italic'
                            ? 'border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-400 dark:bg-violet-900/30 dark:text-violet-200'
                            : 'border-neutral-300 text-neutral-700 hover:border-violet-300 dark:border-neutral-700 dark:text-neutral-200'
                    }`}
                    onClick={() => updateText('fontStyle', selected.fontStyle === 'italic' ? 'normal' : 'italic')}>
                    I
                </button>

                <button
                    className={`rounded-lg border px-3 py-2 text-sm underline ${
                        selected.underline
                            ? 'border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-400 dark:bg-violet-900/30 dark:text-violet-200'
                            : 'border-neutral-300 text-neutral-700 hover:border-violet-300 dark:border-neutral-700 dark:text-neutral-200'
                    }`}
                    onClick={() => updateText('underline', !selected.underline)}>
                    U
                </button>
            </div>

            {/* COLOR */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Color</label>
            <input
                type='color'
                className='h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.fill}
                onChange={(e) => updateText('fill', e.target.value)}
            />

            {/* LETTER SPACING */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Letter Spacing</label>
            <input
                type='number'
                className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.charSpacing || 0}
                onChange={(e) => updateText('charSpacing', Number(e.target.value))}
            />

            {/* LINE HEIGHT */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Line Height</label>
            <input
                type='number'
                className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                value={selected.lineHeight || 1.2}
                step={0.1}
                min={0.5}
                max={3}
                onChange={(e) => updateText('lineHeight', Number(e.target.value))}
            />

            {/* DROP SHADOW */}
            <label className='mt-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Drop Shadow</label>
            <div className='grid grid-cols-2 gap-2'>
                <input
                    type='number'
                    className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                    placeholder='Offset X'
                    value={selected.shadow?.offsetX || 0}
                    onChange={(e) =>
                        updateText('shadow', {
                            ...selected.shadow,
                            offsetX: Number(e.target.value),
                        })
                    }
                />
                <input
                    type='number'
                    className='w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                    placeholder='Offset Y'
                    value={selected.shadow?.offsetY || 0}
                    onChange={(e) =>
                        updateText('shadow', {
                            ...selected.shadow,
                            offsetY: Number(e.target.value),
                        })
                    }
                />
                <input
                    type='number'
                    className='col-span-2 w-full rounded border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-900'
                    placeholder='Blur'
                    value={selected.shadow?.blur || 0}
                    onChange={(e) =>
                        updateText('shadow', {
                            ...selected.shadow,
                            blur: Number(e.target.value),
                        })
                    }
                />
                <input
                    type='color'
                    className='col-span-2 h-9 w-full rounded border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900'
                    value={selected.shadow?.color || '#000000'}
                    onChange={(e) =>
                        updateText('shadow', {
                            ...selected.shadow,
                            color: e.target.value,
                        })
                    }
                />
            </div>
        </div>
    );
}
