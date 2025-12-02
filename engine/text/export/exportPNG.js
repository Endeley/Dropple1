/**
 * Render words to a canvas and return a PNG data URL.
 * `renderWord` should handle applying matrix + fillText.
 */
export function exportPNG(canvas, lines, renderWord, width, height) {
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  for (const line of lines) {
    for (const word of line.words) {
      renderWord(ctx, word);
    }
  }

  return canvas.toDataURL("image/png");
}
