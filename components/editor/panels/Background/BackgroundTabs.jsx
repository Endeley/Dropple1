'use client';

export default function BackgroundTabs({ value, onChange }) {
    const tabs = [
        { id: 'solid', label: 'Solid' },
        { id: 'gradient', label: 'Gradient' },
        { id: 'texture', label: 'Texture' },
        { id: 'ai', label: 'AI' },
    ];

    return (
        <div className='flex gap-3'>
            {tabs.map((tab) => {
                const active = value === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`
              px-4 py-2 rounded-lg font-semibold tracking-wide
              border-2
              ${active ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700'}
              shadow-brutal hover:shadow-brutalHover transition-all
            `}>
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
