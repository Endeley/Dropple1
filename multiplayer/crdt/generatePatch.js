export const generatePatch = (before, after) => {
    const patch = [];

    const beforeMap = {};
    const afterMap = {};

    before.objects.forEach((o) => (beforeMap[o.__objectId] = o));
    after.objects.forEach((o) => (afterMap[o.__objectId] = o));

    for (const id in afterMap) {
        if (!beforeMap[id]) continue;
        const b = beforeMap[id];
        const a = afterMap[id];

        const diffs = {};

        for (const key in a) {
            if (JSON.stringify(a[key]) !== JSON.stringify(b[key])) {
                diffs[key] = a[key];
            }
        }

        if (Object.keys(diffs).length > 0) {
            patch.push({
                id,
                changes: diffs,
            });
        }
    }

    return patch;
};
