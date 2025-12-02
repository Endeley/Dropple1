'use client';

export default function IllustrationsPanel() {
    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Illustrations</h2>

            <div className='grid grid-cols-2 gap-4'>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className='
              h-28 rounded-xl
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '></div>
                ))}
            </div>
        </div>
    );
}

