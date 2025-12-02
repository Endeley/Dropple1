'use client';

export default function TextFontsPanel() {
    const FONTS = ['Poppins', 'Inter', 'Roboto', 'Montserrat', 'Playfair Display', 'Lora', 'Oswald'];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Fonts</h2>

            <div className='flex flex-col gap-3'>
                {FONTS.map((font) => (
                    <button
                        key={font}
                        className='
              h-16 rounded-xl px-4
              bg-neutral-100 dark:bg-neutral-900
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
              flex items-center justify-center
              text-lg font-medium
            '
                        style={{ fontFamily: font }}>
                        {font}
                    </button>
                ))}
            </div>
        </div>
    );
}
