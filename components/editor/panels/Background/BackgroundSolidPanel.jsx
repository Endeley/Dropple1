'use client';

export default function BackgroundSolidPanel() {
    const COLORS = ['#000000', '#ffffff', '#f87171', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa', '#f472b6', '#94a3b8'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Solid Colors</h2>

            <div className='grid grid-cols-5 gap-2'>
                {COLORS.map((c) => (
                    <button key={c} className='w-10 h-10 rounded-lg border border-neutral-400 shadow-sm' style={{ background: c }} />
                ))}
            </div>

            <div className='mt-4'>
                <p className='text-sm opacity-70'>Custom Color</p>
                <input
                    type='color'
                    className='
            w-full h-12 rounded-xl mt-2
            border border-neutral-300 dark:border-neutral-700
            bg-neutral-100 dark:bg-neutral-900 
          '
                />
            </div>
        </div>
    );
}
