'use client';

export default function DesignPalettesPanel() {
    const PALETTES = [
        ['#0F172A', '#1E293B', '#475569', '#CBD5E1'],
        ['#D946EF', '#F0ABFC', '#E879F9', '#C084FC'],
        ['#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0'],
        ['#F97316', '#FDBA74', '#FED7AA', '#FFEDD5'],
    ];

    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-xl font-semibold'>Color Palettes</h2>

            <div className='flex flex-col gap-4'>
                {PALETTES.map((palette, i) => (
                    <div key={i} className='flex gap-2'>
                        {palette.map((color) => (
                            <div key={color} className='w-12 h-12 rounded-lg border border-neutral-700' style={{ background: color }} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
