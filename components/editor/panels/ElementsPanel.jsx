'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ELEMENT_SHORTCUTS } from '../config';

export default function ElementsPanel({ toolButtons, activeTool, onSelectTool }) {
    return (
        <motion.div
            key='elements-panel'
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className='w-64 bg-white border border-gray-200 rounded-3xl shadow-lg p-5 flex flex-col gap-5'
        >
            <div>
                <p className='text-sm font-semibold text-gray-800'>Elements</p>
                <p className='text-xs text-gray-400'>Add text, shapes, and media</p>
            </div>
            <div className='space-y-2'>
                {toolButtons.map(({ id, label, icon: Icon, handler }) => (
                    <button
                        key={id}
                        onClick={() => onSelectTool(id, handler)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border text-sm font-medium transition ${
                            activeTool === id ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                        }`}
                    >
                        <Icon className='w-4 h-4' />
                        <span className='flex-1 text-left'>{label}</span>
                    </button>
                ))}
            </div>
            <div className='grid grid-cols-3 gap-2 text-center text-xs font-medium text-gray-500'>
                {ELEMENT_SHORTCUTS.map((item) => (
                    <button key={item} className='rounded-2xl border border-dashed border-gray-300 py-3 hover:border-blue-200 hover:text-blue-600'>
                        {item}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
