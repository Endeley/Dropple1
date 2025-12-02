/**
 * Very lightweight path normalization for morphing.
 * Resamples two point arrays to the same length and aligns direction.
 */

function distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function resamplePath(points, total = 64) {
    if (!points?.length) return [];
    const lengths = [];
    let totalLen = 0;
    for (let i = 0; i < points.length - 1; i++) {
        const len = distance(points[i], points[i + 1]);
        lengths.push(len);
        totalLen += len;
    }
    const step = totalLen / Math.max(total - 1, 1);
    const resampled = [points[0]];
    let d = 0;
    let segIdx = 0;
    while (resampled.length < total - 1 && segIdx < lengths.length) {
        const segLen = lengths[segIdx];
        if (d + segLen >= step) {
            const t = (step - d) / segLen;
            const a = points[segIdx];
            const b = points[segIdx + 1];
            resampled.push({
                x: a.x + (b.x - a.x) * t,
                y: a.y + (b.y - a.y) * t,
            });
            points.splice(segIdx + 1, 0, resampled[resampled.length - 1]);
            lengths.splice(segIdx, 0, distance(points[segIdx], points[segIdx + 1]));
            d = 0;
        } else {
            d += segLen;
            segIdx++;
        }
    }
    resampled.push(points[points.length - 1]);
    return resampled.slice(0, total);
}

function direction(points) {
    // Signed area to determine clockwise/counter-clockwise
    let area = 0;
    for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        area += p1.x * p2.y - p2.x * p1.y;
    }
    return area >= 0 ? 1 : -1;
}

function reverseIfNeeded(a, b) {
    const da = direction(a);
    const db = direction(b);
    if (da !== db) {
        return [a.slice().reverse(), b];
    }
    return [a, b];
}

export function normalizePaths(pathA, pathB, totalPoints = 64) {
    const ptsA = resamplePath(pathA.slice(), totalPoints);
    const ptsB = resamplePath(pathB.slice(), totalPoints);
    const [normA, normB] = reverseIfNeeded(ptsA, ptsB);
    return [normA, normB];
}
