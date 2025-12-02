'use client';

export default function TextPresetsPanel() {
    const PRESETS = [
        { label: 'Bold Title', style: 'font-extrabold text-xl' },
        { label: 'Minimal', style: 'text-lg tracking-tight' },
        { label: 'Elegant', style: 'italic text-lg' },
        { label: 'Neon', style: 'text-lg font-semibold text-fuchsia-500' },
        { label: 'Outline', style: 'text-lg font-bold text-transparent stroke-black' },
    ];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Text Presets</h2>

            <div className='flex flex-col gap-4'>
                {PRESETS.map((preset) => (
                    <button
                        key={preset.label}
                        className='
              w-full rounded-xl p-4 text-left
              bg-neutral-100 dark:bg-neutral-900
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '>
                        <p className={`${preset.style}`}>Sample Text</p>
                        <p className='text-xs mt-1 opacity-60'>{preset.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
