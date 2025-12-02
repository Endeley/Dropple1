"use client";

import { useComponentsStore } from '@/smartobjects/useComponentsStore';
import { applyVariant } from '@/smartobjects/variantEngine';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function VariantSwitcher({ instanceId }) {
    const canvas = useCanvasStore((s) => s.canvas);
    const instance = useComponentsStore((s) => s.instances[instanceId]);
    if (!instance || !canvas) return null;

    const variants = useComponentsStore((s) => s.variants[instance.componentId] || []);
    if (!variants.length) return null;

    return (
        <div className='p-3 bg-zinc-800 rounded-md text-white'>
            <h3 className='font-bold text-sm mb-2'>Variants</h3>

            <div className='flex flex-wrap gap-2'>
                {variants.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => applyVariant(canvas, instanceId, v.props)}
                        className='px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-xs'>
                        {Object.entries(v.props)
                            .map(([k, val]) => `${k}:${val}`)
                            .join(', ')}
                    </button>
                ))}
            </div>
        </div>
    );
}
