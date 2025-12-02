'use client';

import SectionWrapper from './SectionWrapper';

export default function EffectsSection() {
    return (
        <SectionWrapper title='Effects'>
            <div>
                <p className='text-xs opacity-70 mb-1'>Opacity</p>
                <input type='range' min='0' max='100' className='w-full' />
            </div>

            <div className='mt-4'>
                <p className='text-xs opacity-70 mb-1'>Shadow</p>
                <input type='checkbox' className='mr-2' />
                <span>Add Shadow</span>
            </div>
        </SectionWrapper>
    );
}
