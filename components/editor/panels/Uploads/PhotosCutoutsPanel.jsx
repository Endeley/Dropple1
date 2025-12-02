'use client';

export default function PhotosCutoutsPanel() {
    const placeholders = Array.from({ length: 9 });

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Cutout PNGs</h2>

            <div className='grid grid-cols-3 gap-3'>
                {placeholders.map((_, i) => (
                    <div
                        key={i}
                        className='
              h-28 rounded-xl 
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '
                    />
                ))}
            </div>

            <p className='text-xs opacity-60'>Perfect for product mockups, people cutouts, brands, objects.</p>
        </div>
    );
}
