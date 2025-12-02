import { buildPathFromPoints } from '@/lib/fabric/vectorPath';

export function interpolatePoints(pointsA, pointsB, t) {
    const p = Math.min(Math.max(t, 0), 1);
    return pointsA.map((pt, i) => {
        const other = pointsB[i] || pointsB[pointsB.length - 1] || pt;
        return {
            x: pt.x + (other.x - pt.x) * p,
            y: pt.y + (other.y - pt.y) * p,
        };
    });
}

export function buildPathStringFromPoints(pts) {
    return buildPathFromPoints(pts);
}
