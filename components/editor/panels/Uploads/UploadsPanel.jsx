'use client';

import { useState, useRef } from 'react';
import { ImagePlus, Video, Music, FileText, Upload, Library } from 'lucide-react';

const TABS = [
    { id: 'images', label: 'Images', icon: ImagePlus },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'fonts', label: 'Fonts', icon: FileText },
    { id: 'svgs', label: 'SVGs', icon: FileText },
    { id: 'audio', label: 'Audio', icon: Music },
    { id: 'recent', label: 'Recent', icon: Library },
];

export default function UploadsPanel() {
    const [activeTab, setActiveTab] = useState('images');
    const inputRef = useRef(null);

    const handleUploadClick = () => {
        inputRef.current?.click();
    };

    const handleFiles = (e) => {
        const files = Array.from(e.target.files);

        console.log('Uploaded Files:', files);
        // TODO: Add upload storage + asset manager
        // TODO: Insert into Fabric canvas if image or SVG
    };

    return (
        <div className='flex flex-col gap-6'>
            {/* PANEL HEADER */}
            <h2 className='text-xl font-semibold'>Uploads</h2>

            {/* TABS */}
            <div
                className='
        flex gap-2 overflow-x-auto pb-2 
        border-b border-neutral-300 dark:border-neutral-700
      '>
                {TABS.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setActiveTab(id)}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              border-2 shadow-sm text-sm font-medium
              transition-all
              ${activeTab === id ? 'bg-neutral-200 dark:bg-neutral-700 border-neutral-900' : 'bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700'}
            `}>
                        <Icon className='w-4 h-4' />
                        {label}
                    </button>
                ))}
            </div>

            {/* UPLOAD AREA */}
            <div
                className='
          flex flex-col items-center justify-center
          h-52 rounded-xl border-2 border-dashed
          border-neutral-400 dark:border-neutral-600
          bg-neutral-100 dark:bg-neutral-900
          shadow-sm cursor-pointer 
          hover:bg-neutral-200 dark:hover:bg-neutral-800
        '
                onClick={handleUploadClick}>
                <Upload className='w-10 h-10 opacity-60' />
                <p className='text-sm mt-2 opacity-70'>Click to upload or drag files here</p>
                <input type='file' ref={inputRef} onChange={handleFiles} className='hidden' multiple />
            </div>

            {/* CONTENT AREA BASED ON TAB */}
            {activeTab === 'images' && <ImagesContent />}
            {activeTab === 'videos' && <VideosContent />}
            {activeTab === 'fonts' && <FontsContent />}
            {activeTab === 'svgs' && <SVGsContent />}
            {activeTab === 'audio' && <AudioContent />}
            {activeTab === 'recent' && <RecentContent />}
        </div>
    );
}

/* -------------------------------------------
   SUB-PANELS (inside Uploads)
-------------------------------------------- */

function ImagesContent() {
    return (
        <div className='grid grid-cols-3 gap-3'>
            {Array.from({ length: 9 }).map((_, i) => (
                <div
                    key={i}
                    className='
            h-24 rounded-xl bg-neutral-200 dark:bg-neutral-800
            border border-neutral-300 dark:border-neutral-700 shadow-sm
          '
                />
            ))}
        </div>
    );
}

function VideosContent() {
    return <p className='opacity-70 text-sm'>Video uploads appear here.</p>;
}

function FontsContent() {
    return <p className='opacity-70 text-sm'>Upload TTF/OTF/WOFF font files.</p>;
}

function SVGsContent() {
    return <p className='opacity-70 text-sm'>Upload SVG files to convert into Fabric vector paths.</p>;
}

function AudioContent() {
    return <p className='opacity-70 text-sm'>Upload MP3/WAV audio files.</p>;
}

function RecentContent() {
    return (
        <div className='flex flex-col gap-3'>
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className='
            h-16 rounded-xl bg-neutral-200 dark:bg-neutral-800
            border border-neutral-300 dark:border-neutral-700 shadow-sm
          '
                />
            ))}
        </div>
    );
}
