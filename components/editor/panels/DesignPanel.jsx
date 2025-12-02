'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { DESIGN_CATEGORIES, STYLE_PALETTES } from '../config';

export default function DesignPanel({ designTab, setDesignTab, templatePlaceholders }) {
    return (
        <motion.div
            key='design-panel'
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className='w-64 bg-white border border-gray-200 rounded-3xl shadow-lg p-5 flex flex-col gap-5'
        >
            <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold text-gray-800'>Design</p>
                    <button className='text-xs text-blue-500 hover:underline'>See all</button>
                </div>
                <div className='flex gap-2 text-xs font-semibold'>
                    {['templates', 'styles'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setDesignTab(tab)}
                            className={`flex-1 rounded-2xl py-2 capitalize ${
                                designTab === tab ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {designTab === 'templates' ? (
                <div className='space-y-4'>
                    <div className='bg-gray-50 rounded-2xl p-3'>
                        <p className='text-xs font-semibold text-gray-500 uppercase'>Trending templates</p>
                        <div className='mt-3 grid grid-cols-2 gap-3'>
                            {templatePlaceholders.map((_, idx) => (
                                <div key={idx} className='h-20 rounded-2xl bg-white border border-gray-200 shadow-inner' />
                            ))}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2 text-xs font-medium text-gray-600'>
                        {DESIGN_CATEGORIES.map((category) => (
                            <button key={category} className='rounded-2xl border border-gray-200 py-2 hover:border-blue-200 hover:text-blue-600'>
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='space-y-4'>
                    <div className='text-xs font-semibold text-gray-500 uppercase'>Style palettes</div>
                    <div className='space-y-3'>
                        {STYLE_PALETTES.map(({ name, colors }) => (
                            <button key={name} className='w-full rounded-2xl border border-gray-200 p-3 flex items-center gap-3 hover:border-blue-200'>
                                <div className='flex gap-1'>
                                    {colors.map((color) => (
                                        <span key={color} className='w-4 h-4 rounded-full' style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                                <span className='text-sm text-gray-700'>{name}</span>
                            </button>
                        ))}
                    </div>
                    <div className='text-xs text-gray-400'>Hover a palette to preview on canvas (coming soon)</div>
                </div>
            )}
        </motion.div>
    );
}
