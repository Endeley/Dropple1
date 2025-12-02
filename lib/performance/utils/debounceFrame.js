export const debounceFrame = (fn) => {
    let rafId = null;
    return (...args) => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => fn(...args));
    };
};
