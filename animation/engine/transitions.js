import { easings } from '../timeline/easing';

export const interpolate = (from, to, t, ease = 'linear') => {
    const e = easings[ease] || easings.linear;

    const eased = e(t);
    const out = {};

    for (const key in from) {
        if (typeof from[key] === 'number') {
            out[key] = from[key] + (to[key] - from[key]) * eased;
        } else {
            out[key] = t < 0.5 ? from[key] : to[key];
        }
    }

    return out;
};
