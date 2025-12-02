"use client";

import { useEffect, useState } from 'react';
import LayerItem from './LayerItem';
import { getCanvasLayers, reorderLayer } from './layerUtils';

export default function LayersPanel({ canvas }) {
    const [layers, setLayers] = useState([]);
    const [dragIndex, setDragIndex] = useState(null);

    const refresh = () => {
        if (!canvas) return;
        setLayers(getCanvasLayers(canvas).reverse());
    };

    useEffect(() => {
        if (!canvas) return;
        refresh();
        canvas.on('object:added', refresh);
        canvas.on('object:removed', refresh);
        canvas.on('object:modified', refresh);

        return () => {
            canvas.off('object:added', refresh);
            canvas.off('object:removed', refresh);
            canvas.off('object:modified', refresh);
        };
    }, [canvas]);

    const handleSelect = (obj) => {
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
    };

    const onDragStart = (_, index) => {
        setDragIndex(index);
    };

    const onDrop = (_, dropIndex) => {
        if (dragIndex === null) return;
        reorderLayer(canvas, dragIndex, dropIndex);
        setDragIndex(null);
        refresh();
    };

    return (
        <div className='h-full overflow-y-auto bg-zinc-900'>
            <div className='p-3 text-white font-bold text-sm border-b border-zinc-700'>Layers</div>

            <div>
                {layers.map((layer, index) => (
                    <LayerItem
                        key={layer.id}
                        layer={layer}
                        index={index}
                        canvas={canvas}
                        onSelect={handleSelect}
                        onDragStart={onDragStart}
                        onDrop={onDrop}
                    />
                ))}
            </div>
        </div>
    );
}
