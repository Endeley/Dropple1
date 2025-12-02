'use client';

import SectionWrapper from './SectionWrapper';

export default function TypographySection() {
    return (
        <SectionWrapper title='Typography'>
            <div className='flex flex-col gap-3'>
                <div>
                    <p className='text-xs opacity-70 mb-1'>Font Size</p>
                    <input type='number' className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>

                <div>
                    <p className='text-xs opacity-70 mb-1'>Line Height</p>
                    <input type='number' className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>

                <div>
                    <p className='text-xs opacity-70 mb-1'>Letter Spacing</p>
                    <input type='number' className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>
            </div>
        </SectionWrapper>
    );
}
