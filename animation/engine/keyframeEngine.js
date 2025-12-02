import { interpolate } from './transitions';

export const computeObjectStateAtTime = (obj, keyframes, t) => {
    if (!keyframes || keyframes.length === 0) return obj;

    let prev = null;
    let next = null;

    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i].time <= t) prev = keyframes[i];
        if (keyframes[i].time > t) {
            next = keyframes[i];
            break;
        }
    }

    if (!prev) return obj;
    if (!next) return prev.props;

    const progress = (t - prev.time) / (next.time - prev.time);

    return interpolate(prev.props, next.props, progress, next.ease);
};
