"use client";

import MobileTopBar from './MobileTopBar';
import MobileBottomBar from './MobileBottomBar';
import MobilePanels from './MobilePanels';

export default function MobileWorkspace({ canvas, wrapperRef, children, panelOpen, setPanelOpen }) {
    return (
        <div className='fixed inset-0 bg-zinc-900 overflow-hidden flex flex-col z-30'>
            <MobileTopBar canvas={canvas} />

            <div className='flex-1 relative'>
                <div ref={wrapperRef} className='absolute inset-0 overflow-hidden' />
                {children}
                <MobilePanels
                    canvas={canvas}
                    open={panelOpen}
                    onOpen={() => setPanelOpen(true)}
                    onClose={() => setPanelOpen(false)}
                />
            </div>

            <MobileBottomBar canvas={canvas} />
        </div>
    );
}
