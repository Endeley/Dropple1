/**
 * Batch draw words to a canvas context to minimize state changes.
 * renderWord should handle applying transforms and text drawing.
 */
export function drawBatch(ctx, words, renderWord) {
  if (!words.length) return;
  ctx.save();
  for (const word of words) {
    renderWord(ctx, word);
  }
  ctx.restore();
}
