export const strokeStore = {
  history: [],
  index: -1,
  push(snapshot) {
    this.history = this.history.slice(0, this.index + 1);
    this.history.push(snapshot);
    this.index++;
  },
  undo() {
    if (this.index > 0) this.index--;
    return this.history[this.index];
  },
  redo() {
    if (this.index < this.history.length - 1) this.index++;
    return this.history[this.index];
  },
};
