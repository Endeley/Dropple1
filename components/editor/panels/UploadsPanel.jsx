'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export default function UploadsPanel({ handleUpload }) {
    return (
        <motion.div
            key='uploads-panel'
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className='w-64 bg-white border border-gray-200 rounded-3xl shadow-lg p-5 flex flex-col gap-5'
        >
            <div>
                <p className='text-sm font-semibold text-gray-800'>Uploads</p>
                <p className='text-xs text-gray-400'>Import media directly onto the canvas</p>
            </div>
            <label className='flex items-center justify-center gap-3 px-4 py-4 bg-blue-50 border border-blue-100 rounded-2xl cursor-pointer text-sm text-blue-600 font-medium hover:bg-blue-100 transition'>
                <Upload className='w-4 h-4' />
                Upload media
                <input type='file' onChange={handleUpload} className='hidden' />
            </label>
            <div className='space-y-2'>
                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Recent uploads</p>
                <div className='grid grid-cols-2 gap-2'>
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className='h-16 rounded-2xl bg-gray-100 border border-dashed border-gray-300' />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
