'use client';

export default function BasicShapesPanel() {
    const SHAPES = [
        { label: 'Rectangle', type: 'rect' },
        { label: 'Circle', type: 'circle' },
        { label: 'Triangle', type: 'triangle' },
        { label: 'Line', type: 'line' },
        { label: 'Arrow', type: 'arrow' },
    ];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Basic Shapes</h2>

            <div className='grid grid-cols-2 gap-4'>
                {SHAPES.map((shape) => (
                    <button
                        key={shape.type}
                        className='
              h-24 rounded-xl 
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              flex items-center justify-center
              text-sm font-medium
              shadow-sm
            '>
                        {shape.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
