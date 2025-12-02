import { applyWordTransform } from "./applyWordTransform.js";

/**
 * Manages transforms for the currently selected words.
 * Pure composition-friendly operations; word.matrix is set for each word.
 */
export class WordTransformManager {
  constructor() {
    this.selectedWords = [];
  }

  setSelection(selectedWords) {
    this.selectedWords = selectedWords || [];
  }

  transformSelected(transform) {
    for (const word of this.selectedWords) {
      applyWordTransform(word, transform);
    }
  }

  translate(x, y) {
    this.transformSelected({ translate: { x, y } });
  }

  scale(sx, sy) {
    this.transformSelected({ scale: { x: sx, y: sy } });
  }

  rotate(angle) {
    this.transformSelected({ rotate: angle });
  }

  skew(ax, ay) {
    this.transformSelected({ skew: { x: ax, y: ay } });
  }
}
