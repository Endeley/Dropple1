'use client';

export default function StickersPanel() {
    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Stickers</h2>

            <p className='text-neutral-500 dark:text-neutral-400 text-sm'>Stickers library will be added here.</p>

            <div className='grid grid-cols-3 gap-3'>
                {Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={i}
                        className='
              h-24 rounded-xl 
              bg-neutral-200 dark:bg-neutral-800 
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '></div>
                ))}
            </div>
        </div>
    );
}
