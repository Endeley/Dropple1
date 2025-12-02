'use client';

import SectionWrapper from './SectionWrapper';

export default function ExportSection() {
    return (
        <SectionWrapper title='Export'>
            <select className='w-full h-10 p-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700'>
                <option>PNG</option>
                <option>JPG</option>
                <option>SVG</option>
            </select>

            <button className='w-full h-12 mt-3 rounded-xl bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-sm font-medium'>Export</button>
        </SectionWrapper>
    );
}
