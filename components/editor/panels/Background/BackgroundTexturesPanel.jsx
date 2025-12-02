'use client';

export default function BackgroundTexturesPanel() {
    const placeholders = Array.from({ length: 6 });

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Textures</h2>

            <div className='grid grid-cols-3 gap-3'>
                {placeholders.map((_, i) => (
                    <div
                        key={i}
                        className='
              h-24 rounded-xl 
              bg-neutral-300 dark:bg-neutral-700
              border border-neutral-400 dark:border-neutral-600
              shadow-sm
            '
                    />
                ))}
            </div>

            <p className='text-xs opacity-60'>Noise, paper, grain, concrete, gradients, fabric.</p>
        </div>
    );
}
