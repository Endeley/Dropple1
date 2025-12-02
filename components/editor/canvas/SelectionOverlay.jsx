'use client';

import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelectionStore } from '@/stores/useSelectionStore';
import { useTransformControls } from './engine/useTransformControls';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useGuidesStore } from '@/stores/useGuidesStore';

const HANDLE_CONFIG = [
    { id: 'tl', className: 'top-0 left-0 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize' },
    { id: 'tm', className: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-ns-resize' },
    { id: 'tr', className: 'top-0 right-0 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize' },
    { id: 'mr', className: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
    { id: 'br', className: 'bottom-0 right-0 translate-x-1/2 translate-y-1/2 cursor-nwse-resize' },
    { id: 'bm', className: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 cursor-ns-resize' },
    { id: 'bl', className: 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize' },
    { id: 'ml', className: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize' },
];

const ROTATION_HANDLE = {
    id: 'rot',
    className:
        'top-0 left-1/2 -translate-x-1/2 -translate-y-[230%] cursor-grab w-4 h-4 shadow-md',
};

export default function SelectionOverlay() {
    const selection = useSelectionStore((s) => s.selection);
    const transform = useTransformControls();
    const duplicateSelection = useTemplateStore((s) => s.duplicateSelection);
    const deleteSelection = useTemplateStore((s) => s.deleteSelection);
    const bringForward = useTemplateStore((s) => s.bringForward);
    const sendBackward = useTemplateStore((s) => s.sendBackward);
    const lockSelected = useTemplateStore((s) => s.lockSelected);
    const unlockObject = useTemplateStore((s) => s.unlockObject);
    const selectedObject = useTemplateStore((s) => s.selectedObject);
    const snapGuides = useGuidesStore((s) => s.guides);
    const snapSpacing = useGuidesStore((s) => s.spacing);

    const handles = useMemo(() => [...HANDLE_CONFIG, ROTATION_HANDLE], []);

    if (!selection?.bbox || selection.ids.length === 0) return null;

    const { bbox } = selection;
    const isSnapping = Boolean((snapGuides && snapGuides.length) || (snapSpacing && snapSpacing.length));
    const isLocked = Boolean(selectedObject?.locked);

    return (
        <div className='absolute pointer-events-none z-50' style={{ left: `${bbox.x}px`, top: `${bbox.y}px`, width: `${bbox.width}px`, height: `${bbox.height}px`, transform: `rotate(${bbox.angle}deg)`, transformOrigin: 'top left' }}>
            <motion.div
                className='absolute inset-0 border border-violet-500/80 rounded-md shadow-[0_0_0_1px_rgba(124,58,237,0.18)]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {handles.map((handle) => (
                <motion.div
                    key={handle.id}
                    className={`absolute w-3 h-3 rounded-full border-2 border-violet-600 bg-white shadow-sm pointer-events-auto ${handle.className}`}
                    style={{ transition: 'opacity 0.12s ease, transform 0.12s ease', opacity: 0.85 }}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        transform.beginTransform(handle.id, e);
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                />
            ))}

            <div className='absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-auto flex items-center gap-2'>
                <div className='flex items-center gap-2 rounded-xl bg-[#0f1117]/90 border border-white/10 px-3 py-2 shadow-xl'>
                    <button
                        type='button'
                        className='text-xs font-semibold text-white/90 hover:text-white hover:opacity-100 opacity-80'
                        onClick={(e) => {
                            e.stopPropagation();
                            duplicateSelection?.();
                        }}>
                        Duplicate
                    </button>
                    <span className='w-px h-4 bg-white/10' />
                    <button
                        type='button'
                        className='text-xs font-semibold text-white/90 hover:text-white hover:opacity-100 opacity-80'
                        onClick={(e) => {
                            e.stopPropagation();
                            bringForward?.();
                        }}>
                        Front
                    </button>
                    <button
                        type='button'
                        className='text-xs font-semibold text-white/90 hover:text-white hover:opacity-100 opacity-80'
                        onClick={(e) => {
                            e.stopPropagation();
                            sendBackward?.();
                        }}>
                        Back
                    </button>
                    <button
                        type='button'
                        className='text-xs font-semibold text-white/90 hover:text-white hover:opacity-100 opacity-80'
                        onClick={(e) => {
                            e.stopPropagation();
                            if (isLocked) {
                                unlockObject?.(selectedObject);
                            } else {
                                lockSelected?.();
                            }
                        }}>
                        {isLocked ? 'Unlock' : 'Lock'}
                    </button>
                    <button
                        type='button'
                        className='text-xs font-semibold text-rose-200 hover:text-white hover:opacity-100 opacity-80'
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteSelection?.();
                        }}>
                        Delete
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isSnapping ? (
                    <motion.div
                        className='absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500/90 text-white text-xs font-semibold shadow-lg'
                        initial={{ opacity: 0, scale: 0.9, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -4 }}
                    >
                        Snap
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
