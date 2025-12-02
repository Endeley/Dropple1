"use client";

const COLORS = ['#ffffff', '#0EA5E9', '#F54291', '#F59E0B', '#22D3EE', '#14B8A6', '#4C1D95'];

export default function MobileColorPicker({ canvas }) {
    const apply = (color) => {
        const obj = canvas?.getActiveObject();
        if (!obj) return;
        if ('fill' in obj) obj.set('fill', color);
        canvas.requestRenderAll();
    };

    return (
        <div className='mb-4'>
            <p className='text-sm text-zinc-400 mb-2'>Fill color</p>
            <div className='flex flex-wrap gap-2'>
                {COLORS.map((color) => (
                    <button
                        key={color}
                        className='w-10 h-10 rounded-full border border-white/20'
                        style={{ backgroundColor: color }}
                        onClick={() => apply(color)}
                    />
                ))}
            </div>
        </div>
    );
}
