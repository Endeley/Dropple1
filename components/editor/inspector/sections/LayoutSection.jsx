'use client';

import SectionWrapper from './SectionWrapper';

export default function LayoutSection() {
    return (
        <SectionWrapper title='Layout'>
            <p className='text-xs opacity-70 mb-1'>Auto Layout Settings</p>

            <div className='grid grid-cols-2 gap-3'>
                <button className='p-2 rounded-lg border border-neutral-300 dark:border-neutral-700'>Horizontal</button>
                <button className='p-2 rounded-lg border border-neutral-300 dark:border-neutral-700'>Vertical</button>
            </div>

            <div className='mt-4'>
                <p className='text-xs opacity-70 mb-1'>Spacing</p>
                <input type='number' className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
            </div>
        </SectionWrapper>
    );
}
