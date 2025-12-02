'use client';

import SectionWrapper from './SectionWrapper';

export default function PositionSize() {
    return (
        <SectionWrapper title='Position & Size'>
            <div className='grid grid-cols-2 gap-3'>
                <div>
                    <p className='text-xs opacity-70 mb-1'>X</p>
                    <input className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>
                <div>
                    <p className='text-xs opacity-70 mb-1'>Y</p>
                    <input className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>
                <div>
                    <p className='text-xs opacity-70 mb-1'>Width</p>
                    <input className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>
                <div>
                    <p className='text-xs opacity-70 mb-1'>Height</p>
                    <input className='w-full p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
                </div>
            </div>
        </SectionWrapper>
    );
}
