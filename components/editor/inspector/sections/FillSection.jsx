'use client';

import SectionWrapper from './SectionWrapper';

export default function FillSection() {
    const COLORS = ['#000', '#fff', '#ef4444', '#10b981', '#3b82f6', '#a855f7'];

    return (
        <SectionWrapper title='Fill'>
            <div className='flex gap-2'>
                {COLORS.map((c) => (
                    <button key={c} className='w-8 h-8 rounded-md border border-neutral-300 dark:border-neutral-700' style={{ background: c }} />
                ))}
            </div>

            <input type='color' className='w-full h-10 rounded-lg mt-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700' />
        </SectionWrapper>
    );
}
