'use client';

import { useEffect, useRef } from 'react';
import { useTemplateStore } from '@/stores/useTemplateStore';

export default function Rulers() {
    const showRulers = useTemplateStore((s) => s.showRulers);
    const topRuler = useRef(null);
    const leftRuler = useRef(null);

    useEffect(() => {
        if (!showRulers) return;
        drawTopRuler();
        drawLeftRuler();
    }, [showRulers]);

    const drawTopRuler = () => {
        if (!topRuler.current) return;
        const ctx = topRuler.current.getContext('2d');
        const width = topRuler.current.width;
        const height = topRuler.current.height;
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = '#b8beca';
        ctx.fillStyle = '#374151';
        ctx.lineWidth = 1.2;
        ctx.font = '18px Inter, system-ui, -apple-system, sans-serif';
        ctx.textBaseline = 'top';
        ctx.beginPath();

        for (let x = 0; x < width; x += 10) {
            const long = x % 100 === 0;
            const mid = x % 50 === 0;
            const tick = long ? 26 : mid ? 16 : 12;
            ctx.moveTo(x, height);
            ctx.lineTo(x, height - tick);
            if (long) {
                ctx.fillText(x.toString(), x + 2, 6);
            }
        }
        ctx.stroke();
    };

    const drawLeftRuler = () => {
        if (!leftRuler.current) return;
        const ctx = leftRuler.current.getContext('2d');
        const width = leftRuler.current.width;
        const height = leftRuler.current.height;
        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = '#b8beca';
        ctx.fillStyle = '#374151';
        ctx.lineWidth = 1.2;
        ctx.font = '18px Inter, system-ui, -apple-system, sans-serif';
        ctx.textBaseline = 'top';
        ctx.beginPath();

        for (let y = 0; y < height; y += 10) {
            const long = y % 100 === 0;
            const mid = y % 50 === 0;
            const tick = long ? width : mid ? width * 0.75 : width * 0.5;
            ctx.moveTo(width, y);
            ctx.lineTo(width - tick, y);

            if (long) {
                ctx.save();
                ctx.translate(0, y);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(y.toString(), -32, 8);
                ctx.restore();
            }
        }
        ctx.stroke();
    };

    if (!showRulers) return null;

    return (
        <>
            <canvas
                ref={topRuler}
                width={2000}
                height={34}
                className='absolute top-0 left-0 right-0 z-40 bg-[#f8f9fc] border-b border-neutral-200 dark:border-neutral-700'
                style={{ width: '100%' }}
            />
            <canvas
                ref={leftRuler}
                width={34}
                height={2000}
                className='absolute top-20 left-0 z-40 bg-[#f8f9fc] border-r border-neutral-200 dark:border-neutral-700'
                style={{ height: '100%' }}
            />
        </>
    );
}
