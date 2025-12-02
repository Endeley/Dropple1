'use client';

export default function BackgroundGradientsPanel() {
    const GRADIENTS = ['linear-gradient(135deg,#d946ef,#fb7185)', 'linear-gradient(135deg,#3b82f6,#06b6d4)', 'linear-gradient(135deg,#10b981,#84cc16)', 'linear-gradient(135deg,#f59e0b,#ef4444)'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Gradients</h2>

            <div className='grid grid-cols-2 gap-4'>
                {GRADIENTS.map((g) => (
                    <div
                        key={g}
                        className='
              h-28 rounded-xl border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '
                        style={{ background: g }}></div>
                ))}
            </div>

            <button
                className='
          w-full h-12 rounded-xl
          bg-neutral-200 dark:bg-neutral-800
          border border-neutral-300 dark:border-neutral-700
          shadow-sm font-medium
        '>
                Create Custom Gradient
            </button>
        </div>
    );
}
