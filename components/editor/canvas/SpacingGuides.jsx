'use client';

import { Fragment } from 'react';
import { useGuidesStore } from '@/stores/useGuidesStore';
import { useCanvasStore } from '@/stores/useCanvasStore';

export default function SpacingGuides() {
    const spacing = useGuidesStore((s) => s.spacing);
    const zoom = useCanvasStore((s) => s.zoom);
    const offset = useCanvasStore((s) => s.offset);

    if (!spacing.length) return null;

    const toScreenX = (x) => x * zoom + offset.x;
    const toScreenY = (y) => y * zoom + offset.y;

    return (
        <>
            {spacing.map((guide, index) => {
                if (guide.type === 'spacing-x') {
                    const left = toScreenX(guide.x1);
                    const top = toScreenY(guide.y);
                    const width = (guide.x2 - guide.x1) * zoom;
                    const labelLeft = toScreenX((guide.x1 + guide.x2) / 2) - 10;

                    return (
                        <Fragment key={`spacing-x-${index}`}>
                            <div
                                className='pointer-events-none absolute bg-violet-400/80'
                                style={{
                                    left: `${left}px`,
                                    top: `${top}px`,
                                    width: `${width}px`,
                                    height: '1px',
                                }}
                            />
                            <div
                                className='pointer-events-none absolute text-[10px] text-violet-400'
                                style={{
                                    left: `${labelLeft}px`,
                                    top: `${top - 20}px`,
                                }}>
                                {Math.round(guide.gap)}
                            </div>
                        </Fragment>
                    );
                }

                if (guide.type === 'spacing-y') {
                    const top = toScreenY(guide.y1);
                    const height = (guide.y2 - guide.y1) * zoom;
                    const left = toScreenX(guide.x);
                    const labelTop = toScreenY((guide.y1 + guide.y2) / 2) - 10;

                    return (
                        <Fragment key={`spacing-y-${index}`}>
                            <div
                                className='pointer-events-none absolute bg-violet-400/80'
                                style={{
                                    left: `${left}px`,
                                    top: `${top}px`,
                                    width: '1px',
                                    height: `${height}px`,
                                }}
                            />
                            <div
                                className='pointer-events-none absolute text-[10px] text-violet-400'
                                style={{
                                    left: `${left + 6}px`,
                                    top: `${labelTop}px`,
                                }}>
                                {Math.round(guide.gap)}
                            </div>
                        </Fragment>
                    );
                }

                return null;
            })}
        </>
    );
}
