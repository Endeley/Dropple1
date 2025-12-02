"use client";

import { getLayerIcon } from './layerIcons';
import { toggleLock, toggleVisibility } from './layerUtils';

export default function LayerItem({
    layer,
    index,
    canvas,
    onSelect,
    onDragStart,
    onDrop,
}) {
    const { obj } = layer;

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDrop={(e) => onDrop(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => onSelect(obj)}
            className='flex items-center justify-between px-2 py-1 text-sm bg-zinc-800 hover:bg-zinc-700 cursor-pointer border-b border-zinc-700'>
            <div className='flex items-center gap-2'>
                <span>{getLayerIcon(obj)}</span>
                <span>{layer.name}</span>
            </div>

            <div className='flex items-center gap-2'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleVisibility(obj);
                        canvas.requestRenderAll();
                    }}>
                    {obj.visible ? '👁️' : '🚫'}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLock(obj);
                        canvas.requestRenderAll();
                    }}>
                    {obj.lockMovementX ? '🔒' : '🔓'}
                </button>
            </div>
        </div>
    );
}
