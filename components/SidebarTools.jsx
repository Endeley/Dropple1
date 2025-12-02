'use client';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ImagePlus, Layers, MousePointer2, Palette, Search, Settings, Shapes, Type, Upload } from 'lucide-react';
import * as fabric from 'fabric';
import { useEditorStore } from '../stores/useEditorStore';

const quickActions = [
    { id: 'select', icon: MousePointer2 },
    { id: 'search', icon: Search },
    { id: 'palette', icon: Palette },
    { id: 'layers', icon: Layers },
];

export default function SidebarTools() {
    const fabricCanvas = useEditorStore((s) => s.fabricCanvas);
    const [activeTool, setActiveTool] = useState('text');

    const templatePlaceholders = useMemo(() => Array.from({ length: 2 }), []);

    const addText = () => {
        if (!fabricCanvas) return;
        const text = new fabric.IText('Your text', {
            left: 200,
            top: 200,
            fill: '#333',
            fontFamily: 'Poppins',
            fontSize: 32,
        });
        fabricCanvas.add(text).setActiveObject(text);
    };

    const addShape = () => {
        if (!fabricCanvas) return;
        const rect = new fabric.Rect({
            width: 150,
            height: 100,
            fill: '#8b5cf6',
            rx: 16,
            ry: 16,
            left: 150,
            top: 150,
        });
        fabricCanvas.add(rect).setActiveObject(rect);
    };

    const handleUpload = (e) => {
        if (!fabricCanvas) return;
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (f) => {
            fabric.Image.fromURL(f.target.result, (img) => {
                img.scaleToWidth(400);
                fabricCanvas.add(img).setActiveObject(img);
            });
        };
        reader.readAsDataURL(file);
    };

    const toolButtons = [
        { id: 'text', label: 'Text', icon: Type, handler: addText },
        { id: 'shapes', label: 'Shapes', icon: Shapes, handler: addShape },
        { id: 'media', label: 'Media', icon: ImagePlus, handler: () => {} },
    ];

    return (
        <motion.aside initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4 }} className='flex gap-4 min-h-full items-stretch'>
            <div className='w-16 bg-white border border-gray-200 rounded-3xl shadow-sm p-3 flex flex-col justify-between items-center h-full'>
                <div className='space-y-3. bg-red-500'>
                    {quickActions.map(({ id, icon: Icon }) => (
                        <button key={id} className='w-10 h-10 rounded-2xl bg-gray-50 hover:bg-blue-50 flex items-center justify-center text-gray-500 hover:text-blue-600 transition'>
                            <Icon className='w-4 h-4 gap-4' />
                        </button>
                    ))}
                </div>
                <button className='w-10 h-10 rounded-2xl  bg-red-500 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition mb-8'>
                    <Settings className='w-4 h-4' />
                </button>
            </div>

            <div className='w-56 bg-white border border-gray-200 rounded-3xl shadow-sm p-8 flex flex-col  gap-6 h-full'>
                <div>
                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Tools</p>
                    <div className=' mt-6 flex  flex-col space-y-3'>
                        {toolButtons.map(({ id, label, icon: Icon, handler }) => (
                            <button
                                key={id}
                                onClick={() => {
                                    setActiveTool(id);
                                    handler();
                                }}
                                className={`w-full flex items-center justify-center gap-3 px-4 py-2 rounded-2xl border text-sm font-medium transition ${activeTool === id ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                                <Icon className='w-4 h-4' />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3'>Templates</p>
                    <div className='space-y-2'>
                        {templatePlaceholders.map((_, idx) => (
                            <div key={idx} className='h-16 rounded-2xl bg-gray-100 border border-dashed border-gray-300' />
                        ))}
                    </div>
                </div>

                <div className='mt-auto space-y-2'>
                    <p className='block text-xs font-semibold text-gray-500 uppercase tracking-wide'>Assets</p>
                    <label className='flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-2xl cursor-pointer text-sm text-blue-600 font-medium hover:bg-blue-100 transition'>
                        <Upload className='w-4 h-4' />
                        Upload
                        <input type='file' onChange={handleUpload} className='hidden' />
                    </label>
                </div>
            </div>
        </motion.aside>
    );
}
