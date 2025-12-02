'use client';

export default function DesignTypographyPanel() {
    const FONTS = ['Poppins', 'Inter', 'Roboto', 'Montserrat', 'Lora', 'Playfair Display'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Typography</h2>

            <div className='flex flex-col gap-3'>
                {FONTS.map((font) => (
                    <button
                        key={font}
                        className='
              h-16 rounded-xl
              bg-neutral-200 dark:bg-neutral-800
              border border-neutral-300 dark:border-neutral-700
              flex items-center justify-center
              text-md font-medium
              shadow-sm
            '
                        style={{ fontFamily: font }}>
                        {font}
                    </button>
                ))}
            </div>
        </div>
    );
}
