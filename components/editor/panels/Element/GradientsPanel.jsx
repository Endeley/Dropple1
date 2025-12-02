'use client';

export default function GradientsPanel() {
    const GRADIENTS = ['linear-gradient(135deg,#a855f7,#ec4899)', 'linear-gradient(135deg,#0ea5e9,#22d3ee)', 'linear-gradient(135deg,#ef4444,#f97316)', 'linear-gradient(135deg,#22c55e,#84cc16)'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Gradients</h2>

            <div className='grid grid-cols-2 gap-4'>
                {GRADIENTS.map((g) => (
                    <div
                        key={g}
                        className='
              h-28 rounded-xl 
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '
                        style={{ background: g }}></div>
                ))}
            </div>
        </div>
    );
}
