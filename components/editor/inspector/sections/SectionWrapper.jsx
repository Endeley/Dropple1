'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SectionWrapper({ title, children }) {
    const [open, setOpen] = useState(true);

    return (
        <div className='border border-neutral-300 dark:border-neutral-700 rounded-xl'>
            <button className='w-full flex items-center justify-between p-3' onClick={() => setOpen(!open)}>
                <span className='font-semibold'>{title}</span>
                <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && <div className='p-4 pt-0'>{children}</div>}
        </div>
    );
}
