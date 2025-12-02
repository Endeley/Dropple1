'use client';

import SectionWrapper from './SectionWrapper';

export default function MaskSection() {
    return (
        <SectionWrapper title='Masking'>
            <p className='text-sm opacity-70 mb-1'>Apply mask to selected object</p>
            <button className='w-full h-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900'>Add Mask</button>
        </SectionWrapper>
    );
}
