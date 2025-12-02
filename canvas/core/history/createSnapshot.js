import { diffChanges } from './diffChanges';

export function createSnapshot(prevState, nextState, meta = {}) {
    const patches = diffChanges(prevState, nextState);
    return {
        undo: patches.undo,
        redo: patches.redo,
        meta: {
            category: meta.category || 'meta',
            label: meta.label || 'Change',
            ...meta,
        },
        timestamp: Date.now(),
    };
}
