"use client";

import MobileInspectorModal from '../modals/MobileInspectorModal';

export default function MobilePanels({ canvas, open, onOpen, onClose }) {
    return (
        <>
            {open && <MobileInspectorModal canvas={canvas} onClose={onClose} />}

            <button
                className='absolute bottom-24 right-4 bg-purple-600 w-14 h-14 rounded-full text-white text-3xl flex items-center justify-center shadow-xl'
                onClick={onOpen}
            >
                ⋮
            </button>
        </>
    );
}
