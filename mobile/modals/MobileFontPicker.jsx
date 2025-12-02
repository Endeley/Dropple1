"use client";

const FONTS = ['Inter', 'Poppins', 'Space Grotesk', 'Work Sans', 'Playfair Display'];

export default function MobileFontPicker({ canvas }) {
    const apply = (font) => {
        const obj = canvas?.getActiveObject();
        if (!obj || obj.type !== 'textbox') return;
        obj.set('fontFamily', font);
        canvas.requestRenderAll();
    };

    return (
        <div className='mb-4'>
            <p className='text-sm text-zinc-400 mb-2'>Font family</p>
            <div className='grid grid-cols-2 gap-2'>
                {FONTS.map((font) => (
                    <button
                        key={font}
                        onClick={() => apply(font)}
                        className='bg-zinc-800 rounded-lg px-3 py-2 text-left text-sm'
                        style={{ fontFamily: font }}
                    >
                        {font}
                    </button>
                ))}
            </div>
        </div>
    );
}
