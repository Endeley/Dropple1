'use client';

import AlignmentToolbar from './AlignmentToolbar';
import { useTemplateStore } from '@/stores/useTemplateStore';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ExportModal = dynamic(() => import('@/components/editor/workspace/export/ExportModal'), {
    ssr: false,
});

export default function TopNavbar() {
    const showRulers = useTemplateStore((s) => s.showRulers);
    const showGrid = useTemplateStore((s) => s.showGrid);
    const gridSize = useTemplateStore((s) => s.gridSize);
    const setShowRulers = useTemplateStore((s) => s.setShowRulers);
    const setShowGrid = useTemplateStore((s) => s.setShowGrid);
    const setGridSize = useTemplateStore((s) => s.setGridSize);
    const [showExport, setShowExport] = useState(false);

    return (
        <header className='h-20 border-b-2 border-neutral-300 bg-white px-4 dark:border-neutral-700 dark:bg-neutral-900'>
            <div className='flex h-full flex-col justify-center gap-2'>
                <div className='flex items-center justify-between'>
                    <div className='font-black text-lg uppercase tracking-wide'>Dropple Editor</div>
                    <div className='flex items-center gap-3 text-xs font-medium opacity-80'>
                        <label className='flex items-center gap-1'>
                            <input
                                type='checkbox'
                                checked={showRulers}
                                onChange={(e) => setShowRulers(e.target.checked)}
                            />
                            <span>Rulers</span>
                        </label>
                        <label className='flex items-center gap-1'>
                            <input
                                type='checkbox'
                                checked={showGrid}
                                onChange={(e) => setShowGrid(e.target.checked)}
                            />
                            <span>Grid</span>
                        </label>
                        <label className='flex items-center gap-1'>
                            <span>Grid Size</span>
                            <input
                                type='number'
                                min='5'
                                max='200'
                                value={gridSize}
                                onChange={(e) => setGridSize(Number(e.target.value))}
                                className='w-16 rounded border border-neutral-300 px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900'
                            />
                        </label>
                        <button
                            type='button'
                            onClick={() => setShowExport(true)}
                            className='rounded border border-neutral-300 px-3 py-1 text-xs font-semibold transition hover:border-violet-400 hover:text-violet-500 dark:border-neutral-700 dark:hover:border-violet-400'>
                            Export
                        </button>
                    </div>
                </div>
                <AlignmentToolbar />
            </div>
            {showExport && <ExportModal onClose={() => setShowExport(false)} />}
        </header>
    );
}
