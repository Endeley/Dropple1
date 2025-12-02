const mostCommon = (arr) => {
    const counts = arr.reduce((map, value) => {
        map[value] = (map[value] || 0) + 1;
        return map;
    }, {});

    return Number(
        Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
    );
};

export const computeEqualSpacingX = (active, others, _canvas, threshold = 6) => {
    const all = [...others, active];

    const boxes = all.map((obj) => ({
        obj,
        rect: obj.getBoundingRect(false, false),
    }));

    boxes.sort((a, b) => a.rect.left - b.rect.left);

    const spacing = [];

    for (let i = 0; i < boxes.length - 1; i += 1) {
        const a = boxes[i].rect;
        const b = boxes[i + 1].rect;

        const gap = b.left - (a.left + a.width);

        spacing.push({
            from: boxes[i].obj,
            to: boxes[i + 1].obj,
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
            type: 'spacing-x',
            x1: s.a.left + s.a.width,
            x2: s.b.left,
            y: s.a.top + s.a.height / 2,
            gap: s.gap,
        }));

    return results;
};
