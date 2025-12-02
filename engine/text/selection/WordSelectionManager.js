import { hitTestWord } from "./hitTestWord.js";

export class WordSelectionManager {
  constructor() {
    this.activeWord = null;
    this.selectionStart = null;
    this.selectionEnd = null;
    this.selectedWords = [];
    this.isDragging = false;
  }

  onMouseMove(lines, x, y) {
    if (!this.isDragging) return;
    const hit = hitTestWord(lines, x, y);
    if (!hit) return;
    this.selectionEnd = hit.word;
    this.updateSelection(lines);
  }

  onMouseDown(lines, x, y) {
    const hit = hitTestWord(lines, x, y);
    if (!hit) {
      this.clearSelection();
      return;
    }
    this.isDragging = true;
    this.activeWord = hit.word;
    this.selectionStart = hit.word;
    this.selectionEnd = hit.word;
    this.updateSelection(lines);
  }

  onMouseUp() {
    this.isDragging = false;
  }

  updateSelection(lines) {
    const allWords = flattenWords(lines);
    const startIndex = allWords.indexOf(this.selectionStart);
    const endIndex = allWords.indexOf(this.selectionEnd);
    if (startIndex === -1 || endIndex === -1) {
      this.selectedWords = [];
      return;
    }
    const min = Math.min(startIndex, endIndex);
    const max = Math.max(startIndex, endIndex);
    this.selectedWords = allWords.slice(min, max + 1);
  }

  clearSelection() {
    this.activeWord = null;
    this.selectedWords = [];
    this.selectionStart = null;
    this.selectionEnd = null;
    this.isDragging = false;
  }
}

function flattenWords(lines) {
  return lines.flatMap((l) => l.words);
}
