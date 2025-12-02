export class TextCache {
  constructor() {
    this.measureCache = new Map(); // key: char+font -> metrics
    this.wordBoxCache = new WeakMap(); // key: token -> box
    this.layoutCache = null;
  }

  clearAll() {
    this.measureCache.clear();
    this.wordBoxCache = new WeakMap();
    this.layoutCache = null;
  }
}
