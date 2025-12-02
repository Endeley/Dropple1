'use client';

export default function EffectsPanel() {
    const EFFECTS = ['Glow', 'Shadow', 'Lens Flare', 'Neon Strip', 'Lighting Streak', 'Glass Blur'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Effects</h2>

            <div className='grid grid-cols-2 gap-4'>
                {EFFECTS.map((effect) => (
                    <button
                        key={effect}
                        className='
              h-20 rounded-xl 
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              flex items-center justify-center
              shadow-sm
              text-sm font-medium
            '>
                        {effect}
                    </button>
                ))}
            </div>
        </div>
    );
}
