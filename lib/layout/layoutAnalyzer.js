// Lightweight spatial analysis scaffold for layout fixes.

function centerX(obj) {
    return (obj.left || 0) + (obj.width || 0) * (obj.scaleX || 1) / 2;
}
function centerY(obj) {
    return (obj.top || 0) + (obj.height || 0) * (obj.scaleY || 1) / 2;
}

function detectMisalignments(objs) {
    const issues = [];
    const tolerance = 3;
    for (let i = 0; i < objs.length; i++) {
        for (let j = i + 1; j < objs.length; j++) {
            const a = objs[i];
            const b = objs[j];
            const alignedLeft = Math.abs((a.left || 0) - (b.left || 0)) < tolerance;
            const alignedCx = Math.abs(centerX(a) - centerX(b)) < tolerance;
            const alignedTop = Math.abs((a.top || 0) - (b.top || 0)) < tolerance;
            const alignedCy = Math.abs(centerY(a) - centerY(b)) < tolerance;
            if (!(alignedLeft || alignedCx || alignedTop || alignedCy)) {
                issues.push({ type: 'misaligned', objects: [a, b] });
            }
        }
    }
    return issues;
}

function detectOverlaps(objs) {
    const issues = [];
    for (let i = 0; i < objs.length; i++) {
        for (let j = i + 1; j < objs.length; j++) {
            const a = objs[i];
            const b = objs[j];
            const ax2 = (a.left || 0) + (a.width || 0) * (a.scaleX || 1);
            const ay2 = (a.top || 0) + (a.height || 0) * (a.scaleY || 1);
            const bx2 = (b.left || 0) + (b.width || 0) * (b.scaleX || 1);
            const by2 = (b.top || 0) + (b.height || 0) * (b.scaleY || 1);
            const overlap =
                (a.left || 0) < bx2 &&
                ax2 > (b.left || 0) &&
                (a.top || 0) < by2 &&
                ay2 > (b.top || 0);
            if (overlap) {
                issues.push({ type: 'overlap', objects: [a, b] });
            }
        }
    }
    return issues;
}

export function analyzeLayout(objects = []) {
    return {
        misalignments: detectMisalignments(objects),
        overlaps: detectOverlaps(objects),
    };
}
