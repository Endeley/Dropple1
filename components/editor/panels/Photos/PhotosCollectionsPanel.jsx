'use client';

export default function PhotosCollectionsPanel() {
    const COLLECTIONS = ['Nature', 'Urban', 'Abstract', 'People', 'Cars', 'Technology', 'Business', 'Minimal'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Collections</h2>

            <div className='flex flex-col gap-3'>
                {COLLECTIONS.map((name) => (
                    <button
                        key={name}
                        className='
              h-16 w-full rounded-xl px-4
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              shadow-sm font-medium text-left
            '>
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
