// Minimal MorphPath stub to keep the editor functional without fabric's custom class.
import { buildLinearPath } from './vectorPath';

export class MorphPath {
  static type = 'morph-path';

  constructor(path = [], options = {}) {
    this.type = MorphPath.type;
    this.path = Array.isArray(path) ? path : [];
    this.stroke = options.stroke || '#000';
    this.strokeWidth = options.strokeWidth ?? 2;
    this.fill = options.fill ?? 'transparent';
    this.from = options.from || [];
    this.to = options.to || [];
    this.progress = 0;
  }

  setMorphTargets(fromPoints = [], toPoints = []) {
    this.from = fromPoints;
    this.to = toPoints;
    if (!this.path?.length && fromPoints.length) {
      this.path = buildLinearPath(fromPoints);
    }
  }

  updateMorph(t = 0) {
    this.progress = Math.max(0, Math.min(1, t));
  }

  toObject(propertiesToInclude = []) {
    const extra = Array.isArray(propertiesToInclude) ? propertiesToInclude : [];
    const base = {
      type: this.type,
      path: this.path,
      from: this.from,
      to: this.to,
      progress: this.progress,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      fill: this.fill,
    };
    extra.forEach((key) => {
      if (this[key] !== undefined) base[key] = this[key];
    });
    return base;
  }
}
