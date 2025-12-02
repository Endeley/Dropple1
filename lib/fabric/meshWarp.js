// Very lightweight mesh warp scaffold. Keeps per-object mesh data without
// relying on Fabric runtime so builds don't break when Fabric extras are absent.
function ensureMesh(obj) {
    if (!obj.meshWarp) {
        obj.meshWarp = {
            enabled: false,
            rows: 3,
            cols: 3,
            points: [],
            originalPoints: [],
        };
    }
}

export function createMeshGrid(obj, rows = 3, cols = 3) {
    if (!obj) return [];
    ensureMesh(obj);
    const pts = [];
    for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
            pts.push({
                x: (obj.left || 0) + (obj.width || 0) * (c / cols),
                y: (obj.top || 0) + (obj.height || 0) * (r / rows),
            });
        }
    }
    obj.meshWarp.rows = rows;
    obj.meshWarp.cols = cols;
    obj.meshWarp.points = pts;
    obj.meshWarp.originalPoints = JSON.parse(JSON.stringify(pts));
    return pts;
}
