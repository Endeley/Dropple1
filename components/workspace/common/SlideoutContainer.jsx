'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useWorkspaceUIStore } from '@/lib/state/ui/useWorkspaceUIStore';

/**
 * Generic slideout wrapper for the workspace. Handles:
 * - Left/right panel positioning with optional offset to account for rails/inspector
 * - Backdrop that closes on outside click
 * - Simple open/close animation while keeping content mounted briefly for exit
 * - Rendering mapped slideouts by id (`slideouts` prop) or raw children fallback
 */
export default function SlideoutContainer({ side = 'left', slideouts, offset = 0, children }) {
    const activeId =
        side === 'left'
            ? useWorkspaceUIStore((s) => s.activeLeftSlideout)
            : useWorkspaceUIStore((s) => s.activeRightSlideout);
    const close =
        side === 'left'
            ? useWorkspaceUIStore((s) => s.closeLeft)
            : useWorkspaceUIStore((s) => s.closeRight);
    const setLeftHoveringSlideout = useWorkspaceUIStore((s) => s.setLeftHoveringSlideout);
    const setRightHoveringSlideout = useWorkspaceUIStore((s) => s.setRightHoveringSlideout);

    const [visibleId, setVisibleId] = useState(activeId);
    const panelRef = useRef(null);

    // Keep the last active panel mounted briefly so the exit animation can play.
    useEffect(() => {
        if (activeId) {
            setVisibleId(activeId);
            return;
        }
        const timeout = setTimeout(() => setVisibleId(null), 200);
        return () => clearTimeout(timeout);
    }, [activeId]);

    // Scroll to top when a slideout opens.
    useEffect(() => {
        if (!activeId || !panelRef.current) return;
        panelRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }, [activeId]);

    const Content = useMemo(() => {
        if (!slideouts) return null;
        return slideouts[activeId || visibleId] || null;
    }, [slideouts, activeId, visibleId]);

    const isOpen = Boolean(activeId);
    const hasContent = Boolean(Content || children);
    const shouldRender = Boolean(visibleId || isOpen) && hasContent;

    if (!shouldRender) return null;

    const sideOffset = offset || (side === 'left' ? 220 : 320);

    const handleMouseEnter = () => {
        if (side === 'left') setLeftHoveringSlideout?.(true);
        else setRightHoveringSlideout?.(true);
    };

    const handleMouseLeave = () => {
        if (side === 'left') {
            setLeftHoveringSlideout?.(false);
            setTimeout(() => {
                const state = useWorkspaceUIStore.getState();
                if (!state.leftHoveringSlideout && !state.leftHoveringTrigger) {
                    state.closeLeft();
                }
            }, 150);
        } else {
            setRightHoveringSlideout?.(false);
            setTimeout(() => {
                const state = useWorkspaceUIStore.getState();
                if (!state.rightHoveringSlideout && !state.rightHoveringTrigger) {
                    state.closeRight();
                }
            }, 150);
        }
    };

    return (
        <div className='fixed inset-0 z-40' style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
            <div className={`nw-slideout-backdrop ${isOpen ? 'is-open' : ''}`} onClick={close} />
            <div
                className={`nw-slideout ${side === 'left' ? 'left' : 'right'} ${isOpen ? 'is-open' : ''}`}
                style={{ [side === 'left' ? 'left' : 'right']: `${sideOffset}px` }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div ref={panelRef} className='nw-slideout-inner'>
                    {Content ? <Content /> : children}
                </div>
            </div>
        </div>
    );
}
