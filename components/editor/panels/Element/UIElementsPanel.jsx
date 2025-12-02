'use client';

export default function UIElementsPanel() {
    const UI_ITEMS = ['Button', 'Input', 'Card', 'Badge', 'Switch', 'Modal', 'Avatar'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>UI Elements</h2>

            <div className='grid grid-cols-2 gap-4'>
                {UI_ITEMS.map((item) => (
                    <button
                        key={item}
                        className='
              h-20 rounded-xl 
              bg-neutral-100 dark:bg-neutral-900
              border border-neutral-300 dark:border-neutral-700
              flex items-center justify-center
              shadow-sm
              text-sm font-medium
            '>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}
