'use client';

export default function DesignLayoutsPanel() {
    const LAYOUTS = ['Grid', 'Split', 'Left Sidebar', 'Right Sidebar', 'Header Focus', 'Centered', 'Hero Layout'];

    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-xl font-semibold'>Layouts</h2>

            <div className='flex flex-col gap-3'>
                {LAYOUTS.map((layout) => (
                    <button
                        key={layout}
                        className='
              h-16 rounded-xl
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              flex items-center justify-center
              text-sm font-medium
              shadow-sm
            '>
                        {layout}
                    </button>
                ))}
            </div>
        </div>
    );
}
