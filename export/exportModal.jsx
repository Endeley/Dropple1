"use client";

import { useExportStore } from './useExportStore';
import { exportPDFX } from './pdf/exportPDFX';
import { exportTIFF } from './tiff/exportTIFF';
import { exportSVG } from './svg/exportSVG';
import { usePagesStore } from '@/pagesystem/usePagesStore';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function ExportModal() {
    const pages = usePagesStore((s) => s.pages);
    const canvas = useCanvasStore((s) => s.canvas);
    const { format, dpi, bleed, cmyk, colorProfile } = useExportStore();

    const handleExport = async () => {
        if (format === 'pdf') return exportPDFX(pages, colorProfile);
        if (format === 'tiff' && canvas) return exportTIFF(canvas.lowerCanvasEl, dpi);
        if (format === 'svg' && canvas) return exportSVG(canvas);
    };

    return (
        <div className='absolute right-0 top-0 bg-zinc-900 w-96 h-full p-4 text-white'>
            <h2 className='font-bold text-lg mb-4'>Export</h2>
            <div className='space-y-3 text-sm'>
                <div>
                    <label>Format</label>
                    <select
                        className='w-full bg-zinc-800 p-2 rounded'
                        value={format}
                        onChange={(e) => useExportStore.setState({ format: e.target.value })}>
                        <option value='pdf'>PDF (Print-Ready)</option>
                        <option value='tiff'>TIFF</option>
                        <option value='svg'>SVG</option>
                    </select>
                </div>
                <div>
                    <label>DPI</label>
                    <input
                        type='number'
                        value={dpi}
                        className='w-full bg-zinc-800 p-2 rounded'
                        onChange={(e) => useExportStore.setState({ dpi: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label>Bleed (mm)</label>
                    <input
                        type='number'
                        value={bleed}
                        className='w-full bg-zinc-800 p-2 rounded'
                        onChange={(e) => useExportStore.setState({ bleed: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label>Color Profile</label>
                    <select
                        className='w-full bg-zinc-800 p-2 rounded'
                        value={colorProfile}
                        onChange={(e) => useExportStore.setState({ colorProfile: e.target.value })}>
                        <option value='Fogra39'>Fogra39</option>
                        <option value='USWebCoatedSWOP'>US Web Coated SWOP</option>
                    </select>
                </div>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            checked={cmyk}
                            onChange={(e) => useExportStore.setState({ cmyk: e.target.checked })}
                        />
                        Convert to CMYK
                    </label>
                </div>
                <button className='bg-purple-600 p-3 w-full rounded mt-4' onClick={handleExport}>
                    Export
                </button>
            </div>
        </div>
    );
}
*** End Patch
