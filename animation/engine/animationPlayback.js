import { useAnimationStore } from '../useAnimationStore';
import { computeObjectStateAtTime } from './keyframeEngine';

let raf = null;

export const startPlayback = (canvas) => {
    useAnimationStore.setState({ playing: true });

    const loop = () => {
        const { playhead, timelineLength, keyframes } = useAnimationStore.getState();

        const newPlayhead = playhead + 1000 / 60;

        if (newPlayhead >= timelineLength) {
            useAnimationStore.setState({ playhead: 0, playing: false });
            return;
        }

        useAnimationStore.setState({ playhead: newPlayhead });
        updateCanvasObjects(canvas, keyframes, newPlayhead);

        raf = requestAnimationFrame(loop);
    };

    loop();
};

export const stopPlayback = () => {
    cancelAnimationFrame(raf);
    useAnimationStore.setState({ playing: false });
};

export const updateCanvasObjects = (canvas, keyframes, time) => {
    canvas.getObjects().forEach((obj) => {
        const id = obj.__objectId;
        const kf = keyframes[id];
        if (!kf) return;

        const state = computeObjectStateAtTime(obj, kf, time);
        for (const prop in state) {
            obj.set(prop, state[prop]);
        }
    });

    canvas.requestRenderAll();
};
