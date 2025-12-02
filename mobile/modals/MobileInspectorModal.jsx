"use client";

import { useEffect, useState } from 'react';
import MobileColorPicker from './MobileColorPicker';
import MobileFontPicker from './MobileFontPicker';

export default function MobileInspectorModal({ canvas, onClose }) {
    const [activeObject, setActiveObject] = useState(canvas?.getActiveObject?.() || null);

    useEffect(() => {
        if (!canvas) return;
        const update = () => setActiveObject(canvas.getActiveObject());
        const clear = () => setActiveObject(null);

        canvas.on('selection:created', update);
        canvas.on('selection:updated', update);
        canvas.on('selection:cleared', clear);

        return () => {
            canvas.off('selection:created', update);
            canvas.off('selection:updated', update);
            canvas.off('selection:cleared', clear);
        };
    }, [canvas]);

    return (
        <div className='fixed inset-0 bg-black/50 flex items-end z-40'>
            <div className='w-full bg-zinc-900 p-4 rounded-t-3xl h-[60%] overflow-y-auto shadow-2xl'>
                <button className='text-white text-xl mb-4' onClick={onClose}>
                    ↓
                </button>

                {!activeObject && <p className='text-zinc-500 text-sm'>Tap an object to edit its style.</p>}

                {activeObject && (
                    <>
                        {activeObject.fill && <MobileColorPicker canvas={canvas} />}
                        {activeObject.type === 'textbox' && <MobileFontPicker canvas={canvas} />}
                        <div className='space-y-2 text-sm text-white'>
                            <div className='flex justify-between'>
                                <span>X</span>
                                <span>{Math.round(activeObject.left || 0)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Y</span>
                                <span>{Math.round(activeObject.top || 0)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Width</span>
                                <span>{Math.round(activeObject.getScaledWidth?.() || activeObject.width || 0)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Height</span>
                                <span>{Math.round(activeObject.getScaledHeight?.() || activeObject.height || 0)}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
