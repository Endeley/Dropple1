'use client';

import { useMemo } from 'react';
import { useTemplateStore } from '@/stores/useTemplateStore';
import BlendModesInspector from './BlendModesInspector';

const DEFAULTS = {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    hue: 0,
    blur: 0,
};

function getFilterValue(filters, key) {
    if (!Array.isArray(filters)) return DEFAULTS[key] ?? 0;
    const needle = key === 'hue' ? 'huerotation' : key;
    const found = filters.find((f) => f?.type?.toLowerCase?.() === needle);
    if (!found) return DEFAULTS[key] ?? 0;
    switch (key) {
        case 'brightness':
            return found.brightness ?? DEFAULTS.brightness;
        case 'contrast':
            return found.contrast ?? DEFAULTS.contrast;
        case 'saturation':
            return found.saturation ?? DEFAULTS.saturation;
        case 'hue':
            return found.rotation ?? DEFAULTS.hue;
        case 'blur':
            return found.blur ?? DEFAULTS.blur;
        default:
            return DEFAULTS[key] ?? 0;
    }
}

export default function PhotoInspector() {
    const selected = useTemplateStore((s) => s.selectedObject);
    const applyImageFilter = useTemplateStore((s) => s.applyImageFilter);

    const values = useMemo(
        () => ({
            brightness: getFilterValue(selected?.filters, 'brightness'),
            contrast: getFilterValue(selected?.filters, 'contrast'),
            saturation: getFilterValue(selected?.filters, 'saturation'),
            hue: getFilterValue(selected?.filters, 'hue'),
            blur: getFilterValue(selected?.filters, 'blur'),
        }),
        [selected?.filters]
    );

    const cropMode = useTemplateStore((s) => s.cropMode);
    const enterCropMode = useTemplateStore((s) => s.enterCropMode);
    const applyCrop = useTemplateStore((s) => s.applyCrop);
    const cancelCrop = useTemplateStore((s) => s.cancelCrop);

    if (!selected || selected.type !== 'image') return null;

    return (
        <div className='flex flex-col gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800'>
            <h3 className='text-sm font-bold text-neutral-800 dark:text-neutral-100'>Photo</h3>

            <label className='text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Brightness</label>
            <input
                type='range'
                min={-1}
                max={1}
                step={0.05}
                className='w-full accent-violet-500'
                value={values.brightness}
                onChange={(e) => applyImageFilter('brightness', Number(e.target.value))}
            />

            <label className='mt-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Contrast</label>
            <input
                type='range'
                min={-1}
                max={1}
                step={0.05}
                className='w-full accent-violet-500'
                value={values.contrast}
                onChange={(e) => applyImageFilter('contrast', Number(e.target.value))}
            />

            <label className='mt-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Saturation</label>
            <input
                type='range'
                min={-1}
                max={1}
                step={0.05}
                className='w-full accent-violet-500'
                value={values.saturation}
                onChange={(e) => applyImageFilter('saturation', Number(e.target.value))}
            />

            <label className='mt-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Hue Rotation</label>
            <input
                type='range'
                min={-2}
                max={2}
                step={0.1}
                className='w-full accent-violet-500'
                value={values.hue}
                onChange={(e) => applyImageFilter('hue', Number(e.target.value))}
            />

            <label className='mt-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300'>Blur</label>
            <input
                type='range'
                min={0}
                max={1}
                step={0.02}
                className='w-full accent-violet-500'
                value={values.blur}
                onChange={(e) => applyImageFilter('blur', Number(e.target.value))}
            />

            <BlendModesInspector />

            <div className='mt-3 flex flex-col gap-2'>
                <button
                    type='button'
                    className='rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400'
                    onClick={() => applyImageFilter('grayscale', true)}>
                    Grayscale
                </button>
                <button
                    type='button'
                    className='rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400'
                    onClick={() => applyImageFilter('sepia', true)}>
                    Sepia
                </button>
            </div>

            <div className='mt-4 flex flex-col gap-2'>
                {!cropMode && (
                    <button
                        type='button'
                        className='rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400'
                        onClick={() => enterCropMode()}>
                        Crop Image
                    </button>
                )}
                {cropMode && (
                    <div className='flex gap-2'>
                        <button
                            type='button'
                            className='flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold transition hover:border-emerald-400 hover:text-emerald-500 dark:border-neutral-700 dark:hover:border-emerald-400'
                            onClick={() => applyCrop()}>
                            Apply Crop
                        </button>
                        <button
                            type='button'
                            className='flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm font-semibold transition hover:border-rose-400 hover:text-rose-500 dark:border-neutral-700 dark:hover:border-rose-400'
                            onClick={() => cancelCrop()}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
