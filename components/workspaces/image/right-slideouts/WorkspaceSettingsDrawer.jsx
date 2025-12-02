'use client';

import { useEffect, useState } from 'react';
import { useWorkspaceUIStore } from '@/lib/state/ui/useWorkspaceUIStore';
import { useTemplateStore } from '@/stores/useTemplateStore';

export default function WorkspaceSettingsDrawer() {
    const activeRight = useWorkspaceUIStore((s) => s.activeRightSlideout);
    const closeRight = useWorkspaceUIStore((s) => s.closeRight);

    const snapToObjects = useTemplateStore((s) => s.snapToObjects);
    const toggleSnapping = useTemplateStore((s) => s.toggleSnapping);
    const showGrid = useTemplateStore((s) => s.showGrid);
    const setShowGrid = useTemplateStore((s) => s.setShowGrid);
    const gridSize = useTemplateStore((s) => s.gridSize);
    const setGridSize = useTemplateStore((s) => s.setGridSize);
    const saveCanvasViewState = useTemplateStore((s) => s.saveCanvasViewState);

    const [autosave, setAutosave] = useState(true);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (!autosave) return undefined;
        const id = setInterval(() => {
            saveCanvasViewState?.();
        }, 10000);
        return () => clearInterval(id);
    }, [autosave, saveCanvasViewState]);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.documentElement.dataset.droppleTheme = theme;
    }, [theme]);

    if (activeRight !== 'settings') return null;

    return (
        <div className='nw-slideout-content'>
            <div className='nw-slideout-header'>
                <h2 className='nw-slideout-title'>Workspace Settings</h2>
                <button className='nw-slideout-close' onClick={closeRight}>
                    ×
                </button>
            </div>

            <div className='nw-control-group'>
                <div className='nw-field'>
                    <label>Snapping</label>
                    <div className='nw-toggle-row'>
                        <input type='checkbox' checked={snapToObjects} onChange={toggleSnapping} />
                        <span>Snap to objects & grid</span>
                    </div>
                </div>

                <div className='nw-field'>
                    <label>Grid</label>
                    <div className='nw-toggle-row'>
                        <input type='checkbox' checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} />
                        <span>Show grid overlay</span>
                    </div>
                    <input
                        type='range'
                        min='4'
                        max='80'
                        value={gridSize || 20}
                        onChange={(e) => setGridSize(Number(e.target.value) || 10)}
                        className='nw-slider'
                    />
                </div>

                <div className='nw-field'>
                    <label>Theme</label>
                    <div className='nw-pill-row'>
                        <button
                            type='button'
                            className={`nw-chip ${theme === 'light' ? 'is-active' : ''}`}
                            onClick={() => setTheme('light')}
                        >
                            Light
                        </button>
                        <button
                            type='button'
                            className={`nw-chip ${theme === 'dark' ? 'is-active' : ''}`}
                            onClick={() => setTheme('dark')}
                        >
                            Dark
                        </button>
                    </div>
                </div>

                <div className='nw-field'>
                    <label>Autosave</label>
                    <div className='nw-toggle-row'>
                        <input type='checkbox' checked={autosave} onChange={(e) => setAutosave(e.target.checked)} />
                        <span>Save every 10s & on major edits</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
