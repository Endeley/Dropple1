const mostCommon = (arr) => {
    const counts = arr.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
    }, {});

    return Number(
        Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
    );
};

export const computeEqualSpacingY = (active, others, _canvas, threshold = 6) => {
    const all = [...others, active];

    const boxes = all.map((obj) => ({
        obj,
        rect: obj.getBoundingRect(false, false),
    }));

    boxes.sort((a, b) => a.rect.top - b.rect.top);

    const spacing = [];

    for (let i = 0; i < boxes.length - 1; i += 1) {
        const a = boxes[i].rect;
        const b = boxes[i + 1].rect;

        const gap = b.top - (a.top + a.height);

        spacing.push({
            gap,
            a,
            b,
        });
    }

    const gaps = spacing.map((s) => s.gap).filter((gap) => gap >= 0);
    if (gaps.length < 2) return [];

    const modeGap = mostCommon(gaps);

    const results = spacing
        .filter((s) => Math.abs(s.gap - modeGap) < threshold)
        .map((s) => ({
            type: 'spacing-y',
            y1: s.a.top + s.a.height,
            y2: s.b.top,
            x: s.a.left + s.a.width / 2,
            gap: s.gap,
        }));

    return results;
};
