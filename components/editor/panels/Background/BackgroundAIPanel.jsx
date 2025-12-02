'use client';

export default function BackgroundAIPanel() {
    const samples = Array.from({ length: 6 });

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>AI Backgrounds</h2>

            <button
                className='
          w-full h-12 rounded-xl mb-4
          bg-neutral-200 dark:bg-neutral-800
          border border-neutral-300 dark:border-neutral-700
          shadow-sm font-medium
        '>
                Generate Background
            </button>

            <div className='grid grid-cols-3 gap-3'>
                {samples.map((_, i) => (
                    <div
                        key={i}
                        className='
              h-24 rounded-xl 
              bg-neutral-300 dark:bg-neutral-700
              border border-neutral-400 dark:border-neutral-600
              shadow-sm
            '></div>
                ))}
            </div>

            <p className='text-xs opacity-60'>Powered by SDXL / Custom AI.</p>
        </div>
    );
}
