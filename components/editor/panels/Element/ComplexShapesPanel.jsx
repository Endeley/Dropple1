'use client';

export default function ComplexShapesPanel() {
    const SHAPES = ['Star', 'Polygon', 'Blob', 'Badge', 'Ribbon', 'Hexagon'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Complex Shapes</h2>

            <div className='grid grid-cols-2 gap-4'>
                {SHAPES.map((shape) => (
                    <button
                        key={shape}
                        className='
              h-24 rounded-xl 
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              flex items-center justify-center
              text-sm font-medium
              shadow-sm
            '>
                        {shape}
                    </button>
                ))}
            </div>
        </div>
    );
}
