'use client';

export default function DesignTemplatesPanel() {
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-xl font-semibold mb-2'>Templates</h2>

            <div className='grid grid-cols-2 gap-4'>
                {/* Template Placeholder Items */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className='
              h-32 rounded-xl
              bg-neutral-100 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '></div>
                ))}
            </div>
        </div>
    );
}
