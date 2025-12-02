'use client';

export default function TextEffectsPanel() {
    const EFFECTS = [
        { label: 'Shadow', class: 'drop-shadow-md' },
        { label: 'Glow', class: 'text-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' },
        { label: 'Outline', class: 'text-transparent stroke-white' },
        { label: 'Blur', class: 'blur-sm' },
        { label: 'Neon Pink', class: 'text-pink-400 shadow-[0_0_8px_rgba(255,0,180,.7)]' },
    ];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Text Effects</h2>

            <div className='flex flex-col gap-4'>
                {EFFECTS.map((fx) => (
                    <button
                        key={fx.label}
                        className='
              w-full rounded-xl p-4 text-left
              bg-neutral-100 dark:bg-neutral-900
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '>
                        <p className={`text-lg font-medium ${fx.class}`}>Sample Text</p>
                        <p className='text-xs mt-1 opacity-60'>{fx.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
