import { useHistoryStore } from '@/stores/useHistoryStore';

const SNAPSHOT_PROPS = [
    '__objectId',
    '__componentId',
    '__instanceId',
    '__componentMaster',
    'layoutProps',
];

export const captureSnapshot = (canvas) => {
    if (!canvas) return null;
    return canvas.toJSON(SNAPSHOT_PROPS);
};

const recordHistory = (before, after) => {
    if (!before || !after) return;
    const store = useHistoryStore.getState();
    if (store.batching) {
        store.batchUpdate(after);
    } else {
        store.push({ before, after });
    }
};

export const attachHistoryEngine = (canvas) => {
    if (!canvas) return () => {};

    let beforeSnapshot = null;
    let pointerDown = false;

    const store = useHistoryStore.getState();

    const ensureBefore = () => {
        if (!beforeSnapshot) {
            beforeSnapshot = captureSnapshot(canvas);
        }
    };

    const handlePointerDown = () => {
        const before = captureSnapshot(canvas);
        store.batchStart(before);
        ensureBefore();
        pointerDown = true;
    };

    const handlePointerUp = () => {
        const after = captureSnapshot(canvas);
        recordHistory(beforeSnapshot, after);
        store.batchCommit();
        beforeSnapshot = null;
        pointerDown = false;
    };

    const handleTransformStart = () => {
        ensureBefore();
    };

    const handleModified = () => {
        if (pointerDown) return;
        const after = captureSnapshot(canvas);
        recordHistory(beforeSnapshot, after);
        beforeSnapshot = null;
    };

    const handleAdd = () => {
        ensureBefore();
    };

    const handleRemove = () => {
        ensureBefore();
    };

    canvas.on('mouse:down', handlePointerDown);
    canvas.on('touch:gesture', handlePointerDown);
    canvas.on('mouse:up', handlePointerUp);
    canvas.on('touch:end', handlePointerUp);
    canvas.on('object:moving', handleTransformStart);
    canvas.on('object:scaling', handleTransformStart);
    canvas.on('object:rotating', handleTransformStart);
    canvas.on('object:modified', handleModified);
    canvas.on('object:added', handleAdd);
    canvas.on('object:removed', handleRemove);

    return () => {
        canvas.off('mouse:down', handlePointerDown);
        canvas.off('touch:gesture', handlePointerDown);
        canvas.off('mouse:up', handlePointerUp);
        canvas.off('touch:end', handlePointerUp);
        canvas.off('object:moving', handleTransformStart);
        canvas.off('object:scaling', handleTransformStart);
        canvas.off('object:rotating', handleTransformStart);
        canvas.off('object:modified', handleModified);
        canvas.off('object:added', handleAdd);
        canvas.off('object:removed', handleRemove);
    };
};

const loadSnapshot = (canvas, snapshot, onComplete) => {
    canvas.loadFromJSON(snapshot, () => {
        canvas.renderAll();
        onComplete?.();
    });
};

export const performUndo = (canvas) => {
    if (!canvas) return;
    const store = useHistoryStore.getState();
    const entry = store.undoStack[store.undoStack.length - 1];
    if (!entry) return;

    loadSnapshot(canvas, entry.before, () => {
        useHistoryStore.getState().undo();
    });
};

export const performRedo = (canvas) => {
    if (!canvas) return;
    const store = useHistoryStore.getState();
    const entry = store.redoStack[store.redoStack.length - 1];
    if (!entry) return;

    loadSnapshot(canvas, entry.after, () => {
        useHistoryStore.getState().redo();
    });
};

export const recordCanvasHistory = (canvas, action) => {
    if (!canvas || typeof action !== 'function') return null;
    const before = captureSnapshot(canvas);
    const result = action();
    const after = captureSnapshot(canvas);
    recordHistory(before, after);
    return result;
};
