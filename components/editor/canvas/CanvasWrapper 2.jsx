'use client';

import { useEffect, useRef } from 'react';
import { useCanvasEngine } from './useCanvasEngine';

export default function CanvasWrapper() {
    const containerRef = useRef(null);
    const { initializeEngine } = useCanvasEngine();

    useEffect(() => {
        if (!containerRef.current) return;
        initializeEngine(containerRef.current);
    }, [initializeEngine]);

    return (
        <div
            ref={containerRef}
            className='
        relative w-full h-full overflow-hidden
        bg-neutral-100 dark:bg-neutral-900
      '>
            {/* PixiJS canvas gets inserted here */}
            {/* Fabric.js canvas overlays for interactions */}
        </div>
    );
}
