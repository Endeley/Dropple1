function averageSpacing(sorted) {
    if (sorted.length < 2) return 0;
    let total = 0;
    for (let i = 1; i < sorted.length; i++) {
        total += (sorted[i].left || 0) - ((sorted[i - 1].left || 0) + (sorted[i - 1].width || 0) * (sorted[i - 1].scaleX || 1));
    }
    return total / (sorted.length - 1);
}

export function tidyHorizontal(items = []) {
    if (!items.length) return;
    const sorted = [...items].sort((a, b) => (a.left || 0) - (b.left || 0));
    const spacing = averageSpacing(sorted);
    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1];
        sorted[i].left = (prev.left || 0) + (prev.width || 0) * (prev.scaleX || 1) + spacing;
        sorted[i].setCoords?.();
    }
}

export function tidyVertical(items = []) {
    if (!items.length) return;
    const sorted = [...items].sort((a, b) => (a.top || 0) - (b.top || 0));
    let total = 0;
    for (let i = 1; i < sorted.length; i++) {
        total += (sorted[i].top || 0) - ((sorted[i - 1].top || 0) + (sorted[i - 1].height || 0) * (sorted[i - 1].scaleY || 1));
    }
    const spacing = sorted.length > 1 ? total / (sorted.length - 1) : 0;
    for (let i = 1; i < sorted.length; i++) {
        const prev = sorted[i - 1];
        sorted[i].top = (prev.top || 0) + (prev.height || 0) * (prev.scaleY || 1) + spacing;
        sorted[i].setCoords?.();
    }
}

export function alignCenters(items = []) {
    if (!items.length) return;
    const cx = items.reduce((sum, o) => sum + ((o.left || 0) + (o.width || 0) * (o.scaleX || 1) / 2), 0) / items.length;
    items.forEach((o) => {
        o.left = cx - (o.width || 0) * (o.scaleX || 1) / 2;
        o.setCoords?.();
    });
}

export function fixLayout(objects = []) {
    // Simple combined tidy: horizontal sort then vertical tidy per row heuristic.
    tidyHorizontal(objects);
    alignCenters(objects);
}
