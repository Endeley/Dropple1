export const profiler = () => {
    const marks = new Map();
    return {
        start: (label) => marks.set(label, performance.now()),
        end: (label) => {
            const start = marks.get(label);
            if (!start) return null;
            const duration = performance.now() - start;
            marks.delete(label);
            return duration;
        },
    };
};
