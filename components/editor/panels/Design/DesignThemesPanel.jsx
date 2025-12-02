'use client';

export default function DesignThemesPanel() {
    const THEMES = ['Dark Modern', 'Light Minimal', 'Retro Pop', 'Luxury Gold'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Themes</h2>

            <div className='flex flex-col gap-4'>
                {THEMES.map((theme) => (
                    <button
                        key={theme}
                        className='
              h-16 rounded-xl
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              text-sm font-medium
              flex items-center justify-center
              shadow-sm
            '>
                        {theme}
                    </button>
                ))}
            </div>
        </div>
    );
}
