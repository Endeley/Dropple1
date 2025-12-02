'use client';

export default function DesignStylesPanel() {
    const STYLES = ['Minimal', 'Bold', 'Luxury', 'Neon', 'Retro', 'Gradient', 'Elegant', 'Clean'];

    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-xl font-semibold'>Styles</h2>

            <div className='grid grid-cols-2 gap-3'>
                {STYLES.map((style) => (
                    <button
                        key={style}
                        className='
              h-20 rounded-xl
              bg-neutral-200 dark:bg-neutral-700
              border border-neutral-300 dark:border-neutral-600
              flex items-center justify-center
              text-sm font-medium
              shadow-sm
            '>
                        {style}
                    </button>
                ))}
            </div>
        </div>
    );
}
