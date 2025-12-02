'use client';

import SectionWrapper from './SectionWrapper';

export default function SelectionInfo() {
    return (
        <SectionWrapper title='Selected Object'>
            <p className='text-sm opacity-70'>Object Type</p>
            <p className='font-medium'>Rectangle / Text / Shape</p>
        </SectionWrapper>
    );
}
