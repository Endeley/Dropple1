// Fabric-free vector path helpers and a lightweight path class used in the editor.
export const buildPathFromPoints = (points = []) => {
  if (!points.length) return [];
  const path = [];
  const first = points[0];
  path.push(['M', first.x, first.y]);

  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    const prev = points[i - 1];
    const h1x = (prev.x || 0) + (prev.handleOut?.x || 0);
    const h1y = (prev.y || 0) + (prev.handleOut?.y || 0);
    const h2x = (p.x || 0) + (p.handleIn?.x || 0);
    const h2y = (p.y || 0) + (p.handleIn?.y || 0);
    path.push(['C', h1x, h1y, h2x, h2y, p.x, p.y]);
  }

  return path;
};

// Utility: parse plain {x,y} points into path array (no handles)
export const buildLinearPath = (points = []) => {
  if (!points.length) return [];
  const path = [];
  points.forEach((p, idx) => {
    if (idx === 0) path.push(['M', p.x, p.y]);
    else path.push(['L', p.x, p.y]);
  });
  return path;
};

export class VectorPath {
  static type = 'vector-path';

  constructor(path = [], options = {}) {
    this.type = VectorPath.type;
    this.path = Array.isArray(path) ? path : [];
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth ?? 2;
    this.fill = options.fill ?? 'transparent';
    this.editable = options.editable ?? true;
    this.points = options.points || [];
    this.closed = options.closed || false;
    this.options = options;
  }

  toObject(additional = []) {
    const extra = Array.isArray(additional) ? additional : [];
    const base = {
      type: this.type,
      path: this.path,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      fill: this.fill,
      editable: this.editable,
      points: this.points,
      closed: this.closed,
    };
    extra.forEach((key) => {
      if (this[key] !== undefined) base[key] = this[key];
    });
    return base;
  }
}
