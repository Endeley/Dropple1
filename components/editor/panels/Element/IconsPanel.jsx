'use client';

import * as LucideIcons from 'lucide-react';

export default function IconsPanel() {
    const ICON_KEYS = Object.keys(LucideIcons).slice(0, 60);

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Icons</h2>

            <div className='grid grid-cols-4 gap-4'>
                {ICON_KEYS.map((key) => {
                    const Icon = LucideIcons[key];
                    if (!Icon) return null;

                    return (
                        <button
                            key={key}
                            className='
                h-20 rounded-xl 
                bg-neutral-100 dark:bg-neutral-900
                border border-neutral-300 dark:border-neutral-700
                flex items-center justify-center
                shadow-sm
              '>
                            <Icon className='w-6 h-6' />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
