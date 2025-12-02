'use client';

import SectionWrapper from './SectionWrapper';

export default function StrokeSection() {
    return (
        <SectionWrapper title='Stroke'>
            <div className='flex items-center gap-3'>
                <input type='checkbox' className='w-5 h-5' />
                <span className='text-sm'>Enable Stroke</span>
            </div>

            <div className='grid grid-cols-2 gap-3 mt-3'>
                <div>
                    <p className='text-xs opacity-70 mb-1'>Weight</p>
                    <input type='number' className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>

                <div>
                    <p className='text-xs opacity-70 mb-1'>Color</p>
                    <input type='color' className='w-full h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>
            </div>
        </SectionWrapper>
    );
}
