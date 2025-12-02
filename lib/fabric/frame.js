// Lightweight placeholder to avoid fabric dependency during build.
export class Frame {
  static type = 'frame';
  constructor(objects = [], options = {}) {
    this.objects = objects;
    this.options = options;
    this.layout = options.layout || 'none';
    this.spacing = options.spacing ?? 12;
    this.padding = options.padding || { top: 16, right: 16, bottom: 16, left: 16 };
    this.alignment = options.alignment || 'start';
    this.resizing = options.resizing || 'hug';
    this.constraints = options.constraints || { horizontal: 'left', vertical: 'top' };
    this.columns = options.columns || 2;
  }
  toObject() {
    return {
      type: Frame.type,
      layout: this.layout,
      spacing: this.spacing,
      padding: this.padding,
      alignment: this.alignment,
      resizing: this.resizing,
      constraints: this.constraints,
      columns: this.columns,
    };
  }
}
