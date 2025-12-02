'use client';

export default function TextHeadingsPanel() {
    const HEADINGS = [
        { label: 'Heading 1', size: 'text-3xl', preview: 'Big Title' },
        { label: 'Heading 2', size: 'text-2xl', preview: 'Section Title' },
        { label: 'Heading 3', size: 'text-xl', preview: 'Sub Heading' },
        { label: 'Paragraph', size: 'text-base', preview: 'Body text preview' },
    ];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Headings</h2>

            <div className='flex flex-col gap-4'>
                {HEADINGS.map((h) => (
                    <button
                        key={h.label}
                        className='
              w-full rounded-xl p-4 text-left
              bg-neutral-100 dark:bg-neutral-900
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '>
                        <p className={`${h.size} font-semibold`}>{h.preview}</p>
                        <p className='text-xs mt-1 opacity-60'>{h.label}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
