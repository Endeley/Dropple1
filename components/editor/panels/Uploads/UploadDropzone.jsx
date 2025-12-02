'use client';
import { useRef } from 'react';
import { Upload } from 'lucide-react';

export default function UploadDropzone({ onUpload }) {
    const inputRef = useRef(null);

    const handleFiles = (files) => {
        [...files].forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                onUpload({ file, src: e.target.result });
            };
            reader.readAsDataURL(file);
        });
    };

    const onDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div
            onClick={() => inputRef.current.click()}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className='
        w-full p-6 rounded-xl cursor-pointer
        bg-white dark:bg-neutral-800
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal hover:shadow-brutalHover
        flex flex-col items-center justify-center gap-3
        transition-all
      '>
            <Upload className='w-6 h-6' />
            <p className='text-sm font-semibold'>Click or Drop Files Here</p>

            <input ref={inputRef} type='file' accept='image/*' multiple className='hidden' onChange={(e) => handleFiles(e.target.files)} />
        </div>
    );
}
