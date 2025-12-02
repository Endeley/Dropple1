/**
 * Collect words that need animation-driven redraw (matrix changes).
 */
export function animationFrame(words) {
  const batch = [];
  for (const word of words) {
    if (word.matrixDirty) {
      batch.push(word);
      word.matrixDirty = false;
    }
  }
  return batch;
}
