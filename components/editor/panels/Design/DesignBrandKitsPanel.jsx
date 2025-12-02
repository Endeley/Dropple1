'use client';

export default function DesignBrandKitsPanel() {
    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Brand Kits</h2>

            <p className='text-neutral-600 dark:text-neutral-400 text-sm'>Upload logos, palettes, and fonts to create reusable brand kits.</p>

            <button
                className='
          w-full h-14 rounded-xl
          bg-neutral-100 dark:bg-neutral-900
          border border-neutral-300 dark:border-neutral-700
          shadow-sm text-sm font-medium
        '>
                + Create Brand Kit
            </button>
        </div>
    );
}
