'use client';

export default function PatternsPanel() {
    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Patterns</h2>

            <div className='grid grid-cols-3 gap-3'>
                {Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={i}
                        className='
              h-20 rounded-xl 
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '></div>
                ))}
            </div>
        </div>
    );
}
